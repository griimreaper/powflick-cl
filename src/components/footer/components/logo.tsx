import Link from "next/link";
import AppStore from "./app-store";
import { Box } from "@mui/material";
import Image from "next/image";

export default function LogoSection() {
  return (
    <Box width={'100%'} display="flex" flexDirection={"column"} justifyContent="center" alignItems="center">
      <Link href="/" draggable={false}>
        <Box display="flex" justifyContent="center" width={'100%'} height={100}>
          <Image
            width={200}
            height={200}
            draggable={false}
            loading="lazy"
            quality={80}
            src="/assets/images/logo/POWFLICK_LOGO-FOOTER.png"
            alt="logo"
            layout="responsive"
          />
        </Box>
      </Link>

      {/* <Paragraph mb={2.5} color="grey.500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero
        id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel
        ut sollicitudin elit at amet.
      </Paragraph> */}

      {/* <AppStore /> */}
    </Box>
  );
}
