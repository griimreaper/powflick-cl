import Link from "next/link";
import AppStore from "./app-store";
import { Box } from "@mui/material";
import Image from "next/image";

export default function LogoSection() {
  return (
    <Box
      width={'100%'}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems={{ xs: "center", lg: "flex-start" }}
    >
      <Link href="/" draggable={false}>
        <Box
          display="flex"
          justifyContent="center"
          width={{ xs: 150, sm: 200, md: 250, lg: 300 }}
          height="auto"
        >
          <img
            style={{ width: "100%", height: "auto" }}
            draggable={false}
            loading="lazy"
            src="/assets/images/logo/logo2.png"
            alt="logo"
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
