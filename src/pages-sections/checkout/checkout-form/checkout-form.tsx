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
  ListItemIcon,
  ListItemText,
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

// Cambiar el valor inicial para que coincida con la primera opción disponible
export default function CheckoutForm({ toggleDialog, selectedDirection, setSelectedDirection }: {
  toggleDialog: any,
  selectedDirection: Direction | null,
  setSelectedDirection: (dir: Direction | null) => void
}) {
  const router = useRouter();
  const { cart, total, coupon, note } = useShoppingCartStore();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { profile } = useDashboardStore();
  const { directions } = profile.genericResponseUser;
  const { token } = profile;
  const [loading, setLoading] = useFlag();

  const handleDirectionChange = (event: any) => {
    const value = event.target.value;
    if (value === "") {
      setSelectedDirection(null);
    } else {
      setSelectedDirection(
        directions.find((dir) => dir.id === value) || null
      );
    }
  };

  console.log(cart);

  useEffect(() => {
    const savedData = localStorage.getItem("pendingAddress");
    if (savedData) {
      setShowForm(true);
      localStorage.removeItem("pendingAddress"); // <-- Elimina la bandera después de usarla
    }
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100vh",
      }}
    >

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
    </Box>
  );
}
