"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "store/dashboard";
import { useShoppingCartStore } from "store/shoppingCart";
import { getOrder } from "services/ThanksForBuying";
import { createCoupon, createCouponUser } from "services/modals/discount";
import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { purchase } from "../../../fpixel";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { getProfile } from "services/DashboardUser";
import { useSession } from "next-auth/react";

export default function ThanksForBuy({ id }: { id: string }) {
  const { profile, setData, removeProfile, setProfileUser } =
    useDashboardStore();
  const [order, setOrder] = useState<any>({});
  const [open, setOpen] = useState(false);
  const state = useDashboardStore();
  const { clearCart } = useShoppingCartStore();
  const router = useRouter();
  const { data: session } = useSession();

  const { token } = state.profile;
  let rol = session?.user?.email;

  console.log(state.profile.genericResponseUser);

  const handleBackClick = () => {
    if (sessionStorage.getItem("from-dashboard")) {
      sessionStorage.removeItem("from-dashboard");
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const discountNextBuy = async () => {
    if (token && token !== undefined) {
      try {
        // Crear cupón de descuento
        const coupon = await createCoupon({
          title: "10% Discount",
          content: "10% off on your next purchase",
          discount: 10,
        });

        // Asignar cupón al usuario
        const responseCouponUser = await createCouponUser(
          token,
          { couponId: coupon.id, active: true },
          coupon.coupon.title
        );

        // Validar respuesta y mostrar alertas
        if (responseCouponUser.status === 201) {
          showSuccessAlert(
            "Success!",
            "The discount has been successfully applied to your account"
          );
        } else {
          console.log("Alert!", responseCouponUser.data.message);
        }


        // Mostrar modal
        // setOpen(true);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          console.log("Alert!", error.response.data.message);
        } else {
          console.log("Alert!", "An unexpected error occurred.");
        }
      }
    }
  }

  const refetch = async () => {
    if (token && token !== undefined) {
      try {
        const response = await getProfile(token);
        setData({ ...response, token, rol });
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          showErrorAlert("Error!", error.response.data.message);
        } else {
          showErrorAlert("Error!", "An unexpected error occurred while fetching the profile.");
        }
      }
    };
  }

  console.log("order", order);


  useEffect(() => {
    const fetchData = async () => {
      if (token && token !== undefined) {
        console.log("token", token);
        
        try {
          console.log("token", token);
          const orderr = await getOrder(id, token);
          setOrder(orderr.data);

          // Enviar datos al dataLayer directamente desde orderr.data
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "Purchase",
            ecommerce: {
              transaction_id: orderr.data.id,
              value: orderr.data.total,
              currency: "USD",
              coupon: orderr.data.coupon?.title || null,
              discount: orderr.data.coupon
                ? ((orderr.data.total * orderr.data.coupon.discount) / 100).toFixed(2)
                : 0,
              shippingAddress: {
                address: orderr.data?.direction?.address,
                postalCode: orderr.data?.direction?.postalCode,
                district: orderr.data?.direction?.district,
                city: orderr.data?.direction?.city,
                country: orderr.data?.direction?.country,
              },
              items: orderr.data?.products?.map(
                ({
                  title,
                  id,
                  product_categories,
                  sports,
                  colors,
                  slug,
                  OrderProduct,
                }: any) => ({
                  item_id: id,
                  item_name: title,
                  affiliation: "Google Merchandise Store",
                  item_brand: "Pow Flick",
                  item_category: product_categories,
                  item_category2: sports,
                  item_list_name: slug,
                  item_variant: colors[0],
                  price: OrderProduct.price,
                  quantity: OrderProduct.amount,
                })
              ),
            },
          });
          purchase("purchase", {
            ecommerce: {
              transaction_id: orderr.data.id,
              value: orderr.data.total,
              currency: "USD",
              coupon: orderr.data.coupon?.title || null,
              discount: orderr.data.coupon
                ? ((orderr.data.total * orderr.data.coupon.discount) / 100).toFixed(2)
                : 0,
              shippingAddress: {
                address: orderr.data?.direction?.address,
                postalCode: orderr.data?.direction?.postalCode,
                district: orderr.data?.direction?.district,
                city: orderr.data?.direction?.city,
                country: orderr.data?.direction?.country,
              },
              items: orderr.data?.products?.map(
                ({
                  title,
                  id,
                  product_categories,
                  sports,
                  colors,
                  slug,
                  OrderProduct,
                }: any) => ({
                  item_id: id,
                  item_name: title,
                  item_brand: "Pow Flick",
                  item_category: product_categories,
                  item_category2: sports,
                  item_list_name: slug,
                  item_variant: colors[0],
                  price: OrderProduct.price,
                  quantity: OrderProduct.amount,
                })
              ),
            },
          });
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      }
    };
    fetchData();
    clearCart();
  }, [token]);

  useEffect(() => {
    // Aquí solo aplicamos el cupón y refrescamos
    const applyDiscount = async () => {
      if (token) {
        await discountNextBuy();
        await refetch();
      }
    };
    applyDiscount();
  }, []);

  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.paper", px: 4, pb: 6, pt: 4 }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Button
          onClick={handleBackClick}
          startIcon={<ChevronLeft />}
          sx={{ mb: 4 }}
        >
          Back to{" "}
          <Typography color="primary" sx={{ ml: 1 }}>
            Pow Flick
          </Typography>
        </Button>

        <Typography variant="h6" color="primary">
          Thank you!
        </Typography>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {"It's on the way!"}
        </Typography>
        <Typography gutterBottom>
          Your order #{order?.id} was sent to the factory for manufacturing and
          will be with you soon.
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Tracking number
        </Typography>
        <Typography color="" gutterBottom>
          {order?.tracking_number || "Not available yet"}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Your Order
        </Typography>

        {order?.products?.map((product: any) => (
          <Card
            key={product.id}
            sx={{ display: "flex", mb: 2, borderRadius: 2, boxShadow: 1 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image={product.images[0]}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.short_description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Quantity: {product.OrderProduct.amount}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Price: ${product.OrderProduct.price}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Shipping Address
              </Typography>
              <Typography variant="body2">
                {order?.direction?.address}
              </Typography>
              <Typography variant="body2">
                {order?.direction?.postalCode} {order?.direction?.district}
              </Typography>
              <Typography variant="body2">
                {order?.direction?.city}, {order?.direction?.country}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Billing Address
              </Typography>
              <Typography variant="body2">
                {order?.direction?.address}
              </Typography>
              <Typography variant="body2">
                {order?.direction?.postalCode} {order?.direction?.district}
              </Typography>
              <Typography variant="body2">
                {order?.direction?.city}, {order?.direction?.country}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Method
              </Typography>
              <Typography variant="body2">
                {order?.paymentData?.card?.wallet?.type}
              </Typography>
              <Typography variant="body2">
                {order?.paymentData?.card?.brand} (
                {order?.paymentData?.card?.funding})
              </Typography>
              <Typography variant="body2">
                Ending in {order?.paymentData?.card?.last4}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Shipping Method
              </Typography>
              <Typography variant="body2">DHL</Typography>
              <Typography variant="body2">
                Takes up to 3 working days
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body2">
          Coupon: {order?.coupon ? order.coupon.title : "None"}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Total: ${order?.total}
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You have received a 10% discount coupon for your next purchase!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
