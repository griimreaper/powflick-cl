"use client";

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container maxWidth={false} style={{ backgroundColor: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "56.25%", // 1920x1080 aspect ratio (1080/1920 = 0.5625)
          backgroundImage: "url('/DESIGN_BACKGROUND.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Puedes agregar contenido adicional aquí */}
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "33.8%", // 1920x649 aspect ratio (649/1920 = 0.338)
          backgroundImage: "url('/DESIGN_INFERIOR.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Steps Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "51.77%", // 1920x994 aspect ratio (994/1920 = 0.5177)
          backgroundImage: "url('/DESIGN_WORK.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Form Section */}
      <Box sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          FILL OUT THE REQUEST FORM
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Team Name / Team" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select a sport"
              variant="outlined"
            >
              <MenuItem value="soccer">Soccer</MenuItem>
              <MenuItem value="basketball">Basketball</MenuItem>
              <MenuItem value="football">Football</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your request"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button variant="contained" sx={{ bgcolor: "red" }}>
            Customize Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
