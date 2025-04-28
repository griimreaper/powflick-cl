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

export default function CheckoutSummary({ data }: any) {
  const { cart, total, setCoupon, coupon, note, setNote } = useShoppingCartStore();
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

      {/* <ListItem
        mb={1}
        title="Coupon"
        value={
          <select
            onChange={handleCouponChange}
            value={selectedCoupon?.id || ""}
          >
            <option value="">Select a coupon</option>
            {profile.genericResponseUser.couponUsers
              .filter((couponUser) => couponUser.active)
              .map((couponUser) => (
                <option key={couponUser.coupon.id} value={couponUser.coupon.id}>
                  {couponUser.coupon.title}
                </option>
              ))}
          </select>
        }
      /> */}
      <ListItem mb={1} title="Discount" value={discountValue} />
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(data.total)}
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
          Optional
        </Span>
      </FlexBox>

      {/* COMMENTS TEXT FIELD */}
      <TextField
        variant="outlined"
        rows={6}
        fullWidth
        multiline
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Divider sx={{ mb: 2 }} />

      {/* APPLY VOUCHER TEXT FIELD */}
      <TextField
        fullWidth
        size="small"
        label="Coupon Code"
        variant="outlined"
        placeholder="Coupon Code"
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 4 }}
      >
        Apply Coupon
      </Button>

      <Divider sx={{ mb: 2 }} />
    </Card>
  );
}
