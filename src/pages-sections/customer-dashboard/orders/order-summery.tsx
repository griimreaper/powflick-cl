import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { H5, H6, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Order } from "models/types";
import { Capitalize } from "utils/tools";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { order: Order | any };
// ==============================================================

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <H6>{value}</H6>
    </FlexBetween>
  );
}



export default function OrderSummery({ order }: Props) {
  console.log("order", order);
  return (
    <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <H5 mt={0} mb={2}>
            Shipping Address
          </H5>

          <Paragraph fontSize={14} my={0}>
            {order?.direction?.postalCode}{" "}{order?.direction?.address} {order?.direction?.city}, {order?.direction?.country}
          </Paragraph>
        </Card>

        <Card sx={{ p: 3, mt: 2 }}>
          <H5 mt={0} mb={2}>
            Comments
          </H5>

          <Paragraph fontSize={14} my={0}>
            {order?.note || "No additional notes provided."}
          </Paragraph>
        </Card>

        <Card sx={{ p: 3, mt: 2 }}>
          <H5 mt={0} mb={2}>
            Payment Method
          </H5>

          <FlexBetween mb={2}>
            <Paragraph>Paid by {Capitalize(order?.paymentData?.card?.funding)} Card: </Paragraph>
            <H6>{Capitalize(order?.paymentData?.card?.brand)}</H6>
          </FlexBetween>

          <FlexBetween mb={2}>
            <Paragraph>Ending in: </Paragraph>
            <H6>{order?.paymentData?.card?.last4}</H6>
          </FlexBetween>
        </Card>
      </Grid>

      {/* TOTAL SUMMERY SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>

          <ListItem title="Subtotal:" value={currency(order?.total)} />
          <ListItem title="Shipping fee:" value={currency(0)} />
          <ListItem title="Discount:" value={currency(order?.coupon?.discount)} />

          <Divider sx={{ mb: 1 }} />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>{currency(order?.total)}</H6>
          </FlexBetween>
        </Card>
      </Grid>
    </Grid>
  );
}
