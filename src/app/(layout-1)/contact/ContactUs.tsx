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
      <Container sx={{ py: 10 }} style={{
        padding: 20,
        width: "100%",
        height: "100%",
        backgroundImage: `url(/assets/images/contact/POWFLICK_CONTACT.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "100%",
        top: 0,
        left: 0,
        borderRadius: 8,
        zIndex: 1,
      }}>
        <Grid container spacing={4} mt={6}>
          <Grid item xs={12} md={5}></Grid>
          <Grid item xs={12} md={7}>
            <Title variant="h2" fontSize={{xs:30, md:50}} align="left" color="white" fontFamily={"GYMER"}>
              Drop Us A Line
            </Title>
            <Typography variant="h6" color="white" mt={1} fontWeight={400} fontStyle={'italic'}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title *"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
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
            <Box mb={4} mt={4}>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>
                  Our Store: {" "}
                </Span>
                2163 Phillips Gap Rd, West Jefferson, North Carolina, United
                States
              </Typography>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>
                  Phone: {" "}
                </Span>
                +1 666 8888 {" "}
                <Span fontWeight={600}>
                  Email: {" "}
                </Span>
                hi.avitex@gmail.com
              </Typography>
            </Box>
            <Box mb={4} width={"70%"}>
              <Typography fontSize={15} fontWeight={200} color={"white"}>
                <Span fontWeight={600}>
                  Open Hours: {" "}
                </Span>
                Mon - Fri: 7:30am - 8:00pm PST Saturday: 8:00am - 6:00pm PST
                Sunday: 9:00am - 5:00pm PST
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
