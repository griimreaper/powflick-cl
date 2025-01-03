"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "store/dashboard";
import { useShoppingCartStore } from "store/shoppingCart";
import { getOrder } from "services/ThanksForBuying";
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
} from "@mui/material";

export default function ThanksForBuy({ id }: { id: string }) {
  const [order, setOrder] = useState<any>({});
  const { profile } = useDashboardStore();
  const { clearCart } = useShoppingCartStore();
  const { token } = profile;
  const router = useRouter();

  const handleBackClick = () => {
    if (sessionStorage.getItem("from-dashboard")) {
      sessionStorage.removeItem("from-dashboard");
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token && token !== undefined) {
        const orderr = await getOrder(id, token);
        setOrder(orderr.data);
        if (!sessionStorage.getItem("from-dashboard")) {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: "Purchase",
            ecommerce: {
              transaction_id: order.id,
              value: order.total,
              currency: "USD",
              coupon: order.coupon?.title || null,
              discount: order.coupon
                ? ((order.total * order.coupon.discount) / 100).toFixed(2)
                : 0,
              shippingAddress: {
                address: order?.data?.direction?.address,
                postalCode: order?.data?.direction?.postalCode,
                district: order?.data?.direction?.district,
                city: order?.data?.direction?.city,
                country: order?.data?.direction?.country,
              },
              items: order?.products?.map(
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
                  item_brand: "Sport Zone",
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
        }
      }
    };
    fetchData();
    clearCart();
  }, [token]);

  return (
    <Box component="main" sx={{ bgcolor: "background.paper", px: 4, pb: 6, pt: 4 }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Button
          onClick={handleBackClick}
          startIcon={<ChevronLeft />}
          sx={{ mb: 4 }}
        >
          Back to <Typography color="primary" sx={{ ml: 1 }}>SportZone</Typography>
        </Button>

        <Typography variant="h6" color="primary">Thank you!</Typography>
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
        <Typography color="primary" gutterBottom>
          51547878755545848512
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
                  Price: $
                  {product.OrderProduct.price}
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
                {order?.paymentData?.card?.brand} ({order?.paymentData?.card?.funding})
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
              <Typography variant="body2">Takes up to 3 working days</Typography>
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
    </Box>
  );
}