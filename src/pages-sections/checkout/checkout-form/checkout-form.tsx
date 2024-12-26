import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDashboardStore } from "store/dashboard";
import { Direction } from "models/types";
import DirectionForm from "./direction-form";
import { useShoppingCartStore } from "store/shoppingCart";
import useFlag from "hooks/useFlag";
import { createOrder } from "services/Order";
import Image from "next/image";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, coupon } = useShoppingCartStore();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { profile } = useDashboardStore();
  const { directions } = profile.genericResponseUser;
  const { token } = profile;
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [loading, setLoading] = useFlag();

  const handleDirectionChange = (event: any) => {
    const selectedIndex = event.target.value;
    if (selectedIndex === "") {
      setSelectedDirection(null);
    } else {
      setSelectedDirection(directions.find((dir) => dir.id === selectedIndex) || null);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    const Cart = cart.map((item) => ({
      customizations: item.customizations,
      productId: item.product.id.toString(),
    }));

    if (token && selectedDirection) {
      const response = await createOrder(
        token,
        Cart,
        selectedDirection.id,
        'USD',
        1,
        coupon?.id
      );

      typeof response === "string" ? router.push(response) : null;
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Selector de direcciones */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="direction-select-label">Select Direction</InputLabel>
          <Select
            labelId="direction-select-label"
            value={selectedDirection?.id || ""}
            onChange={handleDirectionChange}
            fullWidth
          >
            <MenuItem value="">
              <em>Select Direction</em>
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
          fullWidth
          sx={{ textTransform: "uppercase" }}
        >
          Insert a New Direction
        </Button>
      </Box>

      {/* Formulario para nueva dirección */}
      {showForm && <DirectionForm address={null} toggleForm={toggleForm} />}

      {/* Información de la dirección seleccionada */}
      {selectedDirection && !showForm && (
        <Box sx={{ my: 1, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
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
              <strong>Address Reference:</strong> {selectedDirection.addressReference}
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
        </Box>
      )}

      {/* Botones de navegación */}
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            variant="outlined"
            color="primary"
            href="/cart"
            fullWidth
          >
            Back to Cart
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProceedToPayment}
            fullWidth
            disabled={!selectedDirection || cart.length === 0}
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
              "Proceed to Payment"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
