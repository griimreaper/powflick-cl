"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
import { Collection, CollectionType } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { createCollection, updateCollection } from "services/Collections";
import { Autocomplete, MenuItem } from "@mui/material";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required!"),
  order: yup
    .number()
    .typeError("Order must be a number!") // Mensaje si no es un número
    .required("Order is required!")
    .positive("Order must be greater than 0!") // Debe ser positivo
    .integer("Order must be an integer!") // Solo enteros
    .min(1, "Order must be at positive number!") // Mínimo valor permitido es 1
});

// ================================================================
interface Props {
  collection?: Collection,
  availableProducts: string[]; // Lista de productos disponibles para seleccionar
};

// ================================================================

export default function CollectionForm({ collection, availableProducts }: Props) {
  const { profile } = useDashboardStore();
  const router = useRouter();

  const {
    id,
    title,
    content,
    type,
    order,
    products,
  } = collection || {};

  const INITIAL_VALUES = {
    title: title || "",
    content: content || "",
    order: order || 1,
    type: type || "none",
    products: products?.map(p => p.title) || [],
  };

  const update = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await updateCollection(id!, values, profile.token as string);
      showSuccessAlert('Success', response.message)
    } catch (error) {
      showErrorAlert('Failed', 'The product could not be updated')
    }
  }

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await createCollection(values, profile.token as string);
      showSuccessAlert('Success', response.message)
      router.push('/admin/collections/' + response.createdCategory.id)
    } catch (error: any) {
      showErrorAlert('Failed', error.response.data.message)
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (!collection) {
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
                  name="title"
                  label="Title"
                  color="primary"
                  size="medium"
                  placeholder="Title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.title && errors.title}
                  error={Boolean(touched.title && errors.title)}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  name="type"
                  label="Type"
                  color="primary"
                  size="medium"
                  placeholder="Type"
                  value={values.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.type && errors.type}
                  error={Boolean(touched.type && errors.type)}
                >
                  {Object.values(CollectionType)?.map((collection) => (
                    <MenuItem key={collection} value={collection}>{collection}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="order"
                  type="number"
                  label="Order"
                  color="primary"
                  size="medium"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) { // Acepta solo números positivos
                      handleChange(e);
                    }
                  }}
                  placeholder="Order"
                  value={values.order}
                  onBlur={handleBlur}
                  helperText={touched.order && errors.order}
                  error={Boolean(touched.order && errors.order)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="content"
                  label="Content"
                  color="primary"
                  size="medium"
                  placeholder="Content"
                  value={values.content}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.content && errors.content}
                  error={Boolean(touched.content && errors.content)}
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
                  Save category
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
