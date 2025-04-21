"use client";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import SportZoneTextField from "components/SportZoneTextField";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { registerUser } from "services/Register";
import { Dialog, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
import { Wrapper } from "pages-sections/sessions/styles";

interface RegisterPageViewProps {
  rendering?: boolean;
  setIsRendering?: (value: boolean) => void;
}

const RegisterPageView: React.FC<RegisterPageViewProps> = ({
  rendering,
  setIsRendering,
}) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  // COMMON INPUT PROPS FOR TEXT FIELD
  const inputProps = {
    endAdornment: (
      <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    ),
  };

  // REGISTER FORM FIELDS INITIAL VALUES
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    agreement: false,
  };

  // REGISTER FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    phone: yup
      .string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid"), // Opcional
    re_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please re-type password"),
    agreement: yup
      .bool()
      .oneOf([true], "You have to agree with our Terms and Conditions!")
      .required("You have to agree with our Terms and Conditions!"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const response = await registerUser({ ...values }, "none");
        if (response.statusCode === 201) {
          showSuccessAlert("Success!", "User registered successfully!");
          rendering && setIsRendering ? setIsRendering(false) : null
        } else {
          showErrorAlert("Error!", response.message as string);
        }
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
        <LogoWithTitle />
        <form onSubmit={handleSubmit}>
          <SportZoneTextField
            mb={1.5}
            fullWidth
            name="firstName"
            size="small"
            label="First Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.firstName}
            onChange={handleChange}
            placeholder="Ralph"
            error={!!touched.firstName && !!errors.firstName}
            helperText={(touched.firstName && errors.firstName) as string}
          />

          <SportZoneTextField
            mb={1.5}
            fullWidth
            name="lastName"
            size="small"
            label="Last Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.lastName}
            onChange={handleChange}
            placeholder="Bilkings"
            error={!!touched.lastName && !!errors.lastName}
            helperText={(touched.lastName && errors.lastName) as string}
          />

          <SportZoneTextField
            mb={1.5}
            fullWidth
            name="email"
            size="small"
            type="email"
            variant="outlined"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            label="Email"
            placeholder="exmple@mail.com"
            error={!!touched.email && !!errors.email}
            helperText={(touched.email && errors.email) as string}
          />

          <SportZoneTextField
            mb={1.5}
            fullWidth
            name="phone"
            size="small"
            type="tel"
            variant="outlined"
            onBlur={handleBlur}
            value={values.phone}
            onChange={handleChange}
            label="Phone"
            placeholder="+54 1170244654"
            error={!!touched.phone && !!errors.phone}
            helperText={(touched.phone && errors.phone) as string}
          />

          <SportZoneTextField
            mb={1.5}
            fullWidth
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            autoComplete="on"
            placeholder="*********"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            type={visiblePassword ? "text" : "password"}
            error={!!touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            InputProps={inputProps}
          />

          <SportZoneTextField
            fullWidth
            size="small"
            autoComplete="on"
            name="re_password"
            variant="outlined"
            label="Retype Password"
            placeholder="*********"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.re_password}
            type={visiblePassword ? "text" : "password"}
            error={!!touched.re_password && !!errors.re_password}
            helperText={touched.re_password && errors.re_password}
            InputProps={inputProps}
          />

          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControlLabel
              name="agreement"
              className="agreement"
              onChange={handleChange} // Vincula correctamente con Formik
              onBlur={handleBlur} // Marca el campo como "tocado" para que la validación funcione
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={values.agreement || false}
                />
              }
              label={
                <FlexBox
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={1}
                >
                  <Span display={{ sm: "inline-block", xs: "none" }}>
                    By signing up, you agree to
                  </Span>
                  <Span display={{ sm: "none", xs: "inline-block" }}>
                    Accept Our
                  </Span>
                  <BoxLink title="Terms & Condition" href="/" />
                </FlexBox>
              }
            />
            {/* Mostrar error si aplica */}
            {touched.agreement && errors.agreement && (
              <Span style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.agreement}
              </Span>
            )}
          </div>

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Create Account
          </Button>
        </form>
      </Wrapper>
    </Dialog>
  );
};

export default RegisterPageView;
