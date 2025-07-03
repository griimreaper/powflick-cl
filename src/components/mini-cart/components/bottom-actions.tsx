import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useShoppingCartStore } from "store/shoppingCart";
import { beginCheckout } from "../../../../fpixel";

// ==============================================================
interface Props {
  total: number;
  handleNavigate: (path: string) => void;
}
// ==============================================================

export default function BottomActions({ total, handleNavigate }: Props) {
  const { cart, setCoupon, coupon } = useShoppingCartStore();

  console.log(coupon);

  const addDatalayer = () => {
    (window as any).dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    (window as any).dataLayer.push({
      event: "Inicio Checkout",
      ecommerce: {
        currency: "USD",
        value: Number(total * (1 - (coupon?.discount || 0) / 100)),
        coupon: coupon?.title || null,
        discount: coupon?.discount || 0,
        items: cart.map(
          ({ product, totalCustomization, totalProduct, amount }) => {
            const {
              id,
              price,
              title,
              product_categories,
              colors,
              slug,
              sport,
            } = product;
            return {
              item_id: id,
              item_name: title,
              affiliation: "Google Merchandise Store",
              item_brand: "Pow Flick",
              item_category: product_categories ? product_categories.split("|")[0] : "",
              item_category2: sport,
              item_list_name: slug,
              item_variant: colors ? colors[0] : null,
              price: Number(price),
              quantity: amount,
              total_product: Number(totalProduct),
              total_customizations: Number(totalCustomization),
            };
          }
        ),
      },
    });
    beginCheckout("beginCheckout", {
      ecommerce: {
        currency: "USD",
        value: Number(total * (1 - (coupon?.discount || 0) / 100)),
        coupon: coupon?.title || null,
        discount: coupon?.discount || 0,
        items: cart.map(
          ({ product, totalCustomization, totalProduct, amount }) => {
            const {
              id,
              price,
              title,
              product_categories,
              colors,
              slug,
              sport,
            } = product;
            return {
              item_id: id,
              item_name: title,
              //  affiliation: "Google Merchandise Store",
              item_brand: "Pow Flick",
              item_category: product_categories?.split("|")[0],
              item_category2: sport,
              item_list_name: slug,
              item_variant: colors ? colors[0] : null,
              price: Number(price),
              quantity: amount,
              total_product: Number(totalProduct),
              total_customizations: Number(totalCustomization),
            };
          }
        ),
      },
    });
  };

  return (
    <Box p={2.5} position={'relative'} bottom={{ xs: 60, md: 0 }} bgcolor={'white'}>
      <Button
        id="continueToPayment-button-event-click"
        fullWidth
        color="primary"
        variant="contained"
        sx={{ mb: "0.75rem", height: "40px" }}
        onClick={() => {
          handleNavigate("/checkout");
          addDatalayer();
        }}
      >
        Checkout Now ({total.toFixed(2)})
      </Button>

      <Button
        id="continueToPayment-button-event-click"
        fullWidth
        color="primary"
        variant="outlined"
        sx={{ height: 40 }}
        onClick={() => {
          handleNavigate("/cart");
          addDatalayer();
        }}
      >
        View Cart
      </Button>
    </Box>
  );
}
