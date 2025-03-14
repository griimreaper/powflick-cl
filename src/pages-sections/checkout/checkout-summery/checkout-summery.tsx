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
import { Coupon } from "app/types";
import { useDashboardStore } from "store/dashboard";
import { useShoppingCartStore } from "store/shoppingCart";
import { FlexBox } from "components/flex-box";

export default function CheckoutSummary({ data }: any) {
  const { cart, total, setCoupon, coupon } = useShoppingCartStore();
  const { profile, setData, removeProfile } = useDashboardStore();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const subtotal = data.cart.reduce(
    (acc: any, item: any) => acc + item.totalProduct,
    0
  );
  const totalCustomizations = data.cart.reduce(
    (acc: any, item: any) => acc + item.totalCustomization,
    0
  );

  useEffect(() => {
    // Recuperar el selectedCoupon de localStorage cuando se cargue el componente
    const savedCoupon = localStorage.getItem("selectedCoupon");
    if (savedCoupon) {
      setSelectedCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  console.log(selectedCoupon);

  const handleCouponChange = (event: any) => {
    if (event.target.value === "") {
      // Si se selecciona "Select a coupon", resetea el estado del cupón seleccionado
      setSelectedCoupon({} as Coupon);
      setCoupon({} as Coupon);
      localStorage.removeItem("selectedCoupon");
    } else {
      const coupon = profile.genericResponseUser.couponUsers.find(
        (coupon) => coupon.coupon.id === event.target.value
      );
      if (coupon) {
        setSelectedCoupon(coupon.coupon);
        setCoupon(coupon.coupon);
        localStorage.setItem("selectedCoupon", JSON.stringify(coupon.coupon));
      }
    }
  };

  const totalWithDiscount = selectedCoupon
    ? subtotal * (1 - selectedCoupon.discount / 100)
    : subtotal;

  const discountValue = selectedCoupon
    ? subtotal * (selectedCoupon.discount / 100)
    : 0;

  return (
    <Card sx={{ padding: 3 }}>
      <ListItem mb={1} title="Subtotal" value={subtotal} />
      <ListItem mb={1} title="Customizations" value={totalCustomizations} />

      <ListItem
        mb={1}
        title="Coupon"
        value={
          <select
            onChange={handleCouponChange}
            value={selectedCoupon?.id || ""}
          >
            <option value="">Select a coupon</option>
            {profile.genericResponseUser.couponUsers.map((couponUser) => (
              <option key={couponUser.coupon.id} value={couponUser.coupon.id}>
                {couponUser.coupon.title}
              </option>
            ))}
          </select>
        }
      />
      <ListItem mb={1} title="Discount" value={discountValue} />
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalWithDiscount || data.total)}
        </Span>
      </FlexBetween>

      <Divider sx={{ my: 2 }} />

      <FlexBox alignItems="center" columnGap={1} mb={2}>
        <Span fontWeight="600">Additional Comments</Span>

        <Span
          p="6px 10px"
          fontSize={12}
          lineHeight="1"
          borderRadius="3px"
          color="primary.main"
          bgcolor="primary.light"
        >
          Note
        </Span>
      </FlexBox>

      {/* COMMENTS TEXT FIELD */}
      <TextField variant="outlined" rows={6} fullWidth multiline />

      <Divider sx={{ mb: 2 }} />

      {/* APPLY VOUCHER TEXT FIELD */}
      <TextField
        fullWidth
        size="small"
        label="Voucher"
        variant="outlined"
        placeholder="Voucher"
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 4 }}
      >
        Apply Voucher
      </Button>

      <Divider sx={{ mb: 2 }} />

      {/* <Button
        fullWidth
        color="primary"
        href="/checkout"
        variant="contained"
        LinkComponent={Link}
      >
        Checkout Now
      </Button> */}

      {/* <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(2610)}
      </Paragraph> */}

      {/* <Stack spacing={2} mt={3}>
        <TextField
          placeholder="Voucher"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="outlined" color="primary" fullWidth>
          Apply Voucher
        </Button>
      </Stack> */}
    </Card>
  );
}
