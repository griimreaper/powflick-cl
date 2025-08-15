"use client";

import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as yup from "yup";
// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible";
// GLOBAL CUSTOM COMPONENTS
import SportZoneTextField from "components/SportZoneTextField";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { signIn } from "next-auth/react";

// ==============================================================
interface Props {
  closeDialog?: () => void;
  redirectUrl?: string;
}
// ==============================================================

const LoginPageView = ({ closeDialog, redirectUrl }: Props) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const t = useTranslations("Auth.login");

  // LOGIN FORM FIELDS INITIAL VALUES
  const initialValues = { email: "", password: "" };

  // LOGIN FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    password: yup.string().required(t("errors.passwordRequired")),
    email: yup
      .string()
      .email(t("errors.emailInvalid"))
      .required(t("errors.emailRequired")),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        closeDialog?.();
      },
    });

  const onSubmit = async (values: any) => {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response?.error) {
      showErrorAlert("Error!", `${t("error")} ${response?.error}`);
    } else {
      showSuccessAlert("Success!", t("success"));

      setTimeout(() => {
        window.location.href = redirectUrl || "/";
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
        label={t("emailOrPhone")}
        placeholder={t("emailPlaceholder")}
        helperText={touched.email && errors.email}
        error={Boolean(touched.email && errors.email)}
      />

      <SportZoneTextField
        mb={2}
        fullWidth
        size="small"
        name="password"
        label={t("password")}
        autoComplete="on"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        placeholder="*********"
        type={visiblePassword ? "text" : "password"}
        helperText={touched.password && errors.password}
        error={Boolean(touched.password && errors.password)}
        InputProps={{
          endAdornment: (
            <EyeToggleButton
              show={visiblePassword}
              click={togglePasswordVisible}
            />
          ),
        }}
      />

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        onClick={() => onSubmit(values)}
      >
        {t("submit")}
      </Button>
    </form>
  );
};

export default LoginPageView;
