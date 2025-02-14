import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Box,
  Stack,
} from "@mui/material";

const sports = [
  "Soccer",
  "Hockey",
  "Baseball",
  "Running",
  "Basketball",
  "Gaming",
];
const colors = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "Brown",
  "Crimson",
  "Cyan",
  "Indigo",
  "Magenta",
  "Maroon",
  "Navy",
];

export default function RequestForm() {
  const [form, setForm] = useState({
    teamName: "",
    quantity: "",
    sport: "",
    color: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (color: string) => {
    setForm({ ...form, color });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        mb={10}
        sx={{ fontStyle: "italic", fontWeight: "bold" }}
      >
        Fill out the request form
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        align="left"
        mb={2}
        sx={{ fontStyle: "italic", fontWeight: "bold" }}
      >
        Type of request
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ color: "white", py: 1.5, }}
        >
          Single cost for graphic service
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ color: "white", py: 1.5 }}
        >
          I already have a sketch and print files
        </Button>
      </Stack>

      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          gutterBottom
          align="left"
          mb={2}
          sx={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          Team Name / Team
        </Typography>
        <TextField
          fullWidth
          name="teamName"
          margin="normal"
          value={form.teamName}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal">
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Select sport
          </Typography>
          <Select
            name="sport"
            value={form.sport}
            onChange={handleChange}
            required
          >
            {sports.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          variant="h6"
          gutterBottom
          align="left"
          mb={2}
          sx={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          Quantity
        </Typography>
        <TextField
          sx={{ width: "20%" }}
          type="number"
          name="quantity"
          margin="normal"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal">
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Color
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mb: 2,
              bgcolor: "white",
              p: 1,
            }}
          >
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: color.toLowerCase(),
                  marginRight: 1,
                  marginBottom: 1,
                  cursor: "pointer",
                  border: form.color === color ? "2px solid black" : "none",
                }}
              />
            ))}
          </Box>
        </FormControl>
        <Typography
          variant="h6"
          gutterBottom
          align="left"
          mb={2}
          sx={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          Your request
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your project in detail"
          name="description"
          margin="normal"
          value={form.description}
          onChange={handleChange}
          required
        />

        <Button
          variant="contained"
          sx={{
            bgcolor: "red",
            color: "white",
          }}
        >
          Customize Now
        </Button>
      </Box>
    </Container>
  );
}
