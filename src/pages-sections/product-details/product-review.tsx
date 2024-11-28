"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
// Local CUSTOM COMPONENT
import ProductComment from "./product-comment";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H2, H5 } from "components/Typography";
import { Review } from "models/types";
import { title } from "process";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { postReview } from "services/Reviews";

export default function ProductReview({ reviews, typeId }: {typeId: string ,reviews: Review[] }) {
  const { profile } = useDashboardStore();
  const token = profile.token;

  const initialValues = {
    rating: 0,
    title: "",
    review: "",
    date: new Date().toISOString()
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    review: yup.string().required("required"),
    title: yup.string().required("required"),
  });

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!token || token === 'undefined') {
          showErrorAlert("Denied", "The user must be logged in to send a review.");
          return;
      }

      try {
          await postReview({...values, rating: String(values.rating), typeId, type: "PRODUCT"}, token);
          showSuccessAlert("Success", "Review successfully sent.");
          resetForm(); // Limpia el formulario después de enviar la reseña
      } catch (error) {
          console.log(error)
          showErrorAlert("Error", "There has been an error sending the review.");
      }
    }
  });

  return (
    <div>
      {reviews.map((item, ind) => (
        <ProductComment name={item.author} comment={item.review} date={item.createdAt} rating={Number(item.rating)} imgUrl={item.user.image} key={ind} />
      ))}

      <H2 fontWeight="600" mt={7} mb={2.5}>
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Rating</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value: any) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Your Review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField 
            name="title"
            variant="outlined"
            size="small" // Tamaño pequeño
            onBlur={handleBlur}
            value={values.title}
            onChange={handleChange}
            placeholder="Title"
            fullWidth={false} // No ocupar todo el ancho
            sx={{ width: '50%', mb: 1 }} // Ancho personalizado
            error={!!touched.title && !!errors.title}
            helperText={(touched.title && errors.title) as string}
          />

          <TextField
            rows={8}
            multiline
            fullWidth
            name="review"
            variant="outlined"
            onBlur={handleBlur}
            value={values.review}
            onChange={handleChange}
            placeholder="Write a review here..."
            error={!!touched.review && !!errors.review}
            helperText={(touched.review && errors.review) as string}
          />
        </Box>

        <Button variant="contained" color="primary" type="submit" disabled={!(dirty && isValid)}>
          Submit
        </Button>
      </form>
    </div>
  );
}

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  },
  {
    name: "Joe Kenan",
    imgUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "/assets/images/faces/8.png",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
  }
];
