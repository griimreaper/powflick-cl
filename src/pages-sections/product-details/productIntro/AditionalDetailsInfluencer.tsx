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
  counter: number;
  handleItemChange: (name: keyof Customization, value: string) => void;
  id: string;
  sport: string;
  selected?: "top" | "uniform"; // <-- Añadido
}

const defaultCustom = initialCustomization();

const sizeTabs = [
  { label: "Men", value: "MEN" },
  { label: "Women", value: "WOMEN" },
  { label: "Kids", value: "KIDS" },
];

// Define las tallas por género
const sizeOptions: Record<string, string[]> = {
  MEN: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
  WOMEN: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  KIDS: ["XSj (5-6Y)", "Sj (7-8Y)", "Mj (9-10Y)", "Lj (11-12Y)", "XLj (13-14Y)"]
};

const AditionalDetails: FC<AditionalDetailsProps> = ({
  detail,
  counter,
  handleItemChange,
  sport,
  id,
  selected = "uniform", // <-- Valor por defecto
}) => {
  const customization = useCustomizationStore(state => state.customization);
  const { setFieldForAllCustomizations } = useCustomizationsStore();
  const isLocked = counter < 20;
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantities, setQuantities] = useState<{ [size: string]: number }>(
    Object.fromEntries(sizeOptions.MEN.map(size => [size, 0]))
  );
  const [tab, setTab] = useState(0);
  const [customType, setCustomType] = useState<"number" | "name">("number");
  const [customValue, setCustomValue] = useState("");

  // Estado: customizaciones por talla (size)
  const [customizationsBySize, setCustomizationsBySize] = useState<{
    [size: string]: { number?: string; name?: string }[]
  }>({});

  const handleOpenDialog = (item: any) => {
    setSelectedItem({ ...item, description: item.htmlString });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // Maneja el cambio de cantidad por talla
  const handleQuantity = (size: string, delta: number) => {
    setQuantities(q => {
      const prev = q[size] || 0;
      const next = Math.max(0, prev + delta);
      // Actualiza customizaciones por talla
      setCustomizationsBySize(prevCustoms => {
        const customs = prevCustoms[size] || [];
        let newCustoms = customs;
        if (delta > 0) {
          // Agrega customizaciones vacías
          newCustoms = [...customs, ...Array(delta).fill({ number: "", name: "" })];
        } else if (delta < 0) {
          // Elimina del final
          newCustoms = customs.slice(0, next);
        }
        return { ...prevCustoms, [size]: newCustoms };
      });
      return { ...q, [size]: next };
    });
  };

  // Maneja el cambio de number o name para una unidad específica de una talla
  const handleCustomInput = (size: string, idx: number, field: "number" | "name", value: string) => {
    setCustomizationsBySize(prev => {
      const customs = [...(prev[size] || [])];
      customs[idx] = { ...customs[idx], [field]: value };
      return { ...prev, [size]: customs };
    });
  };

  // Obtiene el valor de la pestaña seleccionada
  const selectedTabValue = sizeTabs[tab].value;
  // Obtiene las tallas para la pestaña seleccionada
  const currentSizes = sizeOptions[selectedTabValue];

  // Asegura que el estado de cantidades tenga solo las tallas del tab actual, sin acumular ni agregar nuevas
  React.useEffect(() => {
    setQuantities(q => {
      // Solo conserva las tallas del tab actual, eliminando las que no corresponden
      const newQ: { [size: string]: number } = {};
      currentSizes.forEach(size => {
        newQ[size] = q[size] || 0;
      });
      return newQ;
    });
    // eslint-disable-next-line
  }, [tab]);

  // Calcula el total de unidades seleccionadas sumando las cantidades por talla
  const totalSelected = Object.values(quantities).reduce((acc, val) => acc + (val || 0), 0);

  // Sincroniza el total con el contador global si es diferente
  React.useEffect(() => {
    if (totalSelected !== counter) {
      // Si el padre provee un setter para el contador, deberías llamarlo aquí.
      // Por ejemplo: setCounter(totalSelected);
      // Si no, asegúrate de que el padre lea el valor de totalSelected.
      // Si solo se pasa el counter como prop, puedes mostrar una advertencia o dejar comentario.
      // Ejemplo:
      // handleCounterChange && handleCounterChange(totalSelected);
    }
  }, [totalSelected]);

  const renderItems = (
    items: any[],
    type: keyof Customization,
    useZoom: boolean = false,
    imageSize: number = 100,
    compact: boolean = false
  ) => (
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
                onClick={
                  () =>
                    handleItemChange(type, item.name)
                }

                style={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  width: "100%",
                  padding: compact ? "0.2rem" : "0.5rem",
                  background: customization[type] === item.name ? "grey" : "white", // Resaltar en gris si está seleccionado
                  color: customization[type] === item.name ? "white" : "black", // Texto blanco si está seleccionado
                }}
              >
                {useZoom ? (
                  <div
                    onClick={() => handleOpenDialog(item)}
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <ZoomInOutlined
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        color: "#000",
                        zIndex: 1,
                      }}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      width={imageSize}
                      height={imageSize}
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                ) : (
                  <>
                    {item.image ?
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={imageSize}
                        height={imageSize}
                        style={{ borderRadius: "10px" }}
                      />
                      :
                      <Box bgcolor={item.hex} width={25} height={25} borderRadius={'100%'}></Box>
                    }
                  </>
                )}
                {
                  <>
                    <Typography fontWeight={'600'} align="center" whiteSpace={'nowrap'}>
                      {type === "socks" ? killParenthesisIn(item.name) : item.name}
                    </Typography>
                    {item.description &&
                      <Typography fontSize={'11px'} align="center"  >
                        {item.description}
                      </Typography>
                    }
                    {item.link &&
                      // Solo el texto "Contact Us" es clickeable y abre el link
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
                    }
                  </>
                }
              </Button>
            </div>
          )
        })}
      </div>
    </>
  );

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
                <Typography minWidth={20} textAlign="center" fontWeight={500}>{quantities[size] || 0}</Typography>
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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Typography fontWeight={600} color="primary.main">
            Total: {totalSelected}
          </Typography>
        </Box>
      </Box>

      {/* Personalización */}
      <Box mt={3}>
        <Typography fontWeight={600} fontSize={15} mb={1}>
          Customize (Optional)
        </Typography>
        <RadioGroup
          row
          value={customType}
          onChange={(_, v) => setCustomType(v as "number" | "name")}
        >
          <FormControlLabel
            value="number"
            control={<Radio sx={{ color: "#222", "&.Mui-checked": { color: "#d32f2f" } }} />}
            label="Number"
            sx={{ mr: 3 }}
          />
          <FormControlLabel
            value="name"
            control={<Radio sx={{ color: "#222", "&.Mui-checked": { color: "#d32f2f" } }} />}
            label="Name"
          />
        </RadioGroup>
        <TextField
          variant="outlined"
          size="small"
          placeholder={customType === "number" ? "# 25" : "Name"}
          value={customValue}
          onChange={e => setCustomValue(e.target.value)}
          sx={{
            mt: 1,
            width: "100%",
            background: "#fafafa",
            "& .MuiOutlinedInput-root": { borderRadius: 1 }
          }}
        />
      </Box>

      {/* Personalización por unidad */}
      <Box mt={3}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="customize-content"
            id="customize-header"
          >
            <Typography fontWeight={600} fontSize={15}>
              Customize List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(quantities).map(([size, count]) =>
              Array.from({ length: count }).map((_, idx) => (
                <div key={`${size}-${idx}`}>
                  <Box key={`${size}-${idx}`} display="flex" alignItems="center" gap={2} mb={1}>
                    <Typography fontWeight={500} minWidth={40}>{size} #{idx + 1}</Typography>
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
              ))
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Diálogo de guía de tallas */}
      <Dialog open={showSizeGuide} onClose={() => setShowSizeGuide(false)} maxWidth="md">
        <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={2}>
          {detail.SizeGuide?.image1 && (
            <Zoom>
              <img src={detail.SizeGuide.image1} alt="Size Guide 1" width={300} />
            </Zoom>
          )}
          {detail.SizeGuide?.image2 && (
            <Zoom>
              <img src={detail.SizeGuide.image2} alt="Size Guide 2" width={300} />
            </Zoom>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default AditionalDetails;
