import React, { useEffect, useState } from "react";
import { ExpandLess as ChevronUpIcon, CheckCircle as CheckCircleIcon, ErrorOutline as ExclamationCircleIcon, HelpOutline as QuestionMarkCircleIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Input, TextField, Tooltip, Typography } from "@mui/material";
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
      className={`bg-white rounded-lg flex flex-col justify-between w-auto max-w-[350px] absolute lg:end-16 sm:end-12 z-30 transform transition-all duration-500 ease-in-out ${
        openPanel
          ? "h-auto p-4 gap-4 border-gray-400 border-2 shadow-lg"
          : "max-h-0 hidden"
      }`}
      style={{
        opacity: openPanel ? 1 : 0,
      }}
    >
      <Box
        className={`col-span-2 py-2 w-full flex sm:justify-between px-2 mb-1 transition-all duration-300 ease-in-out ${
          openPanel ? "h-8 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <Tooltip title={ExcelColumns.join("\n")} placement="bottom">
          <IconButton>
            <ExclamationCircleIcon className="w-8 h-8 opacity-50 hover:opacity-100 transition duration-300" />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => setOpenPanel(false)}>
          <ChevronUpIcon className="w-8 h-8 opacity-50 cursor-pointer rounded-3xl bg-gray-200 hover:opacity-100 transition duration-300" />
        </IconButton>
      </Box>
      <Box className="flex flex-col gap-2 col-span-2 w-full items-center justify-between">
        <Typography
          variant="h6"
          className="m-2 font-medium text-base text-center w-full"
        >
          Export or insert products excel to reload the database
        </Typography>
      </Box>
      <Box className="flex flex-col">
        <Box className="flex flex-row gap-2 col-span-2 w-full items-center justify-between">
          {excelError && (
            <Box className="flex w-1/4 justify-center">
              <Tooltip
                title={excelError.split("\n").join("\n")}
                placement="bottom"
              >
                <ExclamationCircleIcon className="w-8 h-8 text-red-300" />
              </Tooltip>
            </Box>
          )}
          <TextField
            type="text"
            placeholder="Insert excel url..."
            className="flex py-2 m-2 w-full text-sm border-gray-300 focus:outline-none focus:ring-neutral focus:border-neutral sm:text-sm rounded-md"
            onChange={(e) => setInputExcel(e.target.value)}
            aria-label="Excel URL"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLoad(inputExcel)}
            className="rounded-md bg-neutral py-2 px-4 text-center whitespace-nowrap text-sm font-semibold text-white shadow-sm hover:bg-neutral/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral/80"
          >
            {loadButton ? <LoadingComponent /> : "Load"}
          </Button>
        </Box>
        <Box className="flex flex-row gap-2 col-span-2 w-full items-center justify-between">
          <Input
            type="file"
            inputProps={{ webkitdirectory: "true", directory: "true" }}
            onChange={handleImageFolderSelection}
            className="flex py-2 m-2 w-3/4"
            aria-label="Select Image Folder"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              uploadImages();
            }}
            className="rounded-md bg-neutral px-3 py-2 text-center whitespace-nowrap text-sm font-semibold text-white shadow-sm hover:bg-neutral/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral/80"
          >
            Upload Images
          </Button>
        </Box>
        <Box className="w-full flex justify-center">
          {progress === 100 && (
            <>
              {goodFolders.length !== 0 && (
                <Box className="flex w-1/2 justify-center">
                  <Tooltip
                    title={["Succesfully saved:", ...goodFolders].join("\n")}
                    placement="bottom"
                  >
                    <CheckCircleIcon className="w-8 h-8 text-green-300" />
                  </Tooltip>
                </Box>
              )}
              {fixFolders.length !== 0 && (
                <Box className="flex w-1/2 justify-center">
                  <Tooltip
                    title={["Title error:", ...fixFolders].join("\n")}
                    placement="bottom"
                  >
                    <ExclamationCircleIcon className="w-8 h-8 text-red-300" />
                  </Tooltip>
                </Box>
              )}
            </>
          )}
          <Box className="flex w-1/2 justify-center">
            <Tooltip
              title={[
                "this is the right way to foldering files to upload images,",
              ]}
              placement="bottom"
            >
              <QuestionMarkCircleIcon className="w-8 h-8 text-gray-300" />
            </Tooltip>
          </Box>
        </Box>
        <Box className="flex justify-center items-center mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleExport()}
            className="rounded-md bg-neutral px-3 py-2 text-center whitespace-nowrap text-sm font-semibold text-white shadow-sm hover:bg-neutral/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral/80"
          >
            {loadExport ? <LoadingComponent /> : "Export"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
