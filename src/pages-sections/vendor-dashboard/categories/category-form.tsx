"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
import { Category } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { Autocomplete } from "@mui/material";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { createCategory, updateCategory } from "services/Categories";
import { createProduct } from "services/dashboardAdmin/products";

// FORM FIELDS VALIDATION
const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required")
});

// ================================================================
interface Props {
  category?: Category,
  availableProducts: string[]; // Lista de productos disponibles para seleccionar
};
// ================================================================

export default function CategoryForm({ category, availableProducts }: Props) {
  const { profile } = useDashboardStore();
  const router = useRouter();

  const {
    id,
    name,
    products,
  } = category || {};

  const INITIAL_VALUES = {
    name: name || "",
    products: products?.map(p => p.title) || [],
  };

  const update = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await updateCategory(id!, values, profile.token as string);
      showSuccessAlert('Success', response.message)
    } catch (error) {
      showErrorAlert('Failed', 'The product could not be updated')
    }
  }

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await createCategory(values, profile.token as string);
      showSuccessAlert('Success', response.message)
      router.push('/admin/categories/'+ response.createdCategory.id)
    } catch (error: any) {
      showErrorAlert('Failed', error.response.data.message)
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (!category) {
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
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  color="primary"
                  size="medium"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
              </Grid>

              {/* Campo Autocomplete para seleccionar productos */}
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


              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="primary"
                  size="medium"
                  name="parent"
                  onBlur={handleBlur}
                  value={values.parent}
                  onChange={handleChange}
                  placeholder="Parent Category"
                  label="Select Parent Category"
                  SelectProps={{ multiple: true }}>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField>
              </Grid> */}

              {/* <Grid item sm={6} xs={12}>
                <FormControlLabel
                  label="Featured Category"
                  control={
                    <Checkbox
                      color="primary"
                      name="featured"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.featured}
                    />
                  }
                />
              </Grid> */}

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                {!category ? 'Create category' : 'Save category'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
