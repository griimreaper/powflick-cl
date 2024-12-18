import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CameraEnhance from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { deleteImage, setImageBlob } from "services/imageStorage";

export default function ProfilePicUpload({ image, setImage, user }: { image: string, setImage: Function, user: { email: string } }) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtén el archivo seleccionado por el usuario
    if (file) {
      if (image) {
        try {
          await deleteImage(image); // Borra la imagen previa si existe
          setImage(null);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
      try {
        const { secure_url } = await setImageBlob(file, `Users/${user.email}`); // Sube la nueva imagen

        setImage(secure_url); // Actualiza el estado con la nueva URL
        event.target.value = ""; // Limpia el input
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSuprFile = async () => {
    if (image) {
      try {
        await deleteImage(image); // Borra la imagen actual
        setImage(null); // Limpia el estado
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  return (
    <FlexBox alignItems="center" mb={3}>
      <Avatar alt="user" src={image} sx={{ height: 64, width: 64 }} />

      {/* Botón para subir imagen */}
      <IconButton
        size="small"
        component="label"
        color="secondary"
        sx={{ bgcolor: "grey.300", ml: 2 }}>
        <CameraEnhance fontSize="small" />
        <input
          type="file"
          accept="image/*"
          id="profile-image"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </IconButton>

      {/* Botón para eliminar imagen */}
      {image && (
        <IconButton
          size="small"
          color="error"
          sx={{ ml: 1 }}
          onClick={handleSuprFile}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </FlexBox>
  );
}
