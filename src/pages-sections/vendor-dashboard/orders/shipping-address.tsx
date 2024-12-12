import { useState } from "react";
import { Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Direction } from "models/types";

// ==============================================================
// Definición del tipo de Props
type Props = {
  direction: Direction;
  note: string;
  directions: Direction[],
  setUpdateOrder: Function,
};
// ==============================================================

export default function ShippingAddress({ direction, note, directions, setUpdateOrder }: Props) {
  const [selectedDirection, setSelectedDirection] = useState<Direction>(direction);
  const [orderNote, setOrderNote] = useState<string>(note || "");

  const handleDirectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newDirection = directions.find((dir) => dir.address === event.target.value)!;
    setSelectedDirection(newDirection);
    setUpdateOrder((prev: any) => ({
      ...prev,
      directionId: newDirection,
    }));
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNote(event.target.value);
    setUpdateOrder((prev: any) => ({
      ...prev,
      note: event.target.value,
    }));
};

const {
  address,
  city,
  country,
  district,
  addressReference,
  neighborhood,
  phone,
  postalCode,
} = selectedDirection;

return (
  <Card sx={{ px: 3, py: 4 }}>
    <Typography variant="h6" color="text.primary" gutterBottom>
      Select Shipping Address
    </Typography>

    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="address-selector-label">Select Address</InputLabel>
      <Select
        labelId="address-selector-label"
        value={selectedDirection.address}
        onChange={() => handleDirectionChange}
        variant="outlined"
      >
        {directions.map((dir) => (
          <MenuItem key={dir.address} value={dir.address}>
            {dir.addressReference}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Address:</strong> {address}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>City:</strong> {city}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Country:</strong> {country}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>District:</strong> {district}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Address Reference:</strong> {addressReference}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Neighborhood:</strong> {neighborhood}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Phone:</strong> {phone}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      <strong>Postal Code:</strong> {postalCode}
    </Typography>

    <TextField
      sx={{ mt: 2 }}
      rows={5}
      multiline
      fullWidth
      color="info"
      variant="outlined"
      label="Customer’s Note"
      onChange={handleNoteChange}
      defaultValue={note}
    />
  </Card>
);
}
