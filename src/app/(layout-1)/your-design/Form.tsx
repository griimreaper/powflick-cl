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
  "#000000",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#FF00FF",
  "#8B0000",
  "#FFA500",
  "#BDB76B",
  "#9ACD32",
  "#008000",
  "#006400",
  "#3CB371",
  "#20B2AA",
  "#4682B4",
  "#191970",
  "#4B0082",
  "#800080",
  "#8B008B",
  "#D2B48C",
  "#A9A9A9",
  "#696969",
  "#8B4513",
  "#A52A2A",
  "#D2691E",
  "#8B0000",
  "#654321",
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
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
          fontFamily: "GYMER",
          color: "primary.main",
        }}
      >
        Fill out the request form
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        align="left"
        mb={2}
        sx={{
          fontStyle: "italic",
          fontWeight: "800",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Type of request
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5 }}
        >
          Single cost for graphic service
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5 }}
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
          sx={{
            fontStyle: "italic",
            fontWeight: "800",
            textAlign: { xs: "center", md: "left" },
          }}
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
          sx={{ border: "0.5px solid lightcoral", borderRadius: 2 }}
        />

        <FormControl fullWidth margin="normal">
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{
              fontStyle: "italic",
              fontWeight: "800",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Select sport
          </Typography>
          <Select
            name="sport"
            value={form.sport}
            onChange={handleChange}
            required
            sx={{ border: "0.5px solid lightcoral", borderRadius: 2 }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Please select
            </MenuItem>
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
          sx={{
            fontStyle: "italic",
            fontWeight: "800",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Quantity
        </Typography>
        <TextField
          sx={{
            width: "20%",
            border: "0.5px solid lightcoral",
            borderRadius: 2,
            display: { xs: "block", md: "inline-block" },
            margin: { xs: "0 auto", md: "0" },
            textAlign: { xs: "center", md: "left" },
          }}
          type="number"
          name="quantity"
          margin="normal"
          value={form.quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1) {
              handleChange(e); // Solo actualiza el estado si el número es >= 1
            }
          }}
          inputProps={{ min: 1 }} // Evita que el usuario baje de 1 con los controles del input
          required
        />

        <FormControl fullWidth margin="normal">
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{
              fontStyle: "italic",
              fontWeight: "800",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Color
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
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
                  width: 25,
                  height: 25,
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
          sx={{ fontStyle: "italic", fontWeight: "800" }}
        >
          Your request
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={10}
          placeholder="Describe your project in detail, indicate the model you have chosen, the colors and the positioning of the logos and graphics. Requests that do not meet these characteristics will not be processed."
          name="description"
          margin="normal"
          value={form.description}
          onChange={handleChange}
          required
          sx={{ border: "0.5px solid lightcoral", borderRadius: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: {
              xs: "0.5rem",
              sm: "1.0rem",
              md: "1.0rem",
              lg: "1.5rem",
              xl: "2rem",
            },
            padding: { xs: "8px 16px", sm: "8px 16px", md: "8px 16px" },
            marginTop: 4,
            display: { xs: "block" },
            marginLeft: { xs: "auto", md: 0 },
            marginRight: { xs: "auto", md: 0 },
          }}
        >
          Customize Now
        </Button>
      </Box>
    </Container>
  );
}
