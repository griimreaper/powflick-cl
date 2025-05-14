"use client";

import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM COMPONENTS
import CartItem from "../cart-item";
import { useShoppingCartStore } from "store/shoppingCart";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CheckoutSummary from "pages-sections/checkout/checkout-summery/checkout-summery";

export default function CartPageView() {
  const { cart, coupon, total } = useShoppingCartStore();

  return (
    <Grid container spacing={3} justifyContent="center" >
      {/* CART PRODUCT LIST */}
      <Grid item md={8} xs={12}>
        {cart.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </Grid>

      {/* CHECKOUT FORM */}
      <Grid item md={4} xs={12}>
        <CheckoutSummary data={{ cart, coupon, total }} />
      </Grid>
      {/* <Button href={'/checkout'} variant="contained" color="primary" type="submit" 
        disabled={cart.length === 0}>
          Go to checkout
        </Button> */}
    </Grid>
  );
}
