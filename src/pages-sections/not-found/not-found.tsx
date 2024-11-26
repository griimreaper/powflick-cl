"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// CUSTOM GLOBAL COMPONENTS
import { FlexBox, FlexRowCenter } from "components/flex-box";

export default function NotFound() {
  const router = useRouter();

  return (
    <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        marginBottom={"20px"}
      >
        <Image
          alt="Not Found!"
          width={55}
          height={55}
          src="/assets/images/logo/SportZone2.png"
        />
      </Box>

      <Box textAlign="center" mb={4}>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </Box>

      <FlexBox flexWrap="wrap" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.back()}
        >
          Go Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </FlexBox>
    </FlexRowCenter>
  );
}
