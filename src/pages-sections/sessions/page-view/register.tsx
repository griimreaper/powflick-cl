"use client";

import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
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
import { Box, Dialog, FormControl, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
import { Wrapper } from "pages-sections/sessions/styles";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import './index.css'

interface RegisterPageViewProps {
  rendering?: boolean;
  setIsRendering?: (value: boolean) => void;
}

const RegisterPageView: React.FC<RegisterPageViewProps> = ({
  rendering,
  setIsRendering,
}) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const t = useTranslations("Auth.register");
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
    firstName: yup.string().required(t("errors.firstName")),
    lastName: yup.string().required(t("errors.lastName")),
    email: yup.string().email(t("errors.emailInvalid")).required(t("errors.emailRequired")),
    password: yup.string().required(t("errors.passwordRequired")),
    phone: yup
      .string()
      .matches(/^(\+\d{1,4}[- ]?)?(\d{1,4}[- ]?)?(\d{1,4}[- ]?)?\d{3,4}$/, t("errors.phoneInvalid"))
      .required(t("errors.phoneRequired")),
    re_password: yup
      .string()
      .oneOf([yup.ref("password")], t("errors.passwordsMustMatch"))
      .required(t("errors.retypePasswordRequired")),
    agreement: yup
      .bool()
      .oneOf([true], t("errors.agreement"))
      .required(t("errors.agreement")),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const response = await registerUser({ ...values }, "none");
        if (response.statusCode === 201) {
          showSuccessAlert("Success!", t("success"));
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
            label={t("firstName")}
            variant="outlined"
            onBlur={handleBlur}
            value={values.firstName}
            onChange={handleChange}
            placeholder={t("placeholders.firstName")}
            error={!!touched.firstName && !!errors.firstName}
            helperText={(touched.firstName && errors.firstName) as string}
          />

          <SportZoneTextField
            mb={1.5}
            fullWidth
            name="lastName"
            size="small"
            label={t("lastName")}
            variant="outlined"
            onBlur={handleBlur}
            value={values.lastName}
            onChange={handleChange}
            placeholder={t("placeholders.lastName")}
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
            label={t("email")}
            placeholder="exmple@mail.com"
            error={!!touched.email && !!errors.email}
            helperText={(touched.email && errors.email) as string}
          />

          <Box mb={1.5} width="100%">
            <FormControl required fullWidth>
              <label
                htmlFor="phone"
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: "#2B3445",
                }}
              >
                {t("phone")}
              </label>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  onBlur: handleBlur,
                }}
                inputStyle={{ height: '45px' }}
                country={"us"}
                specialLabel=""
                value={values.phone}
                onChange={(value) => {
                  handleChange({ target: { name: "phone", value } });
                }}
              />
              {touched.phone && errors.phone && (
                <div style={{ color: "red", fontSize: 10, marginTop: 4, marginLeft: 12 }}>
                  {errors.phone}
                </div>
              )}
            </FormControl>
          </Box>

          <SportZoneTextField
            mb={1.5}
            fullWidth
            size="small"
            name="password"
            label={t("password")}
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
            label={t("retypePassword")}
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
                    {t("agreementLong")}
                  </Span>
                  <Span display={{ sm: "none", xs: "inline-block" }}>
                    {t("agreementShort")}
                  </Span>
                  <BoxLink title={t("terms")} href="/terms-condition" />
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
            {t("createAccount")}
          </Button>
        </form>
      </Wrapper>
    </Dialog>
  );
};

export default RegisterPageView;
