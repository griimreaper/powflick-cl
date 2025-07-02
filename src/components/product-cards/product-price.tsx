import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";

// ==============================================================
type Props = { price: number; discount: number };
// ==============================================================

export default function ProductPrice({ discount, price }: Props) {
  return (
    <FlexBox alignItems="center"  gap={1} mt={0.5}>
      <Paragraph fontWeight={600} fontSize={{xs:'3vw', sm:'2.2vw', md:'1.5vw', lg: '1vw'}} color="primary.main">
        {calculateDiscount(price, discount)}
      </Paragraph>

      {discount ? (
        <Box component="del" fontSize={{xs:'3vw', sm:'2.2vw', md:'1.5vw', lg: '1vw'}} fontWeight={600} color="grey.600">
          {currency(price)}
        </Box>
      ) : null}
    </FlexBox>
  );
}
