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
import { useRouter } from "next/navigation";

// ==============================================================
type Props = { user: Profile['genericResponseUser'], token: string, image: string };
// ==============================================================

export default function ProfileEditForm({ user, token, image }: Props) {
  const { setProfileUser } = useDashboardStore();
  const router = useRouter();
  const INITIAL_VALUES = {
    image: image || "",
    email: user.email || "",
    phone: user.phone || "",
    lastName: user.lastName || "",
    firstName: user.firstName || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
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
        router.push('/dashboard/profile')
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
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
      // Sincroniza el cambio de imagen
      if (values.image !== image) {
        setFieldValue("image", image);
      }

      return (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                error={!!touched.firstName && !!errors.firstName}
                helperText={(touched.firstName && errors.firstName) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                error={!!touched.lastName && !!errors.lastName}
                helperText={(touched.lastName && errors.lastName) as string}
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
      );
    }}
  </Formik>
  );
}
