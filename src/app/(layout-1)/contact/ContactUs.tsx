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
import { ContactType } from "models/types";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";
import { Span } from "components/Typography";

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
      title: "",
      message: "",
      category: ContactType.GeneralHelp,
    },
  });

  const { profile, setMessages } = useDashboardStore();

  const onSubmit = async (data: any) => {
    try {
      // Add missing fields
      data.title = "Contact Form Submission";
      data.type = data.category;
      data.status = "new";

      const response = await sendMessage(data);
      if (response.status === 201) {
        showSuccessAlert("Success!", "Message sent successfully");
        if (profile.token) setMessages(data.messages);
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
      <Box
        sx={{
          py: { xs: 2, md: 10 },
          overflow: "auto",
          height: { xs: "auto" },
        }}
        style={{
          padding: 20,
          width: "100%",
          minHeight: "100vh", // cambiado de height a minHeight
          backgroundImage: `url(/assets/images/contact/POWFLICK_CONTACT.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",

          top: 0,
          left: 0,
          borderRadius: 8,
          zIndex: 1,
        }}
      >
        <Grid container spacing={4} mt={{ xs: 2, md: 6 }}>
          <Grid item xs={12} md={5}></Grid>
          <Grid item xs={12} md={7}>
            <Title
              variant="h2"
              fontSize={{ xs: 30, md: 50 }}
              align="left"
              color="white"
              fontFamily={"GYMER"}
            >
              Drop Us A Line
            </Title>
            <Typography
              variant="h6"
              color="white"
              mt={1}
              fontWeight={400}
              fontStyle={"italic"}
            >
              Use the form below to get in touch with the sales team
            </Typography>
            <Box component="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Your Name *"
                    {...register("name", { required: "Your Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputLabel-root": {
                        zIndex: 3,
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff !important", // solo el input, no tapa el label
                        ":hover": {
                          backgroundColor: "#fff !important", // solo el input, no tapa el label
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#fff !important", // fuerza la prioridad
                        position: "relative",     // ayuda si hay pseudo-elementos ::before
                        zIndex: 2,                // asegura que esté sobre cualquier fondo ::before
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Your Email *"
                    type="email"
                    {...register("email", {
                      required: "Your Email is required",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputLabel-root": {
                        zIndex: 3,
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff !important", // solo el input, no tapa el label
                        ":hover": {
                          backgroundColor: "#fff !important", // solo el input, no tapa el label
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#fff !important", // fuerza la prioridad
                        position: "relative",     // ayuda si hay pseudo-elementos ::before
                        zIndex: 2,                // asegura que esté sobre cualquier fondo ::before
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Title *"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputLabel-root": {
                        zIndex: 3,
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff !important", // solo el input, no tapa el label
                        ":hover": {
                          backgroundColor: "#fff !important", // solo el input, no tapa el label
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#fff !important", // fuerza la prioridad
                        position: "relative",     // ayuda si hay pseudo-elementos ::before
                        zIndex: 2,                // asegura que esté sobre cualquier fondo ::before
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    multiline
                    aria-multiline
                    label="Your Message *"
                    rows={4}
                    {...register("message", {
                      required: "Your Message is required",
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputLabel-root": {
                        zIndex: 3,
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff !important", // solo el input, no tapa el label
                        ":hover": {
                          backgroundColor: "#fff !important", // solo el input, no tapa el label
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#fff !important", // fuerza la prioridad
                        position: "relative",     // ayuda si hay pseudo-elementos ::before
                        zIndex: 2,                // asegura que esté sobre cualquier fondo ::before
                      },
                    }}
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
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          backgroundColor: "white", // solo el input, no tapa el label
                          borderRadius: 2,
                        },
                        "& .MuiFormHelperText-root": {
                          backgroundColor: "white",
                          color: "#d32f2f",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          margin: 0,
                        },
                      }}
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
            <Box mb={4} mt={4}>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Brand Name: </Span>
                BLUE STAR TRADING LIMITED
              </Typography>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Physical Address: </Span>
                RM C，6/F，WORLD TRUST TOWER 50 STANLEY STREET CENTRAL HK
              </Typography>
              {/* <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Postal Code: </Span>
                528000
              </Typography>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Tax ID Number: </Span>
                91440605MAE5F5JC1T
              </Typography> */}
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Primary Email: </Span>
                support@powflick.com
              </Typography>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Contact Phone: </Span>
                +86 15920110846
              </Typography>
            </Box>
            <Box mb={4} width={"70%"}>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>Open Hours: </Span>
                Mon - Fri: 7:30am - 8:00pm PST Saturday: 8:00am - 6:00pm PST
                Sunday: 9:00am - 5:00pm PST
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactUs;
