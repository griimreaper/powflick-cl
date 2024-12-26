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

export default function CheckoutSummary({ data }: any) {
  return (
    <Card sx={{ p: 3 }}>
       <ListItem mb={1} title="Subtotal" value={data.cart[0].totalProduct} />
            <ListItem mb={1} title="Customizations" value={data.cart[0].totalCustomization} />
            <ListItem mb={1} title="Discount" value={data.coupon.discount || 0} />
            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>
      
              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(data.total)}
              </Span>
            </FlexBetween>

      <Divider sx={{ my: 2 }} />

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
