"use client";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// FORMIK
import { Formik } from "formik";
// YUP
import * as yup from "yup";
// CUSTOM DATA MODEL
import User from "models/User.model";
import { Profile } from "models/types";
import { userUpdateProfile } from "services/DashboardUser/profile";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";

// ==============================================================
type Props = { user: Profile['genericResponseUser'], token: string };
// ==============================================================

export default function ProfileEditForm({ user, token }: Props) {
  const { setProfileUser } = useDashboardStore();
  const INITIAL_VALUES = {
    email: user.email || "",
    phone: user.phone || "",
    last_name: user.lastName || "",
    first_name: user.firstName || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    phone: yup.string().matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Phone number is not valid"
    ), // Opcional
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (token) {
      try {
        const response = await userUpdateProfile(token, values);
        showSuccessAlert("Success!", response.message);
        setProfileUser(response.profileUpdated);
      } catch (error: any) {
        showErrorAlert(
          "Error!",
          `Error updating profile: ${error}`
        );
      }
    } else {
      return;
    }
    // Acción a realizar con los datos del usuario
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="first_name"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                error={!!touched.first_name && !!errors.first_name}
                helperText={(touched.first_name && errors.first_name) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="last_name"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                error={!!touched.last_name && !!errors.last_name}
                helperText={(touched.last_name && errors.last_name) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                helperText={(touched.email && errors.email) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onBlur={handleBlur}
                value={values.phone}
                onChange={handleChange}
                error={!!touched.phone && !!errors.phone}
                helperText={(touched.phone && errors.phone) as string}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
