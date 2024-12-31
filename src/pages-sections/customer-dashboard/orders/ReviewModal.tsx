import { Box, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, Rating } from "@mui/material";
import { Paragraph } from "components/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteImage, setImageBlob } from "services/imageStorage";
import { postReview } from "services/Reviews";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";

export const ReviewModal = ({ open, onClose, productId }: { open: boolean; onClose: () => void; productId: string | null }) => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // URL de la imagen subida
    const { profile } = useDashboardStore();
    const { token } = profile;

    const onSubmit = async (data: { title: string, reviewText: string, rating: string }) => {
        if (productId) {
            // Subir la imagen si se proporciona
            if (image) {
                const uploadedImage = await setImageBlob(image, "product-reviews");
                setImageUrl(uploadedImage.url); // Asumiendo que el API devuelve la URL de la imagen
            }

            // Aquí puedes manejar la lógica de la reseña (enviar la reseña y la imagen al backend)
            const reviewData = {
              title: data?.title,
              review: data?.reviewText,
              rating: data?.rating?.toString(),
              image: imageUrl, // Incluimos la URL de la imagen si está presente
              typeId: productId,
              type: "PRODUCT",
            };

            // Enviar la reseña al servidor
            try {
                await postReview(reviewData, token as string);
                showSuccessAlert("Review submitted successfully", "Thank you for your review!");
                reset(); // Resetear el formulario
                setImage(null); // Limpiar la imagen
                setImageUrl(null); // Limpiar la URL de la imagen
                onClose(); // Cerrar el modal después de enviar la reseña
            } catch (error) {
                console.log(error)
                showErrorAlert("Error submitting review", "An error occurred while submitting your review. Please try again later.");
            }
        }

    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleDeleteImage = async () => {
        if (imageUrl) {
            await deleteImage(imageUrl); // Eliminar la imagen del servidor
            setImage(null);
            setImageUrl(null); // Limpiar la imagen
        }
    };

    return (
        <Modal open={open} onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000, // Asegura que el modal tenga un z-index alto
            }}>
            <Box sx={{ width: 400, p: 3, backgroundColor: "white", margin: "auto", mt: "10%", borderRadius: 4 }}>
                <form onSubmit={handleSubmit(onSubmit as any)}>
                    <Paragraph sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}>
                        Write a Review
                    </Paragraph>

                    <TextField
                        fullWidth
                        label="Review Title"
                        {...register("title", { required: true })}
                        sx={{ mb: 2 }}
                        error={!!errors.title}
                        helperText={errors.title ? "Title is required" : ""}
                    />

                    <TextField
                        fullWidth
                        label="Review"
                        multiline
                        rows={4}
                        {...register("reviewText", { required: true })}
                        sx={{ mb: 2 }}
                        error={!!errors.reviewText}
                        helperText={errors.reviewText ? "Review text is required" : ""}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                                name="rating"
                                defaultValue={0}
                                precision={1} // Permite seleccionar valores enteros
                                onChange={(_, value) => setValue("rating", value || 0)}
                            />
                        </Box>
                        {errors.rating && (
                            <Paragraph color="error" sx={{ mt: 1 }}>
                                Rating is required
                            </Paragraph>
                        )}
                    </FormControl>

                    {/* Campo de imagen */}
                    <input type="file" onChange={handleImageChange} />
                    {image && <img src={URL.createObjectURL(image)} alt="Preview" width="100" style={{ margin: 2, borderRadius: 20, border: '2px solid black' }} />}

                    {imageUrl && (
                        <Box sx={{ mt: 2 }}>
                            <img src={imageUrl} alt="Uploaded" width="100" />
                            <Button onClick={handleDeleteImage} variant="outlined" color="error">
                                Delete Image
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
