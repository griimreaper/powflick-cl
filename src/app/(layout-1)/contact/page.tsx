"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  styled,
} from "@mui/material";

import { sendMessage } from "services/messages";
import { ContactType } from "app/types";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      category: ContactType.GeneralHelp,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Add missing fields
      data.title = "Contact Form Submission";
      data.type = data.category;
      data.status = "new";

      const response = await sendMessage(data);
      if (response.status === 201) {
        showSuccessAlert("Success!", "Message sent successfully");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showErrorAlert("Error!", "Failed to send message");
    } finally {
      reset();
    }
  };

  const Title = styled(Typography)({
    fontWeight: "bold",
    // textTransform: "uppercase",
    letterSpacing: "2px",
  });

  return (
    <>
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Title variant="h2" align="left" color="black" gutterBottom>
              Drop Us A Line
            </Title>
            <Typography variant="h6" color="#a0a0a0" mt={3}>
              Use the form below to get in touch with the sales team
            </Typography>
            <Box component="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name *"
                    {...register("name", { required: "Your Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email *"
                    type="email"
                    {...register("email", {
                      required: "Your Email is required",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message *"
                    multiline
                    rows={4}
                    {...register("message", {
                      required: "Your Message is required",
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      label="Category"
                      defaultValue={ContactType.GeneralHelp}
                      {...register("category")}
                      sx={{ backgroundColor: "white" }}
                    >
                      {Object.values(ContactType).map((type) => (
                        <MenuItem key={type as string} value={type as string}>
                          {type as string}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 4 }}
              >
                Send message
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={4}>
              <Typography variant="h4">Our Store</Typography>
              <Typography mt={3}>
                2163 Phillips Gap Rd, West Jefferson, North Carolina, United
                States
              </Typography>
              <Typography mt={3}>Phone: +1 666 8888</Typography>
              <Typography mt={1}>Email: hi.avitex@gmail.com</Typography>
            </Box>
            <Box>
              <Typography variant="h4">Open Hours</Typography>
              <Typography mt={3}>Mon - Fri: 7:30am - 8:00pm PST</Typography>
              <Typography mt={3}>Saturday: 8:00am - 6:00pm PST</Typography>
              <Typography mt={3}>Sunday: 9:00am - 5:00pm PST</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
