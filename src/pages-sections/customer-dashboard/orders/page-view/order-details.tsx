"use client";

import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Local CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header";
import { Order } from "models/types";
// CUSTOM DATA MODEL

// =============================================================
type Props = { order: Order };
// =============================================================

export default function OrderDetailsPageView({ order }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        href="/orders"
        Icon={ShoppingBag}
        title="Order Details"
        buttonText="Order Again"
      />

      {/* ORDER PROGRESS AREA */}
      <OrderProgress status={order.state}/>

      {/* ORDERED PRODUCT LIST */}
      <OrderedProducts order={order} />

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummery order={order} />
    </Fragment>
  );
}
