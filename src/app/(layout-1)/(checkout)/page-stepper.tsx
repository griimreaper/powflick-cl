"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Stepper from "./stepper";
import { Button } from "@mui/material";
import Link from "next/link";

const STEPPER_LIST = [
  { title: "Cart", disabled: false },
  { title: "Shipping", disabled: false },
  { title: "Checkout", disabled: false },
  // { title: "Review", disabled: true }
];

export default function PageStepper({ children }: PropsWithChildren) {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleStepChange = (step: number) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("");
        break;
      case 3:
        router.push("/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/payment":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <Container className="pt-2 pb-2" >
      {/* Botón pequeño Back to Cart solo en la ruta /checkout */}
      {pathname === "/checkout" && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
          <Button
            LinkComponent={Link}
            variant="outlined"
            color="primary"
            href="/cart"
            size="small"
            sx={{
              textTransform: "uppercase",
              minWidth: "auto",
              px: 2,
              py: 0.5,
              fontSize: 13,
              fontWeight: 500,
              mb: 2,
            }}
          >
            Back to Cart
          </Button>
        </Box>
      )}
      <Box mb={3} display={{ sm: "block", xs: "none" }}>
        <Stepper
          stepperList={STEPPER_LIST}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />
      </Box>

      {children}
    </Container>
  );
}
