import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// GLOBAL CUSTOM COMPONENTS
import { H5, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { Order } from "models/types";
import TotalSummery from "pages-sections/vendor-dashboard/orders/total-summery";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { order: Order | any };
// ==============================================================

export default function OrderSummery({ order }: Props) {
  return (
    <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{ p: 3 }}>
          <H5 mt={0} mb={2}>Shipping Address</H5>
          <Paragraph fontSize={14} my={0}>
            {order?.direction?.postalCode} {order?.direction?.address} {order?.direction?.city}, {order?.direction?.country}
          </Paragraph>
        </Card>

        <Card sx={{ p: 3, mt: 2 }}>
          <H5 mt={0} mb={2}>Comments</H5>
          <Paragraph fontSize={14} my={0}>
            {order?.note || "No additional notes provided."}
          </Paragraph>
        </Card>
      </Grid>

      {/* TOTAL SUMMARY SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <TotalSummery order={order} />
      </Grid>
    </Grid>
  );
}
