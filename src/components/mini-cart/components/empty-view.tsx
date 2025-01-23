import Image from "next/image";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { ShoppingBag } from "@mui/icons-material";

export default function EmptyCartView() {
  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="calc(100% - 74px)">
      <ShoppingBag fontSize="large"/>

      <Paragraph fontSize={15} mt={2} color="grey.600" textAlign="center" maxWidth={200}>
        Your shopping bag is empty. Start shopping
      </Paragraph>
    </FlexBox>
  );
}
