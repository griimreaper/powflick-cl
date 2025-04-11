"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import { recoverPassword } from "services/Login";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { CircularProgress, Dialog, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { Theme } from "@mui/material/styles";
import { Wrapper } from "../styles";

interface ResetPasswordPageViewProps {
  rendering?: boolean;
  setIsRendering?: (value: boolean) => void;
}

const ResetPassword: React.FC<ResetPasswordPageViewProps> = ({
  rendering,
  setIsRendering,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // FORM FIELD INITIAL VALUE
  const initialValues = { email: "" };
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

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
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } catch (error: any) {
        showErrorAlert("Error!", error.message || "Something went wrong");
      }
      setLoading(false);
    },
  });

  return (
    <Dialog
      scroll="body"
      open={rendering || false}
      fullWidth={isMobile}
      onClose={setIsRendering}
      sx={{ zIndex: 900 }}
    >
      <Wrapper>
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

        </Fragment>
      </Wrapper>
    </Dialog>
  );
};

export default ResetPassword;
