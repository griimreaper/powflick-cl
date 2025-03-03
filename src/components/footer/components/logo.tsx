import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import { Box } from "@mui/material";
import Image from "next/image";

export default function LogoSection() {
  return (
    <Fragment>
      <Link href="/" draggable={false}>
        <Box display="flex" justifyContent="center">
          <Image
            width={250}
            height={0}
            draggable={false}
            src="/assets/images/logo/POWFLICK_LOGO-FOOTER.png"
            alt="logo"
            layout="intrinsic"
          />
        </Box>
      </Link>

      {/* <Paragraph mb={2.5} color="grey.500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero
        id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel
        ut sollicitudin elit at amet.
      </Paragraph> */}

      <AppStore />
    </Fragment>
  );
}
