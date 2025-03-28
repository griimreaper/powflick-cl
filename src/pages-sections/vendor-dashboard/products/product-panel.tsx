import React, { useEffect, useState } from "react";
import { ExpandLess as ChevronUpIcon, CheckCircle as CheckCircleIcon, ErrorOutline as ExclamationCircleIcon, HelpOutline as QuestionMarkCircleIcon, Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Input, TextField, Tooltip, Typography } from "@mui/material";
import {
  showErrorAlert,
  showLoader,
  showSuccessAlert,
  ToastWithProgress,
} from "utils/alerts";
import * as xlsx from "xlsx";
import { useDashboardStore } from "store/dashboard";
import {
  getExcelProducts,
  getProductTitles,
  loadExcelProducts,
  uploadFolder,
} from "services/dashboardAdmin/products";
import LoadingComponent from "components/Loaders/LoadingComponent";
import useLoading from "hooks/useLoading";
import { serverCacheReset } from "services/cache";

const ExcelColumns = [
  "ID: unique identifier of the product.",
  "Title: product title.",
  "Content: detailed description of the product.",
  "Short Description: short description of the product.",
  "Date: product date.",
  "Price: current price of the product.",
  "Regular Price: regular price of the product.",
  "Stock Status: product stock status.",
  "Stock: quantity of available stock of the product.",
  "Product categories: categories to which the product belongs.",
  '(multiple categories can be sent in this format "New Arrival | Gamer Shirt")',
  "Genders: product gender.",
  "Sports: sport to which the product belongs.",
  "Colors: available colors for the product.",
  '(multiple colors can be sent in this format "Red | Blue")',
  "Slug: alternative name to differentiate orders.",
  "Status: product status (publish/draft).",
  "URL: URL of the product image.",
  "Featured: indicator of whether the product is featured, set 'yes' to featured.",
  "Font: font default to customizations.",
  'Font Color: set color default to customizations font, in hex "#FFFFFF" or text "white".',
];

type PanelProps = {
  openPanel: boolean;
  setOpenPanel: Function;
};

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

export default function ProductPanel({ openPanel, setOpenPanel }: PanelProps) {
  const [folderPath, setFolderPath] = useState<File[]>([]);
  const [excelError, setExcelError] = useState<string>();
  const [fixFolders, setFixFolders] = useState<string[]>([]);
  const [goodFolders, setGoodFolders] = useState<string[]>([]);
  const [loadButton, startLoadButton, stopLoadButton] = useLoading();
  const [loadExport, startLoadExport, stopLoadExport] = useLoading();
  const [loadUpload, startLoadUpload, stopLoadUpload] = useLoading();
  const [inputExcel, setInputExcel] = useState<string>("");
  const { profile } = useDashboardStore();
  const { token } = profile;

  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  let existingFolders: string[] = [];
  let nonExistingFolders: string[] = [];

  const handleImageFolderSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      console.log("Archivos seleccionados:", filesArray);
      setFolderPath(filesArray);
    }
  };

  const uploadImages = async () => {
    setShowModal(true);
    const filesByFolder: { [key: string]: File[] } = {};

    // Organizar archivos por carpeta
    folderPath.forEach((file) => {
      if (file.webkitRelativePath) {
        const folderPathSegments = file.webkitRelativePath.split("/");
        if (folderPathSegments.length > 1) {
          const folderName = folderPathSegments.slice(1, -1).join("/");
          if (!filesByFolder[folderName]) {
            filesByFolder[folderName] = [];
          }
          filesByFolder[folderName].push(file);
        }
      }
    });

    console.log("Archivos organizados por carpeta:", filesByFolder);

    try {
      startLoadUpload();
      const response = await getProductTitles();

      const productNames: string[] = response;

      // Filtrar carpetas existentes y no existentes
      existingFolders = [];
      nonExistingFolders = [];

      Object.keys(filesByFolder).forEach((folderName) => {
        if (
          productNames.some((productName) =>
            folderName.split("/")[0].includes(productName)
          )
        ) {
          existingFolders.push(folderName);
        } else {
          nonExistingFolders.push(folderName);
        }
      });

      console.log("Carpetas existentes:", existingFolders);
      console.log(
        "Carpetas no existentes:",
        nonExistingFolders.filter((t) => !t.includes("/"))
      );
      setGoodFolders(existingFolders.filter((t) => !t.includes("/")));
      setFixFolders(nonExistingFolders.filter((t) => !t.includes("/")));

      // Contar total de archivos a subir
      const totalImages =
        folderPath.length -
        nonExistingFolders.reduce(
          (count, folder) => count + (filesByFolder[folder]?.length || 0),
          0
        );
      console.log("Total de imágenes a subir:", totalImages);

      let uploadedImagesCount = 0;

      for (const folderName of existingFolders) {
        const formData = new FormData();
        filesByFolder[folderName].forEach((file) => {
          formData.append("files", file, file.webkitRelativePath);
        });

        console.log("Subiendo archivos de la carpeta:", folderName);
        const uploadResponse = await uploadFolder(
          filesByFolder[folderName],
          folderName
        );
        uploadedImagesCount += filesByFolder[folderName].length;

        // Calcular y establecer el progreso
        const progressPercentage = (uploadedImagesCount / totalImages) * 100;
        setProgress(Number(progressPercentage.toFixed(2)));
        console.log(`Carga exitosa para carpeta ${folderName}`, uploadResponse);
      }

      // Asegurar que el progreso sea 100% si se ha subido todo correctamente
      if (uploadedImagesCount === totalImages) {
        setProgress(100);
      }

      await serverCacheReset();
      stopLoadUpload();
    } catch (error) {
      console.error("Error al cargar la carpeta", error);
    }
  };

  const handleLoad = async (excel: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (token && excel) {
      if (!urlRegex.test(excel)) {
        showErrorAlert("Error!", "Enter a valid URL for the Excel file");
        return;
      }
      showLoader("This may take a few seconds");
      startLoadButton();
      try {
        await loadExcelProducts(excel, token);
        showSuccessAlert("Success!", "Excel load successfully");
        setExcelError("");
      } catch (error: any) {
        console.log(error);
        setExcelError(error.message);
      }
      stopLoadButton();
    }
  };

  const handleExport = async () => {
    if (token) {
      try {
        startLoadExport();
        const response = await getExcelProducts(token);

        const arrayBufferView = new Uint8Array(response.data);
        const workbook = xlsx.read(arrayBufferView, { type: "array" });
        xlsx.writeFile(workbook, "archivo_excel.xlsx");

        stopLoadExport();
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
      }
    }
  };

  useEffect(() => {
    showModal && ToastWithProgress(progress);
  }, [progress, showModal]);

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "auto",
        maxWidth: 350,
        position: "absolute",
        right: { lg: 64, sm: 48 },
        zIndex: 30,
        transition: "all 0.5s ease-in-out",
        opacity: openPanel ? 1 : 0,
        p: openPanel ? 2 : 0,
        boxShadow: openPanel ? 3 : 0,
        border: openPanel ? "2px solid #bdbdbd" : "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          transition: "all 0.3s ease-in-out",
          height: openPanel ? 32 : 0,
          opacity: openPanel ? 1 : 0,
        }}
      >
        <Tooltip title={ExcelColumns.join("\n")} placement="bottom">
          <IconButton>
            <ExclamationCircleIcon sx={{ fontSize: 32, opacity: 0.5, '&:hover': { opacity: 1 } }} />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => setOpenPanel(false)}>
          <Close sx={{ fontSize: 32, cursor: "pointer", borderRadius: "50%", bgcolor: "#e0e0e0", '&:hover': { opacity: 1 } }} />
        </IconButton>
      </Box>
      <Typography variant="h6" align="center" sx={{ mt: 2, fontWeight: 500 }}>
        Export or insert products excel to reload the database
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {excelError && (
          <Tooltip title={excelError} placement="bottom">
            <ExclamationCircleIcon sx={{ fontSize: 32, color: "#e57373" }} />
          </Tooltip>
        )}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Insert excel url..."
          onChange={(e) => setInputExcel(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLoad(inputExcel)}
        >
          {loadButton ? <CircularProgress size={24} /> : "Load"}
        </Button>
        <input type="file" webkitdirectory="true" directory="true" onChange={handleImageFolderSelection} />
        <Button variant="contained" color="primary" onClick={uploadImages} disabled={loadUpload}>
          {loadUpload ? 'loading...' : 'Upload Images'}
        </Button>
        {progress === 100 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {goodFolders.length > 0 && (
              <Tooltip title={["Successfully saved: ", ...goodFolders.join("\n")]} placement="bottom">
                <CheckCircleIcon sx={{ fontSize: 32, color: "#81c784" }} />
              </Tooltip>
            )}
            {fixFolders.length > 0 && (
              <Tooltip title={["Title error: ", ...fixFolders.join(", ")]} placement="bottom">
                <ExclamationCircleIcon sx={{ fontSize: 32, color: "#e57373" }} />
              </Tooltip>
            )}
            <Tooltip title="This is the right way to folder files for uploading images" placement="bottom">
              <QuestionMarkCircleIcon sx={{ fontSize: 32, color: "#bdbdbd" }} />
            </Tooltip>
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleExport}>
          {loadExport ? <CircularProgress size={24} /> : "Export"}
        </Button>
      </Box>
    </Box>
  );
};