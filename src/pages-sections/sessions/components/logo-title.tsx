import Image from "next/image";
// CUSTOM COMPONENTS
import { H5 } from "components/Typography";
import FlexRowCenter from "components/flex-box/flex-row-center";
// IMPORT IMAGES
import logo from "../../../../public/assets/images/Pow Flick-black-sm.svg";

export default function LogoWithTitle() {
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image
        src="/assets/images/landing/login/POW_FLICK_LOGO-LOGGIN-4.png"
        width={100}
        height={100}
        alt="Pow Flick"
      />
      <H5 fontWeight={700}>Welcome To Pow Flick</H5>
    </FlexRowCenter>
  );
}
