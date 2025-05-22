"use client";

import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Direction } from "models/types";
// LOCAL CUSTOM COMPONENTS
import { CheckoutForm } from "../checkout-form";
import { CheckoutSummary } from "../checkout-summery";
import { useShoppingCartStore } from "store/shoppingCart";
import useHeader from "components/header/hooks/use-header";
import DialogDrawer from "components/header/components/dialog-drawer";

export default function CheckoutPageView() {
  const { cart, coupon, total } = useShoppingCartStore();
  const { toggleDialog, dialogOpen } = useHeader();
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);

  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <DialogDrawer
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
        redirectUrl="/checkout"
      ></DialogDrawer>

      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm
          toggleDialog={toggleDialog}
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
        />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary
          data={{ cart, coupon, total }}
          toggleDialog={toggleDialog}
          selectedDirection={selectedDirection}
        />
      </Grid>
    </Grid>
  );
}
