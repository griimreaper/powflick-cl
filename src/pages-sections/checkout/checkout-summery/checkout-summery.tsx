import Link from "next/link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
// LOCAL CUSTOM COMPONENT
import ListItem from "../list-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph, Span } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import FlexBetween from "components/flex-box/flex-between";
import { useEffect, useState } from "react";
import { Coupon } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useShoppingCartStore } from "store/shoppingCart";
import { FlexBox } from "components/flex-box";
import { getCouponByCode } from "services/dashboardAdmin/coupons";
import { useSession } from "next-auth/react";

export default function CheckoutSummary({ data }: any) {
  const { cart, total, setCoupon, coupon, note, setNote } = useShoppingCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  const subtotal = data.cart.reduce((acc: any, item: any) => acc + item.totalProduct, 0);
  const totalCustomizations = data.cart.reduce((acc: any, item: any) => acc + item.totalCustomization, 0);

  const { data: session } = useSession();
  const token = session?.user?.name?.split("|")[0]; // Ajusta según cómo guardes el token

  // Calcular descuento según tipo de cupón
  let discountValue = 0;
  if (coupon) {
    discountValue = coupon.type === "amount"
      ? coupon.discount
      : (subtotal + totalCustomizations) * (coupon.discount / 100);
  }

  let totalWithDiscount = subtotal + totalCustomizations - discountValue;
  if (totalWithDiscount < 0.10) totalWithDiscount = 0.10;

  const handleApplyCoupon = async () => {
    setError("");
    try {
      if (!token) {
        setError("User token is missing");
        return;
      }
      const couponData = await getCouponByCode(couponCode, token);
      if (!couponData || !couponData.active) {
        setError("Invalid or inactive coupon");
        return;
      }
      setCoupon(couponData);
    } catch (error) {
      setError(`Coupon not found or not available for your account`);
      console.log("Error fetching coupon:", error);

    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setError("");
  };

  return (
    <Card sx={{ padding: 3 }}>
      <ListItem mb={1} title="Subtotal" value={subtotal} />
      <ListItem mb={1} title="Customizations" value={totalCustomizations} />
      <ListItem
        mb={1}
        title={
          coupon
            ? `Coupon (${coupon.title} - ${coupon.type === "amount"
              ? `$${coupon.discount}`
              : `${coupon.discount}%`
            })`
            : "Coupon"
        }
        value={discountValue}
      />
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>
        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalWithDiscount)}
        </Span>
      </FlexBetween>
      <Divider sx={{ my: 2 }} />

      <FlexBox alignItems="center" columnGap={1} mb={2}>
        <Span fontWeight="600">Additional Comments</Span>
        <Span p="6px 10px" fontSize={12} lineHeight="1" borderRadius="3px" color="primary.main" bgcolor="primary.light">
          Optional
        </Span>
      </FlexBox>
      <TextField variant="outlined" rows={6} fullWidth multiline value={note} onChange={(e) => setNote(e.target.value)} />
      <Divider sx={{ mb: 2 }} />

      {/* APPLY VOUCHER TEXT FIELD */}
      <TextField
        fullWidth
        size="small"
        label="Coupon Code"
        variant="outlined"
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        error={!!error}
        helperText={error}
        disabled={!!coupon}
      />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 1 }}
        onClick={handleApplyCoupon}
        disabled={!!coupon}
      >
        Apply Coupon
      </Button>
      {coupon && (
        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ mb: 3 }}
          onClick={handleRemoveCoupon}
        >
          Remove Coupon
        </Button>
      )}
      <Divider sx={{ mb: 2 }} />
    </Card>
  );
}
