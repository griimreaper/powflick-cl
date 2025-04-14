import { useState, useCallback, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Close, Add, AddPhotoAlternate } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const dropZoneTitles: { [key: number]: string } = {
  0: "Front",
  1: "Back",
  2: "Front (custom)",
  3: "Back (custom)",
};

export default function ImageUploader({
  defaultImages,
  defaultFiles,
  onChange, // Prop `onChange` para manejar el cambio de imágenes en el componente principal
  updating,
}: {
  defaultImages: string[];
  defaultFiles: File[] | null;
  onChange: (updatedImages: (File | string | null)[]) => void; // Espera una función para manejar el cambio
  updating: boolean,
}) {
  // Estado para manejar las imágenes y archivos
  // Se inicializa con las imágenes por defecto y se asegura de que haya 4 elementos
  const [images, setImages] = useState<(string | null)[]>([
    ...(defaultImages || []), // Utiliza defaultImages si existe
    ...new Array(Math.max(0, 4 - (defaultImages?.length || 0))).fill(null),  // Rellena con null hasta tener 4 elementos
  ]);
  const [files, setFiles] = useState<(File | null)[]>(defaultFiles || []);

  // Se asegura de que el estado de files tenga al menos 4 elementos
  useEffect(() => { setFiles(defaultFiles || []) }, [defaultFiles])

  // Se posicionan las imagenes en la casilla q corresponde
  useEffect(() => { if (updating) setImages(defaultImages) }, [defaultImages])

  // Manejador para agregar la imagen cargada
  const handleDropZone = (index: number, file: File | null) => {
    const nameFile: { [key: number]: string } = {
      0: "Front_1",
      1: "Back_2",
      2: "Front-customization_1",
      3: "Back-customization_2",
    }

    if (file) {
      const renamedFile = new File([file], `${index > 3 ? 'G-ADDITIONAL_' + (index + 1) : nameFile[index]}${file.name.slice(file.name.lastIndexOf("."))}`, {
        type: file.type,
      });

      const newFiles = [...files];
      newFiles[index] = renamedFile; // Guardamos el archivo en el array de archivos
      setFiles(newFiles);

      const newImages = [...images];
      newImages[index] = URL.createObjectURL(renamedFile); // Generamos la URL de vista previa
      setImages(newImages);

      onChange(newFiles); // Solo enviamos los archivos al componente padre
    } else {
      const newFiles = [...files];
      newFiles[index] = null;
      setFiles(newFiles);

      const newImages = [...images];
      newImages[index] = defaultImages[index]; // Restaurar la imagen por defecto
      setImages(newImages);

      onChange(newFiles);
    }
  };

  // Manejador para eliminar la imagen y restaurar la predeterminada
  const handleDeleteImage = (index: number) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);

    const newImages = [...images];
    newImages[index] = defaultImages[index]; // Restaurar la imagen por defecto
    setImages(newImages);

    onChange(newFiles);
  };

  // Manejador para eliminar un DropZone completo (incluyendo imagen)
  const handleDeleteDropZone = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    onChange(newFiles);
  };

  // Agregar un nuevo DropZone
  const handleAddDropZone = () => {
    const newFiles = [...files, null];
    setFiles(newFiles);

    const newImages = [...images, null];
    setImages(newImages);

    onChange(newFiles);
  };

  return (
    <Box display={'flex'} gap={2} flexDirection="column" mb={6}>
      {/* Contenedor con scroll horizontal */}
      <Box display={'flex'} gap={2} justifyContent={'flex-start'} sx={{ overflowX: 'auto', width: '100%', py: 2 }}>
        {images?.map((image, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 200, // Tamaño mínimo para cada imagen
              minHeight: 300,
              flexShrink: 0,
            }}
          >
            {/* Título para cada DropZone */}
            <Typography variant="h6" gutterBottom>
              {index < 4 ? dropZoneTitles[index] : `Image ${index + 1}`}
            </Typography>
            <DropZone
              defaultImage={image || ""}
              onChange={(file) => handleDropZone(index, file)} // Manejador de DropZone
              onDeleteImage={() => handleDeleteImage(index)} // Manejador de eliminar solo imagen
              onDeleteDropZone={() => handleDeleteDropZone(index)} // Manejador de eliminar DropZone completo
              isDeletable={index < 4 && defaultImages && image !== defaultImages[index]} // Permitir eliminar imagen solo si es modificada
              isDeletableDropZone={index > 3} // Permitir eliminar DropZone solo si su índice es menor que 4
            />
          </Box>
        ))}
      </Box>

      {/* Botón para agregar más DropZones */}
      <Box sx={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton
          sx={{
            position: "absolute",
            bottom: -30, // Mover el botón hacia abajo
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { background: "rgba(0,0,0,0.8)" },
          }}
          onClick={handleAddDropZone}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
}

function DropZone({
  defaultImage,
  onChange,
  onDeleteImage,
  onDeleteDropZone,
  isDeletable,
  isDeletableDropZone,
}: {
  defaultImage: string;
  onChange: (file: File | null) => void;
  onDeleteImage: () => void;
  onDeleteDropZone: () => void;
  isDeletable: boolean;
  isDeletableDropZone: boolean;
}) {
  const [image, setImage] = useState<string>(defaultImage);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange(file);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: { "image/*": [".png"] },
  });

  useEffect(() => {
    setImage(defaultImage); // Asegura que se actualice la imagen predeterminada cuando cambie el valor
  }, [defaultImage]);

  return (
    <Box
      {...getRootProps({
        onDragStart: (e) => e.preventDefault(), // Prevenir el arrastre de la imagen
      })}
      position="relative"
      width="100%"
      height="auto"
      minHeight={300}
      border="1.5px dashed grey"
      borderRadius="10px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      sx={{ transition: "all 250ms ease-in-out", outline: "none", cursor: 'pointer' }}
    >
      <input {...getInputProps()} style={{ display: "none" }} />

      {!image && (
        <AddPhotoAlternate sx={{ fontSize: 50, color: 'gray' }} />
      )}
      {image && (
        <Box
          width="100%"
          height="100%"
          onClick={() => document.getElementById(`file-input-${defaultImage}`)?.click()}
          sx={{ cursor: "pointer" }}
        >
          <img src={image} width="100%" height="100%" style={{ objectFit: "cover" }} />
        </Box>
      )}
      {/* Botón de eliminar la imagen solo si la imagen ha sido cambiada y su índice es menor que 4 */}
      {isDeletable && (
        <IconButton
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { background: "rgba(0,0,0,0.8)" },
          }}
          onClick={(e) => { e.stopPropagation(), onDeleteImage() }}
        >
          <Close />
        </IconButton>
      )}

      {/* Botón de eliminar el DropZone solo si su índice es menor que 4 */}
      {isDeletableDropZone && (
        <IconButton
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { background: "rgba(0,0,0,0.8)" },
          }}
          onClick={(e) => { e.stopPropagation(), onDeleteDropZone() }}
        >
          <Close />
        </IconButton>
      )}
    </Box>
  );
}
