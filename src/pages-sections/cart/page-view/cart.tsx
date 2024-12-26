"use client";

import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM COMPONENTS
import CartItem from "../cart-item";
import CheckoutForm from "../checkout-form";
import { useShoppingCartStore } from "store/shoppingCart";

export default function CartPageView() {
  const { state } = useCart();
  const { cart, coupon, total } = useShoppingCartStore();

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* CART PRODUCT LIST */}
      <Grid item md={8} xs={12}>
        {cart.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </Grid>

      {/* CHECKOUT FORM */}
      <Grid item md={4} xs={12}>
        <CheckoutForm data={{ cart, coupon, total }} />
      </Grid>
    </Grid>
  );
}
