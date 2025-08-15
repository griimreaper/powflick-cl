import Image from "next/image";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { ShoppingBag } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function EmptyCartView() {
  const t = useTranslations("MiniCart");
  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="calc(100% - 74px)">
      <ShoppingBag fontSize="large"/>

      <Paragraph fontSize={15} mt={2} color="grey.600" textAlign="center" maxWidth={200}>
        {t("empty")}
      </Paragraph>
    </FlexBox>
  );
}
