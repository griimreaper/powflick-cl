"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Autocomplete, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { postMockReview } from "services/Reviews";
import { useState } from "react";
import { H2 } from "components/Typography";
import { ReviewCard } from "components/Reviews/Reviews";

// FORM VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  title: yup.string().required("Review title is required!"),
  review: yup.string().required("Review content is required!"),
  rating: yup.number().min(1).max(5).required("Rating is required!"),
  image: yup.string().url("Invalid URL").required("Image URL is required!"),
  userImage: yup.string().url("Invalid URL").notRequired(),
});

export default function ReviewForm() {
  const { profile } = useDashboardStore();
  const router = useRouter();

  const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    title: "",
    review: "",
    rating: 1,
    image: "",
    userImage: "",
  };

  const create = async (values: typeof INITIAL_VALUES) => {
    try {
      const response = await postMockReview({ ...values, rating: String(values.rating), type: 'ORDER', typeId: '1' }, profile.token as string);
      showSuccessAlert("Success", "Review created succesfully");
      router.push("/admin/reviews/order");
    } catch (error: any) {
      console.log(error);
      showErrorAlert("Failed", error.response?.data?.message);
    }
  };

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    create(values);
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
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  color="primary"
                  size="medium"
                  placeholder="First Name"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.firstName && errors.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  color="primary"
                  size="medium"
                  placeholder="Last Name"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.lastName && errors.lastName}
                  error={Boolean(touched.lastName && errors.lastName)}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="userImage"
                  label="User Image URL"
                  color="primary"
                  size="medium"
                  placeholder="Enter user image URL"
                  value={values.userImage}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  helperText={touched.userImage && errors.userImage}
                  error={Boolean(touched.userImage && errors.userImage)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Review Title"
                  color="primary"
                  size="medium"
                  placeholder="Enter review title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.title && errors.title}
                  error={Boolean(touched.title && errors.title)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Rating</InputLabel>
                  <Select
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.rating && errors.rating)}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="image"
                  label="Review Image URL"
                  color="primary"
                  size="medium"
                  placeholder="Enter review image URL"
                  value={values.image}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  helperText={touched.image && errors.image}
                  error={Boolean(touched.image && errors.image)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="review"
                  label="Review Content"
                  color="primary"
                  size="medium"
                  multiline
                  rows={4}
                  placeholder="Write your review here"
                  value={values.review}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.review && errors.review}
                  error={Boolean(touched.review && errors.review)}
                />
              </Grid>

              <Grid item xs={12}>
                <H2>Preview</H2>
                <Grid item xs={12} marginTop={5} display={'flex'} justifyContent={'center'} >
                  <ReviewCard review={{
                    title: values.title,
                    review: values.review,
                    image: values.image,
                    rating: values.rating,
                    createdAt: new Date(),
                    user: {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      image: values.userImage,
                    }
                  }}>
                  </ReviewCard>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Create Review
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
