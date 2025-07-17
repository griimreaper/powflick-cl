type Gender = 'MEN' | 'WOMEN' | 'KIDS';
import React, { FC, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import { Customization } from "models/types";
import {
  initialCustomization,
  useCustomizationStore,
} from "store/customizationStore";
import { ZoomInOutlined } from "@mui/icons-material";
import { killParenthesisIn } from "utils/tools";
import { useCustomizationsStore } from "store/customizationsStore";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useShoppingCartStore } from "store/shoppingCart"; // <-- Asegúrate de importar correctamente
import { useCounter } from "hooks/useCounter";

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
  sport: string;
  selected?: "top" | "uniform"; // <-- Añadido

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
  KIDS: ["XSj (5-6Y)", "Sj (7-8Y)", "Mj (9-10Y)", "Lj (11-12Y)", "XLj (13-14Y)"]
};

const AditionalDetails: FC<AditionalDetailsProps> = ({

  detail,
  handleItemChange,
  sport,

  selected = "uniform",

}) => {

  const { counter, decrement, increment, setCounter, handleInputChange } =
    useCounter(detail.product.id);
  const customization = useCustomizationStore(state => state.customization);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  // Estado de cantidades por género
  const [quantities, setQuantities] = useState<Record<Gender, Record<string, number>>>(
    {
      MEN: Object.fromEntries(sizeOptions.MEN.map(size => [size, 0])),
      WOMEN: Object.fromEntries(sizeOptions.WOMEN.map(size => [size, 0])),
      KIDS: Object.fromEntries(sizeOptions.KIDS.map(size => [size, 0]))
    }
  );
  const [tab, setTab] = useState(0);
  // Estado: customizaciones por talla (size)
  const [customizationsBySize, setCustomizationsBySize] = useState<{
    [size: string]: { number?: string; name?: string }[]
  }>({});

  // Determina las tallas actuales según el tab seleccionado
  const currentSizes = sizeOptions[sizeTabs[tab].value];

  // Maneja la edición de los campos personalizados por talla
  const handleCustomInput = (size: string, idx: number, field: "number" | "name", value: string) => {
    setCustomizationsBySize(prev => {
      const arr = prev[size] ? [...prev[size]] : [];
      if (!arr[idx]) arr[idx] = {};
      arr[idx][field] = value;
      return { ...prev, [size]: arr };
    });
  };

  // Maneja el cambio de cantidad por talla y género
  const handleQuantity = (size: string, change: number) => {
    const gender = sizeTabs[tab].value as Gender;
    setQuantities(prev => {
      const prevGenderQuantities = prev[gender];
      const newValue = Math.max(0, (prevGenderQuantities[size] || 0) + change);
      const updatedGenderQuantities = { ...prevGenderQuantities, [size]: newValue };
      const updated = { ...prev, [gender]: updatedGenderQuantities };
      // Si se aumenta la cantidad
      if (change > 0 && newValue > (prevGenderQuantities[size] || 0)) {
        handleItemChange("size", `${size}|${gender}`);
        increment();
      }
      // Si se reduce la cantidad
      if (change < 0 && newValue < (prevGenderQuantities[size] || 0)) {
        handleItemChange("size", `${size}|${gender}`);
        decrement();
      }
      return updated;
    });
  };

  const renderItems = (
    items: any[],
    type: keyof Customization,
    useZoom: boolean = false,
    imageSize: number = 100,
    compact: boolean = false
  ) => {
    return (
      <>
        {type === 'technique' && (
          <Box display={'flex'} gap={1} flexDirection={'column'}>
            <Typography fontWeight={'bold'} color={'primary.main'}>
              Special Techniques require a minimum of 50 pieces per technique.
            </Typography>
            <Typography fontSize={'12px'}>
              Example: 25 with Embroidery on jersey + 25 with Embroidery on shorts = 50 pieces.
            </Typography>
          </Box>
        )}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            padding: "0.5rem",
            gap: "0.5rem",
            background: "#fff",
          }}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  flex: compact ? "1 0 15%" : "1 0 21%",
                  margin: compact ? "0.2rem" : "0.5rem",
                  opacity: 1,
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={() => {
                    handleItemChange(type, item.name);
                    increment();
                  }}
                  style={{
                    textTransform: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    width: "100%",
                    padding: compact ? "0.2rem" : "0.5rem",
                    background: customization[type] === item.name ? "grey" : "white",
                    color: customization[type] === item.name ? "white" : "black",
                  }}
                >
                  {useZoom ? (
                    <div style={{ cursor: "pointer", position: "relative" }}>
                      <ZoomInOutlined
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          color: "#000",
                          zIndex: 1,
                        }}
                      />
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={imageSize}
                        height={imageSize}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  ) : (
                    item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={imageSize}
                        height={imageSize}
                        style={{ borderRadius: "10px" }}
                      />
                    ) : (
                      <Box bgcolor={item.hex} width={25} height={25} borderRadius={'100%'}></Box>
                    )
                  )}
                  <Typography fontWeight={'600'} align="center" whiteSpace={'nowrap'}>
                    {type === "socks" ? killParenthesisIn(item.name) : item.name}
                  </Typography>
                  {item.description && (
                    <Typography fontSize={'11px'} align="center">
                      {item.description}
                    </Typography>
                  )}
                  {item.link && (
                    <Link href={item.link} passHref legacyBehavior>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography fontSize={'11px'} color={'blue'} align="center">
                          Contact Us
                        </Typography>
                      </a>
                    </Link>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </>
    );
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
                <Typography minWidth={20} textAlign="center" fontWeight={500}>{quantities[sizeTabs[tab].value as Gender][size] || 0}</Typography>
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="customize-content"
            id="customize-header"
          >
            <Typography fontWeight={600} fontSize={15}>
              Customize (Optional)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(sizeOptions).map(([gender, sizes]) =>
              sizes.map(size => {
                const count = quantities[gender as Gender][size] || 0;
                if (!count) return null;
                return Array.from({ length: count }).map((_, idx) => (
                  <div key={`${size}-${gender}-${idx}`}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      {/* Muestra el tipo de tab junto a la talla */}
                      <Typography fontWeight={500} minWidth={40}>
                        {size} #{idx + 1} <span style={{ color: "#888", fontSize: 13, marginLeft: 6 }}>({gender})</span>
                      </Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="# 25"
                        value={customizationsBySize[size]?.[idx]?.number || ""}
                        onChange={e => handleCustomInput(size, idx, "number", e.target.value)}
                        sx={{ width: 90 }}
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Name"
                        value={customizationsBySize[size]?.[idx]?.name || ""}
                        onChange={e => handleCustomInput(size, idx, "name", e.target.value)}
                        sx={{ width: 120 }}
                      />
                    </Box>
                  </div>
                ));
              })
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Diálogo de guía de tallas */}
      <Dialog open={showSizeGuide} onClose={() => setShowSizeGuide(false)} maxWidth="md">
        <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={2}>
          {detail.SizeGuide?.image1 && (
            <Zoom>
              <Image src={detail.SizeGuide.image1} alt="Size Guide 1" width={300} height={300} />
            </Zoom>
          )}
          {detail.SizeGuide?.image2 && (
            <Zoom>
              <Image src={detail.SizeGuide.image2} alt="Size Guide 2" width={300} height={300} />
            </Zoom>
          )}
        </Box>
      </Dialog>


    </Box>
  );
}

export default AditionalDetails;
