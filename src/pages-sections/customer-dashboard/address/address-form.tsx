import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
// CUSTOM DATA MODEL
import { Direction } from "models/types";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { createDirection, updateDirection } from "services/Directions";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";

// =============================================================
type Props = { direction: Direction, token: string };
// =============================================================

export default function AddressForm({ direction, token }: Props) {
  const { addOrUpdateUserDirection } = useDashboardStore();
  const router = useRouter();

  const INITIAL_VALUES = {
    addressReference: direction?.addressReference || "",
    address: direction?.address || "",
    phone: direction?.phone || "",
    country: direction?.country || "",
    city: direction?.city || "",
    postalCode: direction?.postalCode || "",
    district: direction?.district || "",
    neighborhood: direction?.neighborhood || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    addressReference: yup.string().required("Title is required"),
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Phone number must be valid (10 digits)"
      )
      .required("Phone number is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    postalCode: yup
      .string()
      .required("Postal code is required"),
    district: yup.string().required("District is required"),
    neighborhood: yup.string().required("Neighborhood is required"),
  });

  // HANDLE FORM SUBMIT
  const handleSubmit = async (values: typeof INITIAL_VALUES) => {
    if (token) {
      try {
        if (direction) {
          const response = await updateDirection(token, { ...values, id: direction.id });
          showSuccessAlert("Success!", response.message);
          addOrUpdateUserDirection(response.direction);
        } else {
          const response = await createDirection(token, values);
          showSuccessAlert("Success!", response.message);
          addOrUpdateUserDirection(response.direction);
        }
        router.push('/address')
      } catch (error: any) {
        showErrorAlert(
          "Error!",
          `Error updating direction: ${error}`
        );
      }
    } else {
      return;
    }
    // Acción a realizar con los datos del usuario
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="addressReference"
                label="Title"
                onBlur={handleBlur}
                value={values.addressReference}
                onChange={handleChange}
                error={!!touched.addressReference && !!errors.addressReference}
                helperText={
                  (touched.addressReference && errors.addressReference) as string
                }
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address Line"
                onBlur={handleBlur}
                value={values.address}
                onChange={handleChange}
                error={!!touched.address && !!errors.address}
                helperText={(touched.address && errors.address) as string}
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

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onBlur={handleBlur}
                value={values.country}
                onChange={handleChange}
                error={!!touched.country && !!errors.country}
                helperText={(touched.country && errors.country) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onBlur={handleBlur}
                value={values.city}
                onChange={handleChange}
                error={!!touched.city && !!errors.city}
                helperText={(touched.city && errors.city) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                onBlur={handleBlur}
                value={values.postalCode}
                onChange={handleChange}
                error={!!touched.postalCode && !!errors.postalCode}
                helperText={(touched.postalCode && errors.postalCode) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="District"
                name="district"
                onBlur={handleBlur}
                value={values.district}
                onChange={handleChange}
                error={!!touched.district && !!errors.district}
                helperText={(touched.district && errors.district) as string}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Neighborhood"
                name="neighborhood"
                onBlur={handleBlur}
                value={values.neighborhood}
                onChange={handleChange}
                error={!!touched.neighborhood && !!errors.neighborhood}
                helperText={
                  (touched.neighborhood && errors.neighborhood) as string
                }
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
