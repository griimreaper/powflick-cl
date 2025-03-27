"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
// STYLED COMPONENTS
import { H3, Paragraph } from "components/Typography";
import { FormControlLabel, IconButton, Switch, Tooltip } from "@mui/material";
import { createProduct, updateProduct, uploadFolder } from "services/dashboardAdmin/products";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useRouter } from "next/navigation";
import ImageUploader from "components/DropZone";
import { Info } from "@mui/icons-material";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Name is required!"),
  slug: yup.string().required("Slug is required!"),
  collections: yup
    .array()
    .min(0, 'No collections selected')  // Permite que no se seleccione ninguna colección
    .optional(),  // Permite que el campo sea opcional
  tags: yup
    .array()
    .min(0, 'No tags selected')  // Permite que no se seleccione ninguna colección
    .optional(),  // Permite que el campo sea opcional
  score: yup.number().optional(),
  content: yup.string().required("Description is required!"),
  sports: yup.string().required("Sport is required!"),
  status: yup.string().required("Status is required!"),
  regular_price: yup
    .number()
    .required("Price is required!")
    .positive("Price must be greater than 0!"),
  discount: yup.number().optional(),
  product_categories: yup
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
  tagList: string[]
}
type ProductFormData = {
  [key: string]: any;
  title: any;
  collections: any;
  content: any;
  status: any;
  sports: any;
  regular_price: any;
  discount: any;
  tags: any;
  score: any;
  product_categories: any;
  featured: any;
  mostSold: any;
};

// ================================================================

export default function ProductForm({ product, collectionsList, categoriesList, tagList }: Props) {
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
    slug,
    images,
    sports,
    collections,
    tags,
    score,
  } = product || {};

  const INITIAL_VALUES: ProductFormData = {
    title: title || "",
    collections: collections ? collections.map(({ title }: { title: string }) => title) : [],
    content: content || "",
    status: status || "draft",
    sports: sports || '',
    regular_price: regular_price || 0,
    discount: discount || 0,
    score: score || 0,
    product_categories: product_categories ? product_categories.split('|') : [],
    tags: tags ? tags.map(({ name }: { name: string }) => name) : [],
    featured: featured || false,
    mostSold: mostSold || false,
    slug: slug || "",
  };
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const fetchImages = async () => {
      try {
        const nameFile: { [key: number]: string } = {};
        let additionalCount = 3;

        const imageFiles = await Promise.all(
          images.map(async (image: string, index: number) => {
            const response = await fetch(image);
            const blob = await response.blob();
            // Extraer el nombre del archivo desde la URL
            const fileNameFromUrl = image.split("/").pop() || "";

            // Definir nombres clave
            let fileName = `ADDITIONAL_${additionalCount}.jpg`;

            if (fileNameFromUrl.includes("Front_1")) {
              fileName = "Front_1.png";
            } else if (fileNameFromUrl.includes("Back_2")) {
              fileName = "Back_2.png";
            } else if (fileNameFromUrl.includes("customization_1")) {
              fileName = "Front-customization_1.png";
            } else if (fileNameFromUrl.includes("customization_2")) {
              fileName = "Back_customization_2.png";
            } else {
              additionalCount++; // Aumentar el contador para archivos adicionales
            }

            return new File([blob], fileName, { type: blob.type });
          })
        );

        setFiles(imageFiles);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [images]);

  const uploadImages = async () => {
    try {
      const main = files.filter(f => f && !f?.name.includes('customization'))
      const custom = files.filter(f => f && f?.name.includes('customization'))
      if (main.length > 0) {
        await uploadFolder(
          main,
          title,
        );
      }
      if (custom.length > 0) {
        await uploadFolder(
          custom,
          title + '/SinLogo',
        );
      }
    } catch (error) {
      showErrorAlert('Failed', 'The product images cannot be updated')
    }
  }

  const update = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await updateProduct(id, values, profile.token as string);
      await uploadImages();
      showSuccessAlert('Success', response.message)

    } catch (error) {
      showErrorAlert('Failed', 'The product could not be updated')
    }
  }

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await createProduct(values, profile.token as string);
      await uploadImages();
      showSuccessAlert('Success', response.message)
      router.push('/admin/products/' + response.createdProduct.id)
    } catch (error: any) {
      showErrorAlert('Failed', error.response.data.message)
    }
  }

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    if (files.filter(f => f).length < 4 && files.filter(f => f).length !== 0) {
      // Mostrar el toast si no hay 4 archivos o ninguno
      showErrorAlert('Error', 'You must upload exactly 4 files or none.');
      return; // Evitar el envío del formulario si no se cumple la validación
    }

    if (!product) {
      await create(values)
      window.location.reload();
    } else {
      await update(values)
      window.location.reload();
    }

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
            <H3 mb={4}>Product Detail</H3>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Name"
                  color="primary"
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
                  fullWidth
                  name="slug"
                  label="Slug"
                  color="primary"
                  size="medium"
                  placeholder="Name"
                  value={values.slug}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.slug && errors.slug as string}
                  error={Boolean(touched.slug && errors.slug)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="primary"
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
                  color="primary"
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
                  color="primary"
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
                  color="primary"
                  size="medium"
                  name="tags"
                  onBlur={handleBlur}
                  placeholder="Tags"
                  onChange={handleChange}
                  value={values.tags}
                  label="Select Tags"
                  SelectProps={{
                    multiple: true,  // Permite la selección múltiple
                    renderValue: (selected) => {
                      return (selected as string[]).join(', '); // Muestra las opciones seleccionadas
                    }
                  }}
                  helperText={touched.tags && errors.tags as string}
                  error={Boolean(touched.tags && errors.tags)}
                >
                  {tagList.map((tag) => (
                    <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="primary"
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
                  name="score"
                  color="primary"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.score}
                  label="Score"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 || e.target.value === "") {
                      handleChange(e);
                    }
                  }}
                  placeholder="Score"
                  helperText={touched.score && errors.score as string}
                  error={Boolean(touched.score && errors.score)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="regular_price"
                  color="primary"
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
                  color="primary"
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
                  color="primary"
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
                      color="primary"
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
                      color="primary"
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
                      color="primary"
                    />
                  }
                  label="Publish"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <H3 sx={{ marginBottom: 0 }}>Product Images</H3>
                  <Tooltip
                    title="The image file only supports 'png' format for better resolution."
                    arrow
                    enterTouchDelay={0} // Permite que se pueda ver en mobile con toque
                    leaveTouchDelay={3000} // Mantiene el tooltip visible un poco más en mobile
                  >
                    <IconButton size="small" sx={{ padding: "4px" }}>
                      <Info fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ImageUploader defaultImages={images} onChange={(newImages: any) => setFiles(newImages)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="primary" type="submit">
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
