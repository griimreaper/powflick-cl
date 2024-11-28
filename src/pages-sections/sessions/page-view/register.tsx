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
import { useRouter } from "next/navigation";

const RegisterPageView = () => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const router = useRouter();

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
    name: yup.string().required("Name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    phone: yup.string().matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Phone number is not valid"
    ), // Opcional
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type password"),
    agreement: yup
      .bool()
      .oneOf([true], "You have to agree with our Terms and Conditions!")
      .required("You have to agree with our Terms and Conditions!"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit} =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const response = await registerUser({ ...values, provider: "none" });
        if (response.statusCode === 201) {
          showSuccessAlert("Success!", "User registered successfully!");
          router.push('/login')
        } else {
          showErrorAlert("Error!", response.message as string);
        }
      },
    });

    const onSubmit = async (values: any) => {
      const response = await registerUser({ ...values, provider: "none" });
      if (response.statusCode === 201) {
        showSuccessAlert("Success!", "User registered successfully!");
        router.push('/login')
      } else {
        showErrorAlert("Error!", response.message as string);
      }
    }

  return (
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

      <FormControlLabel
        name="agreement"
        className="agreement"
        onChange={handleChange}
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
            <Span display={{ sm: "none", xs: "inline-block" }}>Accept Our</Span>
            <BoxLink title="Terms & Condition" href="/" />
          </FlexBox>
        }
      />

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        onClick={() => onSubmit(values)}
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterPageView;
