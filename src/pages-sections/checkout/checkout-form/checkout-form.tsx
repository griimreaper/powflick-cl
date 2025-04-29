import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useDashboardStore } from "store/dashboard";
import { Direction } from "models/types";
import DirectionForm from "./direction-form";
import { useShoppingCartStore } from "store/shoppingCart";
import useFlag from "hooks/useFlag";
import { createOrder } from "services/Order";
import Image from "next/image";
import DialogDrawer from "components/header/components/dialog-drawer";
import useHeader from "components/header/hooks/use-header";
import { goToStripe } from "../../../../fpixel";
import { showErrorAlert } from "utils/alerts";
import "react-phone-input-2/lib/material.css";


export default function CheckoutForm() {
  const router = useRouter();
  const { cart, total, coupon, note } = useShoppingCartStore();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { profile } = useDashboardStore();
  const { directions } = profile.genericResponseUser;
  const { token } = profile;
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(
    null
  );
  const [loading, setLoading] = useFlag();
  const { toggleDialog, dialogOpen } = useHeader();

  const handleDirectionChange = (event: any) => {
    const selectedIndex = event.target.value;
    if (selectedIndex === "") {
      setSelectedDirection(null);
    } else {
      setSelectedDirection(
        directions.find((dir) => dir.id === selectedIndex) || null
      );
    }
  };

  console.log(cart);

  useEffect(() => {
    const savedData = localStorage.getItem("pendingAddress");
    if (savedData) {
      setShowForm(true);
    }
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleProceedToPayment = async () => {
    setLoading(true);

    try {
      if (token && selectedDirection) {
        const response = await createOrder(
          token,
          {
            cartProducts: cart, // Enviar el carrito completo
          },
          selectedDirection.id,
          "USD",
          1,
          coupon?.id,
          note
        );

        if (typeof response === "string") {
          router.push(response);
        }
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      if (error.response && error.response.data && error.response.data.message) {
        showErrorAlert("Error!", error.response.data.message);
      } else {
        showErrorAlert("Error!", "An unexpected error occurred while creating the order.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Mensaje para el tooltip del botón deshabilitado
  const disabledReason = !selectedDirection
    ? "Select a shipping address"
    : cart.length === 0
      ? "Add products to cart"
      : "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100vh",
      }}
    >
      <DialogDrawer
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
        redirectUrl="/checkout"
      ></DialogDrawer>
      <Card>
        <CardContent>
          {/* Selector de direcciones */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <FormControl fullWidth sx={{ flex: 2 }}>
              <InputLabel id="direction-select-label">
                Select Address
              </InputLabel>
              <Select
                labelId="direction-select-label"
                value={selectedDirection?.id || ""}
                onChange={handleDirectionChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Select Address</em>
                </MenuItem>
                {directions.map(({ id, country, city, district }) => (
                  <MenuItem key={id} value={id}>
                    {`${country}, ${city}, ${district}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={toggleForm}
              sx={{ textTransform: "uppercase", minWidth: "150px" }}
            >
              Insert a New Address
            </Button>
          </Box>

          {/* Formulario para nueva dirección */}
          {showForm && (
            <DirectionForm
              address={null}
              toggleForm={toggleForm}
              toggleDialog={toggleDialog}
            />
          )}
        </CardContent>
      </Card>

      {/* Información de la dirección seleccionada */}
      {selectedDirection && !showForm && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Selected Direction:
            </Typography>
            <Typography>
              <strong>Country:</strong> {selectedDirection.country}
            </Typography>
            <Typography>
              <strong>City:</strong> {selectedDirection.city}
            </Typography>
            <Typography>
              <strong>Location:</strong> {selectedDirection.district}
            </Typography>
            {selectedDirection.address && (
              <Typography>
                <strong>Address:</strong> {selectedDirection.address}
              </Typography>
            )}
            {selectedDirection.addressReference && (
              <Typography>
                <strong>Address Reference:</strong>{" "}
                {selectedDirection.addressReference}
              </Typography>
            )}
            {selectedDirection.postalCode && (
              <Typography>
                <strong>Postal Code:</strong> {selectedDirection.postalCode}
              </Typography>
            )}
            {selectedDirection.neighborhood && (
              <Typography>
                <strong>Neighborhood:</strong> {selectedDirection.neighborhood}
              </Typography>
            )}
            {selectedDirection.phone && (
              <Typography>
                <strong>Phone:</strong> {selectedDirection.phone}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Botones de navegación */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <Button
              LinkComponent={Link}
              variant="contained"
              color="primary"
              href="/cart"
              fullWidth
              sx={{
                textTransform: "uppercase",
                minWidth: "150px"
              }}
            >
              Back to Cart
            </Button>
          </Grid>

          <Grid item sm={6} xs={12}>
            {(!selectedDirection || cart.length === 0) ? (
              <Tooltip title={disabledReason} arrow>
                <span style={{ display: "block" }}>
                  <Button
                    id="continuePayment-button-event-click"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff !important",
                      borderColor: "#fff",
                      borderWidth: 2,
                      borderStyle: "solid",
                      textTransform: "uppercase",
                      opacity: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      '& .MuiSvgIcon-root': {
                        fontSize: 22,
                        color: "#fff",
                      },
                      '&:hover': {
                        backgroundColor: "#000",
                        color: "#fff",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    <WarningAmberIcon />
                    Checkout Now
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Button
                id="continuePayment-button-event-click"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleProceedToPayment();
                  (window as any).dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
                  (window as any).dataLayer.push({
                    event: "Go To Stripe",
                    ecommerce: {
                      currency: "USD",
                      value: Number(total * (1 - (coupon?.discount || 0) / 100)),
                      coupon: coupon?.title || null,
                      discount: coupon?.discount || 0,
                      items: cart.map(
                        ({
                          product,
                          totalCustomization,
                          totalProduct,
                          amount,
                        }) => {
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
                            item_category: product_categories.split("|")[0],
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
                  goToStripe("goToStripe", {
                    ecommerce: {
                      currency: "USD",
                      value: Number(total * (1 - (coupon?.discount || 0) / 100)),
                      coupon: coupon?.title || null,
                      discount: coupon?.discount || 0,
                      items: cart.map(
                        ({
                          product,
                          totalCustomization,
                          totalProduct,
                          amount,
                        }) => {
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
                            // affiliation: "Google Merchandise Store",
                            item_brand: "Pow Flick",
                            item_category: product_categories.split("|")[0],
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
                }}
                fullWidth
                sx={{
                  textTransform: "uppercase",
                  minWidth: "150px"
                }}
              >
                {loading ? (
                  // Contenido cuando está cargando
                  <Image
                    src="/assets/images/Double Ring-1s-200px.png"
                    alt="Loader GIF"
                    width={20}
                    height={20}
                  />
                ) : (
                  "Checkout Now"
                )}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
