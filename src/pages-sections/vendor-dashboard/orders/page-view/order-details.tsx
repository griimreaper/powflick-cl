"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// LOCAL CUSTOM COMPONENT
import OrderActions from "../order-actions";
import TotalSummery from "../total-summery";
import PageWrapper from "../../page-wrapper";
import OrderedProduct from "../ordered-product";
import ShippingAddress from "../shipping-address";
// CUSTOM DATA MODEL
import { Direction, Order } from "models/types";
import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";
import { updateOrder } from "services/dashboardAdmin/orders";
import { useRouter } from "next/navigation";

// ==============================================================
type Props = {
  data: {
    data: Order,
    directions: Direction[],
  }
};
// ==============================================================

export default function OrderDetailsPageView({ data }: Props) {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const router = useRouter();

  const { data: order, directions } = data;

  const [updatedOrder, setUpdatedOrder] = useState<{
    orderId: string;
    state: string;
    directionId: string;
    note: string;
  }>({
    orderId: String(order.id),
    state: order.state,
    directionId: order.direction.id,
    note: order.note,
  });

  const handleSaveChanges = async () => {
    try {
      const response = await updateOrder(updatedOrder, token as string);

      showSuccessAlert("Success", response.message);
      router.push('/admin/orders')
    } catch (error) {
      console.error("Error updating order:", error);
      showErrorAlert("Error", "Failed to update the order. Please try again.");
    }
  };

  return (
    <PageWrapper title="Order Details">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            {/* ADD PRODUCT & CHANGE ORDER STATUS ACTION  */}
            <OrderActions
              id={String(order.id)}
              createdAt={order.createdAt}
              status={order.state}
              customer={order.user}
              onStatusChange={(newStatus) => setUpdatedOrder((prev) => ({ ...prev, state: newStatus }))} />

            {/* ORDERED PRODUCT LIST */}
            {order?.products?.map((item, index) => (
              <OrderedProduct product={item} customizations={order.customizations.filter(c => c.productId === item.id)} key={index} />
            ))}
          </Card>
        </Grid>

        {/* SHIPPING ADDRESS & CUSTOMER NOTES */}
        <Grid item md={6} xs={12}>
          <ShippingAddress
            direction={order?.direction}
            note={order.note}
            directions={directions}
            setUpdateOrder={setUpdatedOrder} />
        </Grid>

        {/* TOTAL SUMMERY OF ORDER */}
        <Grid item md={6} xs={12}>
          <TotalSummery total={order?.total} discount={order?.coupon?.discount} />
        </Grid>

        {/* CHANGE BUTTON */}
        <Grid item xs={12}>
          <Button variant="contained" color="info"
            onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}
