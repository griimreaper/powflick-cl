import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { addConversation } from "services/messages/index";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import * as yup from "yup";

export default function MessageForm({ token, messageId }: { token: string, messageId: string }) {
  const { setMessages } = useDashboardStore();
  const initialValues = { message: "" };

  const validationSchema = yup.object().shape({
    message: yup.string().required("Message is required")
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await addConversation(values.message, messageId, token);
        setMessages(data.messages)
        resetForm();
        showSuccessAlert('Success', 'Your message has been sended succesfully');
      } catch (error) {
        showErrorAlert('Error', 'An error ocurred')
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        rows={8}
        fullWidth
        multiline
        name='message'
        value={values.message}
        onBlur={handleChange}
        onChange={handleChange}
        placeholder="Write your message here..."
        helperText={touched.message && errors.message}
        error={Boolean(touched.message && errors.message)}
        sx={{ mb: 2 }}
      />

      <Button type="submit" color="primary" variant="contained">
        Post message
      </Button>
    </form>
  );
}
