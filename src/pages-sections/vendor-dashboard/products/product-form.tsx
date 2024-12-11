"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
import { Paragraph } from "components/Typography";
import { FormControlLabel, Switch } from "@mui/material";
import { createProduct, updateProduct } from "services/dashboardAdmin/products";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useRouter } from "next/navigation";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Name is required!"),
  collections: yup
    .array()
    .min(0, 'No collections selected')  // Permite que no se seleccione ninguna colección
    .optional(),  // Permite que el campo sea opcional
  content: yup.string().required("Description is required!"),
  sports: yup.string().required("Sport is required!"),
  status: yup.string().required("Status is required!"),
  regular_price: yup
  .number()
  .required("Price is required!")
  .positive("Price must be greater than 0!"),
  discount: yup.number().optional(),
  product_categories:  yup
  .array()
  .min(0, 'No Category selected')  // Permite que no se seleccione ninguna colección
  .optional(),  // Permite que el campo sea opcional
  featured: yup.boolean(),
  mostSold: yup.boolean(),
});

const sportList = [
  'Soccer',
  'Baseball',
  'Basketball',
  'Hockey',
  'Running',
  'Gaming'
]

// ================================================================
interface Props {
  product?: any; // Producto es opcional para casos de creación
  collectionsList: string[]
  categoriesList: string[]
}
// ================================================================

export default function ProductForm({ product, collectionsList, categoriesList }: Props) {
  const { profile } = useDashboardStore();
  const router = useRouter();

  const {
    title,
    content,
    status,
    featured,
    mostSold,
    product_categories,
    regular_price,
    id,
    discount,
    sports,
    collections,
  } = product || {};

  const INITIAL_VALUES = {
    title: title || "",
    collections: collections ? collections.map(({ title }: { title: string }) => title) : [],
    content: content || "",
    status: status || "draft",
    sports: sports || '',
    regular_price: regular_price || 0,
    discount: discount || 0,
    product_categories: product_categories ? product_categories.split('|') : [],
    featured: featured || false,
    mostSold: mostSold || false,
  };

  const [files, setFiles] = useState<File[]>([]);

  const update = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await updateProduct(id, values, profile.token as string);
      console.log(response);
      showSuccessAlert('Success', response.message)
    } catch (error) {
      showErrorAlert('Failed', 'The product could not be updated')
    }
  }

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await createProduct(values, profile.token as string);
      console.log(response);
      showSuccessAlert('Success', response.message)
      router.push('/admin/products/'+ response.createdProduct.id)
    } catch (error: any) {
      showErrorAlert('Failed', error.response.data.message)
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (!product) {
      create(values)
    } else {
      update(values)
    }
  };

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files: File[]) => {
    files.forEach((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setFiles(files);
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: File) => () => {
    setFiles((files) => files?.filter((item) => item.name !== file.name));
  };

  return (
    <Card className="p-3">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Name"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.title && errors.title as string}
                  error={Boolean(touched.title && errors.title)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="collections"
                  label="Collections"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.collections}  // Asegúrate de que sea un string
                  SelectProps={{
                    multiple: true,  // Permite la selección múltiple
                    renderValue: (selected) => {
                      return (selected as string[]).join(', '); // Muestra las opciones seleccionadas
                    }
                  }}
                  helperText={touched.collections && errors.collections as string}
                  error={Boolean(touched.collections && errors.collections)}
                >
                  {collectionsList?.map((collection) => (
                    <MenuItem key={collection} value={collection}>{collection}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  name="status"
                  label="Status"
                  color="info"
                  size="medium"
                  placeholder="Status"
                  onBlur={handleBlur}
                  value={values.status}
                  onChange={handleChange}
                  helperText={touched.status && errors.status as string}
                  error={Boolean(touched.status && errors.status)}
                >
                  <MenuItem key={'Publish'} value={'Publish'}>Publish</MenuItem>
                  <MenuItem key={'Draft'} value={'Draft'}>Draft</MenuItem>
                </TextField>
              </Grid> */}

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="product_categories"
                  onBlur={handleBlur}
                  placeholder="Categories"
                  onChange={handleChange}
                  value={values.product_categories}
                  label="Select Categories"
                  SelectProps={{
                    multiple: true,  // Permite la selección múltiple
                    renderValue: (selected) => {
                      return (selected as string[]).join(', '); // Muestra las opciones seleccionadas
                    }
                  }}
                  helperText={touched.product_categories && errors.product_categories as string}
                  error={Boolean(touched.product_categories && errors.product_categories)}
                >
                  {categoriesList.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="sports"
                  onBlur={handleBlur}
                  placeholder="Sport"
                  onChange={handleChange}
                  value={values.sports}
                  label="Select Sport"
                  helperText={touched.sports && errors.sports as string}
                  error={Boolean(touched.sports && errors.sports)}
                >
                  {sportList.map((sport) => (
                    <MenuItem key={sport} value={sport}>{sport}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="regular_price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.regular_price}
                  label="Regular Price"
                  onChange={handleChange}
                  placeholder="Regular Price"
                  helperText={touched.regular_price && errors.regular_price as string}
                  error={Boolean(touched.regular_price && errors.regular_price)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="discount"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.discount}
                  label="Discount"
                  onChange={handleChange}
                  placeholder="Discount"
                  helperText={touched.discount && errors.discount as string}
                  error={Boolean(touched.discount && errors.discount)}
                />
              </Grid>

              <Grid item display={'flex'} gap={1} sm={12} margin={'auto'} xs={12}>
                <Paragraph
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fontWeight={'bold'}
                >Sale Price:</Paragraph>
                <Paragraph
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fontWeight={'bold'}
                >${(values.regular_price - (values.regular_price * (values.discount / 100))).toFixed(2)}</Paragraph>
              </Grid>

              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  name="content"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.content}
                  helperText={touched.content && errors.content as string}
                  error={Boolean(touched.content && errors.content)}
                  multiline
                  rows={6}  // Ajusta la altura del TextField
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.featured} // El valor es booleano
                      onChange={handleChange} // Maneja el cambio de valor
                      name="featured" // El nombre del campo
                      color="info"
                    />
                  }
                  label="Featured"
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.mostSold} // El valor es booleano
                      onChange={handleChange} // Maneja el cambio de valor
                      name="mostSold" // El nombre del campo
                      color="info"
                    />
                  }
                  label="Most Sold"
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.status === 'publish'} // El valor es booleano
                      onChange={(e) => {
                        // Cambia el valor entre 'publish' y 'draft' según el estado del Switch
                        handleChange({
                          target: {
                            name: 'status',
                            value: e.target.checked ? 'publish' : 'draft',
                          },
                        })
                      }}
                      name="Publish" // El nombre del campo
                      color="info"
                    />
                  }
                  label="Publish"
                />
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files: any) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => (
                    <UploadImageBox key={index}>
                      <Box component="img" src={''} width="100%" />
                      <StyledClear onClick={handleFileDelete(file)} />
                    </UploadImageBox>
                  ))}
                </FlexBox>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {!product ? 'Create product' : 'Save product'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
