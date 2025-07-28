type Gender = 'MEN' | 'WOMEN' | 'KIDS';
import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Button,
  Box,
  Dialog,
  Tabs,
  Tab,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Customization } from "models/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCustomizationsStore } from "store/customizationsStore";
import { Close } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';

interface detailProps {
  Neck: { name: string; image: string }[] | null;
  Socks: SocksItem[];
  Shorts: { name: string; image: string }[] | string[] | null;
  Pants: { name: string; image: string }[] | null;
  Size: string[];
  Materials: { name: string; image: string }[];
  Technique: { name: string; image: string }[];
  PaymentMethods: { text: string; image: string };
  ShippingTypes: string;
  SizeGuide: { image1: string; image2: string };
}

interface SocksItem {
  name: string;
  image?: string;
  hex?: number;
}

interface AditionalDetailsProps {
  detail: detailProps | any;
  handleItemChange: (name: keyof Customization, value: string) => void;
  customizationsBySize: {
    [size: string]: { id: string; number?: string; name?: string }[]
  };
  setCustomizationsBySize: React.Dispatch<React.SetStateAction<{
    [size: string]: { id: string; number?: string; name?: string }[]
  }>>;
  config: {
    font: string
    fontColor: string
    isTopSelected: boolean
  }
}

const sizeTabs = [
  { label: "Men", value: "MEN" },
  { label: "Women", value: "WOMEN" },
  { label: "Kids", value: "KIDS" }
];

// Define las tallas por género
const sizeOptions: Record<string, string[]> = {
  MEN: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
  WOMEN: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  KIDS: ["XSJ (5-6Y)", "SJ (7-8Y)", "MJ (9-10Y)", "LJ (11-12Y)", "XLJ (13-14Y)"]
};

const genderOrder = ["MEN", "WOMEN", "KIDS"];

const AditionalDetails: FC<AditionalDetailsProps> = ({
  detail,
  handleItemChange,
  customizationsBySize,
  setCustomizationsBySize,
  config,
}) => {

  // React Hook Form setup
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { generateCustomizationsFromSizeMap } = useCustomizationsStore();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  // Añade estado para idioma de la guía
  const [sizeGuideLang, setSizeGuideLang] = useState<'es' | 'en'>('en');
  // Estado de cantidades por género
  const [quantities, setQuantities] = useState<Record<Gender, Record<string, number>>>(
    {
      MEN: Object.fromEntries(sizeOptions.MEN.map(size => [size, 0])),
      WOMEN: Object.fromEntries(sizeOptions.WOMEN.map(size => [size, 0])),
      KIDS: Object.fromEntries(sizeOptions.KIDS.map(size => [size, 0]))
    }
  );
  const [tab, setTab] = useState(0);
  const [customizeExpanded, setCustomizeExpanded] = useState(true);
  // Determina las tallas actuales según el tab seleccionado
  const currentSizes = sizeOptions[sizeTabs[tab].value];

  const updateStoreFromCustomizationsBySize = (customizationsBySize: {
    [size: string]: { number?: string; name?: string }[];
  }) => {
    generateCustomizationsFromSizeMap(
      detail.product.id,
      customizationsBySize,
      config.font,
      config.fontColor,
      config.isTopSelected,
    );
  };

  const handleQuantity = (size: string, change: number) => {
    const gender = sizeTabs[tab].value as Gender;
    const sizeGenderKey = `${size}-${gender}`;

    setCustomizationsBySize(prevCustomizations => {
      const currentArr = prevCustomizations[sizeGenderKey] ? [...prevCustomizations[sizeGenderKey]] : [];
      const currentCount = currentArr.length;
      const newCount = Math.max(0, currentCount + change);

      if (newCount > currentCount) {
        for (let i = currentCount; i < newCount; i++) {
          currentArr.push({ id: uuidv4(), number: "", name: "" }); // No vacío para que se registre en la store
        }
      } else if (newCount < currentCount) {
        currentArr.splice(newCount);
      }

      const updatedCustomizationsBySize = { ...prevCustomizations, [sizeGenderKey]: currentArr };
      updateStoreFromCustomizationsBySize(updatedCustomizationsBySize);

      // También actualizamos quantities aquí o afuera, según cómo lo manejes
      setQuantities(prev => {
        const updatedGenderQuantities = { ...prev[gender], [size]: newCount };
        return { ...prev, [gender]: updatedGenderQuantities };
      });

      return updatedCustomizationsBySize;
    });
  };


  const handleCustomInput = (size: string, idx: number, field: "number" | "name", value: string) => {
    setCustomizationsBySize(prev => {
      const arr = prev[size] ? [...prev[size]] : [];
      if (!arr[idx]) arr[idx] = { id: `${size}-${idx}-${Date.now()}` };
      arr[idx][field] = value;
      updateStoreFromCustomizationsBySize({ ...prev, [size]: arr });
      return { ...prev, [size]: arr };
    });
    // Actualiza el valor en RHF
    setValue(`${size}-${idx}-${field}`, value, { shouldValidate: true });
  };

  const handleDelete = (sizeGenderKey: string, idx: number) => {
    setCustomizationsBySize(prev => {
      const arr = prev[sizeGenderKey] ? [...prev[sizeGenderKey]] : [];
      arr.splice(idx, 1);
      const updated = { ...prev, [sizeGenderKey]: arr };
      updateStoreFromCustomizationsBySize(updated);
      return updated;
    });

    const lastDashIndex = sizeGenderKey.lastIndexOf("-");
    const gender = sizeGenderKey.substring(lastDashIndex + 1) as Gender;
    const size = sizeGenderKey.substring(0, lastDashIndex);

    setQuantities(prev => {
      const updatedGender = { ...prev[gender] };
      if (updatedGender[size]) {
        updatedGender[size] = Math.max(0, updatedGender[size] - 1);
      }
      return { ...prev, [gender]: updatedGender };
    });
  };

  return (
    <Box
      mx="auto"
      bgcolor="#fff"
      borderRadius={2}
      boxShadow={0}
      p={{ xs: 2, md: 3 }}
      mt={2}
      sx={{ border: "1px solid #eee" }}
    >
      {/* Tabs Men/Women/Kids */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          borderBottom: "1px solid #eee",
          mb: 2,
          "& .MuiTab-root": { minWidth: 80, fontWeight: 700, color: "#222" },
          "& .Mui-selected": { color: "#d32f2f" }
        }}
      >
        {sizeTabs.map((t, i) => (
          <Tab key={t.value} label={t.label} />
        ))}
      </Tabs>

      {/* Tabla de tallas */}
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography fontWeight={600} fontSize={15}>Size</Typography>
          <Typography
            variant="body2"
            color="error"
            sx={{ textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}
            onClick={() => setShowSizeGuide(true)}
          >
            Size Guide
          </Typography>
        </Box>
        <Box>
          {currentSizes.map(size => (
            <Box
              key={size}
              display="flex"
              alignItems="center"
              borderBottom="1px solid #f0f0f0"
              py={0.5}
              px={0}
              sx={{ ":last-child": { borderBottom: "none" } }}
            >
              <Box flex={1}>
                <Typography fontSize={15}>{size}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 32, width: 32, height: 32, borderRadius: 1, borderColor: "#ccc", color: "#222", p: 0
                  }}
                  onClick={() => handleQuantity(size, -1)}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Typography minWidth={20} textAlign="center" fontWeight={500}>
                  {customizationsBySize[`${size}-${sizeTabs[tab].value}`]?.length || 0}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 32, width: 32, height: 32, borderRadius: 1, borderColor: "#ccc", color: "#222", p: 0
                  }}
                  onClick={() => handleQuantity(size, 1)}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Mostrar el total seleccionado */}
        {/* <Box mt={2} display="flex" justifyContent="flex-end">
          <Typography fontWeight={600} color="primary.main">
            Total: {totalSelected}
          </Typography>
        </Box> */}
      </Box>

      {/* Personalización */}


      {/* Personalización por unidad */}
      <Box mt={3}>
        <Accordion
          expanded={customizeExpanded}
          onChange={() => setCustomizeExpanded(prev => !prev)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="customize-content"
            id="customize-header"
          >
            <Typography fontWeight={600} fontSize={15}>
              Customize (Optional)
            </Typography>
          </AccordionSummary>
          <AccordionDetails id="influencer-details-form" sx={{
            maxHeight: 500, // o el valor que quieras
            overflowY: "auto",
          }}>
            {/* Encabezado de columnas */}
            <Box
              display="flex"
              alignItems="center"
              mb={1}
              px={1}
              sx={{
                borderRadius: 1,
                fontWeight: 600,
                fontSize: 15
              }}
            >
              <Box flex={2} />
              <Box flex={1} textAlign="center">
                Number
              </Box>
              <Box flex={1} textAlign="center">
                Name
              </Box>
              <Box flex={0.3} />
            </Box>
            {/* Filas de personalización */}
            {Object.entries(customizationsBySize)
              .sort(([aKey], [bKey]) => {
                const aGender = aKey.slice(aKey.lastIndexOf("-") + 1);
                const bGender = bKey.slice(bKey.lastIndexOf("-") + 1);
                return genderOrder.indexOf(aGender) - genderOrder.indexOf(bGender);
              })
              .map(([sizeGenderKey, items]) => {
                return items.map((item, idx) => {
                  const lastDashIndex = sizeGenderKey.lastIndexOf("-");
                  const size = sizeGenderKey.substring(0, lastDashIndex);
                  const gender = sizeGenderKey.substring(lastDashIndex + 1);
                  return (
                    <Box
                      key={`${sizeGenderKey}-${idx}`}
                      display="flex"
                      alignItems="center"
                      mb={1}
                      px={1}
                      sx={{
                        borderBottom: "1px solid #f0f0f0",
                        ":last-child": { borderBottom: "none" }
                      }}
                    >
                      <Box flex={2} >
                        <Typography
                          fontWeight={500}
                          fontSize={15}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {size} - {idx + 1} <span style={{ color: "#888", fontSize: 13, marginLeft: 6 }}>({gender})</span>
                        </Typography>
                      </Box>
                      <Box flex={1} px={0.5}>
                        <Controller
                          name={`${sizeGenderKey}-${idx}-number`}
                          control={control}
                          defaultValue={item.number || ""}
                          rules={{
                            pattern: {
                              value: /^[0-9]{1,3}$/,
                              message: "Numbers only (max 3 digits)"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              placeholder="US$3.99"
                              sx={{ width: '100%' }}
                              error={!!errors[`${sizeGenderKey}-${idx}-number`]}
                              onChange={e => {
                                field.onChange(e);
                                handleCustomInput(sizeGenderKey, idx, "number", e.target.value);
                              }}
                            />
                          )}
                        />
                        {errors[`${sizeGenderKey}-${idx}-number`] && (
                          <Typography color="error" fontSize={12} sx={{ mt: 0.5, whiteSpace: 'normal' }}>
                            {errors[`${sizeGenderKey}-${idx}-number`]?.message as string}
                          </Typography>
                        )}
                      </Box>
                      <Box flex={1} px={0.5}>
                        <Controller
                          name={`${sizeGenderKey}-${idx}-name`}
                          control={control}
                          defaultValue={item.name || ""}
                          rules={{
                            minLength: {
                              value: 2,
                              message: "Minimum 2 characters"
                            },
                            maxLength: {
                              value: 14,
                              message: "Max 14 characters"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              size="small"
                              placeholder="US$3.99"
                              sx={{ width: '100%' }}
                              error={!!errors[`${sizeGenderKey}-${idx}-name`]}
                              onChange={e => {
                                field.onChange(e);
                                handleCustomInput(sizeGenderKey, idx, "name", e.target.value);
                              }}
                            />
                          )}
                        />
                        {errors[`${sizeGenderKey}-${idx}-name`] && (
                          <Typography color="error" fontSize={12} sx={{ mt: 0.5, whiteSpace: 'normal' }}>
                            {errors[`${sizeGenderKey}-${idx}-name`]?.message as string}
                          </Typography>
                        )}
                      </Box>
                      <Box flex="none" pl={1}>
                        <Button
                          variant="text"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(sizeGenderKey, idx)}
                          sx={{ minWidth: 32, p: 0 }}
                          aria-label="Delete customization"
                        >
                          <Close fontSize="small" />
                        </Button>
                      </Box>
                    </Box>
                  );
                });
              })}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Diálogo de guía de tallas */}
      <Dialog open={showSizeGuide} onClose={() => setShowSizeGuide(false)} maxWidth="md">
        <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={2}>
          {/* Botones para idioma */}
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant={sizeGuideLang === 'es' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSizeGuideLang('es')}
              sx={{ minWidth: 100 }}
            >
              Español
            </Button>
            <Button
              variant={sizeGuideLang === 'en' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSizeGuideLang('en')}
              sx={{ minWidth: 100 }}
            >
              English
            </Button>
          </Box>
          {/* Imagen según idioma */}
          {sizeGuideLang === 'en' ? (
            <Zoom>
              <img
                src="/assets/images/detail/size-table-english.png"
                alt="Size Guide English"
                width={500}
                height={500}
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
              />
            </Zoom>
          ) : (
            <Zoom>
              <img
                src="/assets/images/detail/size-table-spanish.png"
                alt="Size Guide Español"
                width={500}
                height={500}
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
              />
            </Zoom>
          )}
        </Box>
      </Dialog>


    </Box>
  );
}



export default AditionalDetails;
