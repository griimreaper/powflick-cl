import Link from "next/link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Image from "next/image";
// LOCAL CUSTOM COMPONENT
import ListItem from "../list-item";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph, Span } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import FlexBetween from "components/flex-box/flex-between";
import { useEffect, useState } from "react";
import { useShoppingCartStore } from "store/shoppingCart";
import { FlexBox } from "components/flex-box";
import { getCouponByCode } from "services/dashboardAdmin/coupons";
import { useSession } from "next-auth/react";
import { showErrorAlert } from "utils/alerts";
import { useRouter } from "next/navigation";
import { createOrder } from "services/Order";
import { goToStripe } from "../../../../fpixel";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Tooltip from '@mui/material/Tooltip';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const gatewayOptions = [
  // {
  //   value: "PAYPAL",
  //   label: "PayPal",
  //   img: "/assets/images/gateways/paypal-logo.png",
  // },
  {
    value: "LLP",
    label: "LLP",
    img: "/assets/images/gateways/llp-logo.png",
  },
];

export default function CheckoutSummary({ data, toggleDialog, selectedDirection }: any) {
  const { cart, total, setCoupon, coupon, note, setNote } = useShoppingCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [selectedGateway, setSelectedGateway] = useState(gatewayOptions[0].value);
  const [loading, setLoading] = useState(false);

  const subtotal = data.cart.reduce((acc: any, item: any) => acc + item.totalProduct, 0);
  const totalCustomizations = data.cart.reduce((acc: any, item: any) => acc + item.totalCustomization, 0);

  const { data: session } = useSession();
  const token = session?.user?.name?.split("|")[0]; // Ajusta según cómo guardes el token

  // Calcular descuento según tipo de cupón
  let discountValue = 0;
  if (coupon && coupon.type) {
    discountValue = coupon.type === "amount"
      ? coupon.discount
      : (subtotal + totalCustomizations) * (coupon.discount / 100);
  }

  let totalWithDiscount = subtotal + totalCustomizations - discountValue;
  if (totalWithDiscount < 0.10) totalWithDiscount = 0.10;

  const handleApplyCoupon = async () => {
    setError("");
    try {
      if (!token) {
        toggleDialog();
        showErrorAlert("You must be logged", "");
        return;
      }
      const couponData = await getCouponByCode(couponCode, token);
      if (!couponData || !couponData.active) {
        setError("Invalid or inactive coupon");
        return;
      }
      setCoupon(couponData);
    } catch (error) {
      setError(`Coupon not found or not available for your account`);
      console.log("Error fetching coupon:", error);

    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setError("");
  };

  const router = useRouter();

  return (
    <Card sx={{ padding: 3, boxShadow: '0 8px 32px 0 rgba(60,72,88,0.25)' }}>
      <ListItem mb={1} title="Subtotal" value={subtotal} />
      <ListItem mb={1} title="Customizations" value={totalCustomizations} />
      <ListItem
        mb={1}
        title={
          coupon && coupon.title
            ? `Coupon (${coupon.title} - ${coupon.type === "amount"
              ? `$${coupon.discount}`
              : `${coupon.discount}%`
            })`
            : "Coupon"
        }
        value={discountValue}
      />
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>
        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(totalWithDiscount)}
        </Span>
      </FlexBetween>
      <Divider sx={{ my: 2 }} />

      <FlexBox alignItems="center" columnGap={1} mb={2}>
        <Span fontWeight="600">Additional Comments</Span>
        <Span p="6px 10px" fontSize={12} lineHeight="1" borderRadius="3px" color="primary.main" bgcolor="primary.light">
          Optional
        </Span>
      </FlexBox>
      <TextField variant="outlined" rows={6} fullWidth multiline value={note} onChange={(e) => setNote(e.target.value)} />
      <Divider sx={{ mb: 2 }} />

      {/* APPLY VOUCHER TEXT FIELD */}
      <TextField
        fullWidth
        size="small"
        label="Coupon Code"
        variant="outlined"
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        error={!!error}
        helperText={error}
        disabled={!!coupon}
        sx={{ mb: 2, mt: 1 }}
      />
      <Stack direction="column" spacing={1} mb={2}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 4, textTransform: 'uppercase', minWidth: 120, fontWeight: 600 }}
          onClick={handleApplyCoupon}
          disabled={!!coupon}
        >
          Apply Coupon
        </Button>
        <Divider sx={{ my: 4 }} />
        {/* Métodos de pago como radio group */}
        <RadioGroup
          value={selectedGateway}
          onChange={(_, value) => setSelectedGateway(value)}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centra los radios horizontalmente
            width: "100%",
          }}
        >
          {gatewayOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio color="primary" />}
              sx={{
                mb: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginLeft: "auto",
                overflow: 'hidden',
                marginRight: "auto",
                '.MuiFormControlLabel-label': { width: '100%' },
                border: '1px solid #d32f2f',
                borderRadius: 2,
              }}
              label={
                // option.value === "PAYPAL" ? (
                //   <span
                //     style={{
                //       display: "flex",
                //       alignItems: "center",
                //       justifyContent: "center",
                //       width: "100%",
                //       fontWeight: 700,
                //       fontSize: 18,
                //       fontStyle: "italic",
                //       minHeight: 40,
                //     }}
                //   >
                //     <span style={{ color: "#003087" }}>Pay</span>
                //     <span style={{ color: "#0070ba" }}>Pal</span>
                //   </span>
                // ) :
                option.value === "LLP" ? (
                  <Paragraph
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: 'nowrap',
                      width: "100%",
                      fontWeight: 700,
                      fontSize: { xs: 12, md: 16 },
                      minHeight: 40,
                    }}
                  >
                    Credit Card
                    <span style={{ display: "flex", alignItems: "center", marginLeft: 8, gap: 4 }}>
                      <Image src="/assets/images/payment-methods/visa.png" alt="Visa" width={28} height={18} style={{ background: "#fff", borderRadius: 2 }} />
                      <Image src="/assets/images/payment-methods/master-card.png" alt="MasterCard" width={28} height={18} style={{ background: "#fff", borderRadius: 2 }} />
                      <Image src="/assets/images/payment-methods/amex.png" alt="Amex" width={28} height={18} style={{ background: "#fff", borderRadius: 2 }} />
                      <Image src="/assets/images/payment-methods/cirrus.png" alt="Discover" width={28} height={18} style={{ background: "#fff", borderRadius: 2 }} />
                    </span>
                  </Paragraph>
                ) : (
                  option.label
                )
              }
            />
          ))}
        </RadioGroup>
        <Tooltip title={
          !selectedDirection
            ? "Select a shipping address"
            : cart.length === 0
              ? "Add products to cart"
              : ""
        } arrow>
          <span style={{ display: 'block' }}>
            <Button
              id="continuePayment-button-event-click"
              variant={selectedGateway ? "contained" : "outlined"}
              color={selectedGateway ? "primary" : "inherit"}
              fullWidth
              sx={{
                mt: 2,
                mb: 4,
                textTransform: 'uppercase',
                minWidth: 120,
                fontWeight: 600,
                background: selectedGateway ? 'primary' : '#fff',
                color: selectedGateway ? 'primary' : 'primary.main',
                border: '2px solid',
                borderColor: 'primary.main',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                boxShadow: 'none',
                borderRadius: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: 22,
                  color: selectedGateway ? '#fff' : 'primary.main',
                },
                '&:hover': {
                  background: selectedGateway ? 'primary.main' : '#fff',
                  color: selectedGateway ? '#fff' : 'primary.main',
                  borderColor: 'primary.main',
                },
              }}
              disabled={cart.length === 0 || !selectedDirection || loading}
              onClick={async () => {
                setLoading(true);
                localStorage.setItem('toPurchase', 'true');
                try {
                  if (token && selectedDirection) {
                    const response = await createOrder(
                      token,
                      { cartProducts: cart },
                      selectedDirection.id,
                      'USD',
                      1,
                      coupon?.id,
                      note,
                      selectedGateway
                    );
                    if (typeof response === 'string') {
                      router.push(response);
                    }
                    (window as any).dataLayer?.push({ ecommerce: null });
                    (window as any).dataLayer?.push({
                      event: 'Go To Stripe',
                      ecommerce: {
                        currency: 'USD',
                        value: Number(totalWithDiscount),
                        coupon: coupon?.title || null,
                        discount: coupon?.discount || 0,
                        items: cart.map((item: any) => {
                          const { product, totalCustomization, totalProduct, amount } = item;
                          const { id, price, title, product_categories, colors, slug, sport } = product;
                          return {
                            item_id: id,
                            item_name: title,
                            affiliation: 'Google Merchandise Store',
                            item_brand: 'Pow Flick',
                            item_category: (product_categories ?? '').split('|')[0],
                            item_category2: sport,
                            item_list_name: slug,
                            item_variant: colors ? colors[0] : null,
                            price: Number(price),
                            quantity: amount,
                            total_product: Number(totalProduct),
                            total_customizations: Number(totalCustomization),
                          };
                        }),
                      },
                    });
                    goToStripe('goToStripe', {
                      ecommerce: {
                        currency: 'USD',
                        value: Number(totalWithDiscount),
                        coupon: coupon?.title || null,
                        discount: coupon?.discount || 0,
                        items: cart.map((item: any) => {
                          const { product, totalCustomization, totalProduct, amount } = item;
                          const { id, price, title, product_categories, colors, slug, sport } = product;
                          return {
                            item_id: id,
                            item_name: title,
                            item_brand: 'Pow Flick',
                            item_category: (product_categories ?? '').split('|')[0],
                            item_category2: sport,
                            item_list_name: slug,
                            item_variant: colors ? colors[0] : null,
                            price: Number(price),
                            quantity: amount,
                            total_product: Number(totalProduct),
                            total_customizations: Number(totalCustomization),
                          };
                        }),
                      },
                    });
                  }
                } catch (error: any) {
                  console.log("Error creating order:", error);

                  showErrorAlert('Error!', error?.response?.data?.message || 'An unexpected error occurred while creating the order.');
                } finally {
                  setLoading(false);
                }
              }}
            >
              {(!selectedDirection || cart.length === 0) ? (
                <WarningAmberIcon sx={{ mr: 1 }} />
              ) : null}
              {loading ? (
                <Image src="/assets/images/Double Ring-1s-200px.png" alt="Loader GIF" width={20} height={20} />
              ) : (
                'Checkout Now'
              )}
            </Button>
          </span>
        </Tooltip>
      </Stack>
      {coupon && (
        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ mb: 3 }}
          onClick={handleRemoveCoupon}
        >
          Remove Coupon
        </Button>
      )}
      <Divider sx={{ mb: 2 }} />
    </Card>
  );
}
