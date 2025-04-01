"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENT
import BoxLink from "../components/box-link";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import { recoverPassword } from "services/Login";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  // FORM FIELD INITIAL VALUE
  const initialValues = { email: "" };

  // FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await recoverPassword(values.email);
        showSuccessAlert("Email Sent!", "Check your inbox for recovery instructions.");
      } catch (error: any) {
        showErrorAlert("Error!", error.message || "Something went wrong");
      }
      setLoading(false);
    },
  });

  return (
    <Fragment>
      <H3 mb={3} textAlign="center">
        Reset your password
      </H3>

      {/* FORM AREA */}
      <Box onSubmit={handleSubmit} component="form" display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          helperText={touched.email && errors.email}
          error={Boolean(touched.email && errors.email)}
        />

        <Button fullWidth type="submit" color="primary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress /> : "Reset"}
        </Button>
      </Box>

      {/* BOTTOM LINK AREA */}
      <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        Don&apos;t have an account?
        <BoxLink title="Register" href="/register" />
      </FlexRowCenter>
    </Fragment>
  );
};

export default ResetPassword;
