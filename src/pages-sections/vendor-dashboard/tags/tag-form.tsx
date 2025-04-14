"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
// STYLED COMPONENTS
import { Tags } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Autocomplete } from "@mui/material";
import { createTags, updateTags } from "services/Tags";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Title is required!"),
});

// ================================================================
interface Props {
  tag?: Tags,
  availableProducts: string[]; // Lista de productos disponibles para seleccionar
};

// ================================================================

export default function TagsForm({ tag, availableProducts }: Props) {
  const { profile } = useDashboardStore();
  const router = useRouter();

  const {
    id,
    name,
    products,
  } = tag || {};

  const INITIAL_VALUES = {
    name: name || "",
    products: products?.map(p => p.title) || [],
  };

  const update = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await updateTags(id!, values, profile.token as string);
      showSuccessAlert('Success', response.message)
    } catch (error) {
      showErrorAlert('Failed', 'The product could not be updated')
    }
  }

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await createTags(values, profile.token as string);
      showSuccessAlert('Success', response.message)
      router.push('/admin/tags/' + response.createdTag.id)
    } catch (error: any) {
      console.log(error);
      
      showErrorAlert('Failed', error.response?.data?.message)
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (!tag) {
      create(values)
    } else {
      update(values)
    }
  };

  return (
    <Card className="p-3">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Title"
                  color="primary"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <Autocomplete
                  multiple
                  id="products"
                  options={availableProducts}
                  getOptionLabel={(option) => option} // Suponiendo que el nombre del producto está en `option`
                  value={values.products} // Mantener el estado de los productos seleccionados
                  onChange={(event, newValue) => {
                    handleChange({
                      target: { name: 'products', value: newValue },
                    });
                  }}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Products"
                      color="primary"
                      size="medium"
                      placeholder="Search products"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option === value} // Comparar el valor de la opción con el valor seleccionado
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Save tag
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
