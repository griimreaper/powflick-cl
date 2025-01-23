import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import Image from "components/SportZoneImage";
import { Paragraph } from "components/Typography";
import { Box } from "@mui/material";

export default function LogoSection() {
  return (
    <Fragment>
      <Link href="/">
        <Box display="flex" justifyContent="center">
          <Image
            mb={2.5}
            width={250}
            src="/assets/images/logo/POWFLICK_LOGO-FOOTER.png"
            alt="logo"
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
