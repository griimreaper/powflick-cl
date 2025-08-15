import Image from "next/image";
// CUSTOM COMPONENTS
import { H5 } from "components/Typography";
import { useTranslations } from "next-intl";
import FlexRowCenter from "components/flex-box/flex-row-center";

export default function LogoWithTitle() {
  const t = useTranslations("Auth.greeting");
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image
        src="/assets/images/landing/login/POW_FLICK_LOGO-LOGGIN-4.png"
        width={100}
        height={100}
        alt="Pow Flick"
      />
      <H5 fontWeight={700}>{t("logoTitle")}</H5>
    </FlexRowCenter>
  );
}
