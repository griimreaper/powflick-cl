import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { H5, H6 } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Order } from "models/types";
import ListItem from "pages-sections/checkout/list-item";
import { getTotalWithDiscount } from "utils/tools";

// ==============================================================
interface Props {
  order: Order;
}
// ==============================================================

export default function TotalSummery({ order }: Props) {
  console.log("order", order);

  // Subtotal = suma de productos

  const subtotal = order?.products?.reduce((acc: number, { OrderProduct, price }: any) => {
    return acc + getTotalWithDiscount(price, OrderProduct.amount, !OrderProduct.product?.influencer_id);
  }, 0);

  // Suma de customizaciones
  const customizationTotal = order?.customizations?.reduce((acc: number, { customization }: any) => {
    return acc += customization.price;
  }, 0);

  // Descuento
  const isPercent = order?.coupon?.type === "percent";
  const discount = isPercent
    ? ((subtotal + customizationTotal) * (order?.coupon?.discount || 0)) / 100
    : order?.coupon?.discount || 0;

  const total = subtotal + customizationTotal - discount;


  return (
    <Card sx={{ p: 3 }}>
      <H5 mt={0} mb={2}>Total Summary</H5>

      <ListItem title="Subtotal" value={currency(subtotal)} />
      <ListItem title="Customizations" value={currency(customizationTotal)} />

      {order?.coupon && (
        <ListItem
          title={`Coupon (${order.coupon.title})`}
          value={`- ${currency(discount)} ${isPercent ? `(${order.coupon.discount}%)` : ""}`}
        />
      )}

      <Divider sx={{ mb: 1 }} />

      <FlexBetween mb={2}>
        <H6>Total</H6>
        <H6>{currency(total)}</H6>
      </FlexBetween>
    </Card>
  );
}
