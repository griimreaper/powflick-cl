import React, { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  Dialog,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Customization } from "models/types";
import {
  initialCustomization,
  useCustomizationStore,
} from "store/customizationStore";
import { ZoomInOutlined } from "@mui/icons-material";
import { killParenthesisIn } from "utils/tools";
import { useCustomizationsStore } from "store/customizationsStore";
import { Paragraph } from "components/Typography";
import Link from "next/link";

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

  const handleOpenDialog = (item: any) => {
    setSelectedItem({ ...item, description: item.htmlString });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const renderSection = (
    label: string,
    content: JSX.Element,
    key: keyof Partial<Customization> | string,
    extraText?: string,
    button?: boolean
  ) => {
    const isLocked = key === "socks" && counter < 20;

    return (
      <Accordion key={key} disabled={isLocked}>
        {!isLocked ? (
          <AccordionSummary
            expandIcon={!isLocked ? <ExpandMoreIcon /> : null} // Oculta el icono si está bloqueado
            aria-controls={`${key}-content`}
            id={`${key}-header`}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                {label} {extraText ? `(${extraText})` : ""}{" "}
              </Typography>
              {button && !isLocked && (
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    height: "clamp(32px, 20px, 50px)", // Mantiene una altura adaptable
                    width: "clamp(30px, 30vw, 80px)", // Mantiene un ancho consistente en distintas pantallas
                    flexShrink: 0, // Evita que el botón se reduzca si el texto a la izquierda crece
                    mx: 1,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    fontWeight: 600,
                    transition: "background 0.15s, color 0.15s",
                    "&:active": {
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "2px solid #000",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFieldForAllCustomizations(
                      id,
                      key as keyof Customization,
                      customization[key as keyof Customization] as string
                    );
                  }}
                >
                  Set for all
                </Button>
              )}
            </Box>
          </AccordionSummary>
        ) : (
          <></>
        )}
        {!isLocked && <AccordionDetails>{content}</AccordionDetails>}
      </Accordion>
    );
  };

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
        {/* {type === "shorts" && (sport === "Basketball" || sport === "Soccer") && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleItemChange(type, "Default (+$0.00)")}
          style={{
            textTransform: "none",
            padding: 40,
            flex: compact ? "1 0 15%" : "1 0 21%",
            margin: compact ? "0.2rem" : "0.5rem",
          }}
        >
          Default Short
        </Button>
      )} */}
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

  const LITEPLAY_NAMES = [
    "LitePlay", "LitePlay™", "LitePlay™ Fabric"
  ];

  const isLitePlay = (name: string) =>
    ["LitePlay", "LitePlay™", "LitePlay™ Fabric"].some(n => name?.toLowerCase().includes(n.toLowerCase()));

  const isAeroDry = (name: string) =>
    ["AeroDry", "AeroDry™", "AeroDry™ Fabric"].some(n => name?.toLowerCase().includes(n.toLowerCase()));

  const isProMesh = (name: string) =>
    ["ProMesh", "ProMesh™", "ProMesh™ Fabric"].some(n => name?.toLowerCase().includes(n.toLowerCase()));

  return (
    <div style={{ marginTop: "2rem" }}>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 0,
            bgcolor: "#fff"
          },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          sx={{
            minHeight: { xs: "auto", md: "auto" },
            alignItems: "stretch",
            p: 0,
            bgcolor: "#fff"
          }}
        >
          {/* Imagen grande a la izquierda, borde redondeado */}
          <Box
            flex={1}
            minWidth={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
              p: { xs: 1, md: 3 },
              minHeight: { xs: 220, md: 420 },
              bgcolor: "#fff"
            }}
          >
            {selectedItem?.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 16,
                  background: "#fff"
                }}
              />
            )}
          </Box>
          {/* Contenido a la derecha, alineado arriba, con padding y fondo blanco */}
          <Box
            flex={1}
            p={{ xs: 3, md: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              minWidth: 0,
              borderRadius: { xs: "0 0 16px 16px", md: "0 16px 16px 0" },
              bgcolor: "#fff"
            }}
          >
            {selectedItem && isLitePlay(selectedItem.name) ? (
              <Box width="100%">
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
                  LitePlay™ Fabric
                </Typography>
                <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
                  Light-as-air comfort · Confort ultraligero
                </Typography>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>Everyday Performance · Rendimiento Diario</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>EN. Feather-light knit built for training and match day.</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>ES. Tejido ultraligero pensado para entrenos y día de partido.</Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>Soft Interlock Feel · Tacto Suave Interlock</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>EN. Smooth surface reduces chafe for all-day wear.</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>ES. Superficie lisa que evita roces durante todo el día.</Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>Quick-Dry Finish · Secado Rápido</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>EN. Wicks sweat fast to keep you cool and focused.</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>ES. Absorbe y evacua el sudor para mantenerte fresco y concentrado.</Typography>
                </Box>
                <Box mt={2} mb={2}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Weight / Peso</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>150 g/m² (ultra-light)</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Blend / Composición</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>100 % performance polyester</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Stretch / Elasticidad</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>2-way responsive</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Finish / Acabado</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>Moisture-wick, soft interlock</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            ) : selectedItem && isAeroDry(selectedItem.name) ? (
              <Box width="100%">
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
                  AeroDry™ Fabric
                </Typography>
                <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
                  Hexagon-vent mesh built for maximum cool · Malla hexagonal que mantiene la frescura total
                </Typography>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>Hexa-Vent Airflow · Flujo de Aire Hexa-Vent</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Micro-hexagon openings increase ventilation <b>up to 20 %</b> versus standard mesh, letting heat escape fast during sprints and summer fixtures.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Sus micro-hexágonos elevan la ventilación <b>hasta un 20 %</b> frente a la malla clásica, liberando el calor en carreras y partidos veraniegos.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>DryCore Wicking · Absorción DryCore</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Hydrophilic channels pull sweat off the skin and spread it across the surface for rapid evaporation—stay dry even above 90 °F.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Canales hidrofílicos alejan el sudor de la piel y lo dispersan para evaporarlo rápido; mantente seco incluso por encima de 32 °C.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>Feather-Lite Toughness · Ligeza Resistente</Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Ultra-light 145 g/m² knit resists snags and abrasion, enduring <b>50+ washes</b> without losing stretch or color.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Punto ultraligero de 145 g/m² que soporta enganches y rozaduras, aguantando <b>50+ lavadas</b> sin perder elasticidad ni color.
                  </Typography>
                </Box>
                <Box mt={2} mb={2}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Weight / Peso</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>145 g/m² (ultra-light)</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Blend / Composición</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>100 % performance polyester</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Stretch / Elasticidad</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>2-way responsive</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Finish / Acabado</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>Moisture-wick, snag-resistant micro-vent</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            ) : selectedItem && isProMesh(selectedItem.name) ? (
              <Box width="100%">
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
                  ProMesh™ Fabric
                </Typography>
                <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
                  Engineered for elite performance · Diseñado para el alto rendimiento
                </Typography>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>
                    Engineered Mesh Knit · Tejido de Malla Avanzada
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Precision-knit honeycomb cells lift heat away from the body, boosting airflow by up to 25 % compared with standard jerseys.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Celdas tipo panel elevan el calor y aumentan la ventilación hasta un 25 % frente a los tejidos convencionales.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>
                    ProStretch 2- Way Flex · Elasticidad Bidireccional ProStretch
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Athletic 2-way stretch moves with every sprint, tackle and slide—zero restriction, zero bagging.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Su elasticidad bidireccional acompaña cada sprint, entrada o barrida sin limitarte ni deformarse.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight="bold" sx={{ fontSize: 15 }}>
                    Game-Ready Durability · Resistencia de Competición
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>EN.</b> Anti-snag poly-filament yarns endure 50+ washes and season-long wear with no pilling or color fade.
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 14 }}>
                    <b>ES.</b> Los filamentos anti-tirón superan 50 lavadas y toda una temporada sin bolitas ni pérdida de color.
                  </Typography>
                </Box>
                <Box mt={2} mb={2}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Weight / Peso</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>150 g/m² (ultra-light)</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Blend / Composición</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>100 % performance polyester</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Stretch / Elasticidad</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>2-way responsive</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>Finish / Acabado</td>
                        <td style={{ padding: 8, border: "1px solid #ddd" }}>Moisture-wick, soft interlock</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
            ) : selectedItem?.description ? (
              <Box dangerouslySetInnerHTML={{ __html: selectedItem.description }} />
            ) : null}
          </Box>
        </Box>
      </Dialog>
      {isLocked ? (
        <Paragraph
          sx={{ color: "primary.main", fontWeight: 600, my: 1, ml: 2 }}
        >
          Socks available after 20 uniforms
        </Paragraph>
      ) : (
        <></>
      )}
      {detail.Size &&
        renderSection(
          `Size ${customization.size}`,
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["-MEN", "-KIDS", "-WOMEN"].map((gender) => (
              <div key={gender} style={{ width: "100%" }}>
                <Typography variant="subtitle2">
                  {gender.split("-").pop()}
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {detail.Size.filter((s: string) => s.includes(gender)).map(
                    (name: string) => (
                      <Button
                        key={name}
                        variant={
                          customization.size === name ? "contained" : "outlined"
                        }
                        onClick={() => handleItemChange("size", name)}
                        style={{
                          margin: "0.5rem",
                          borderRadius: "20px",
                          minWidth: "64px", // Valor por defecto de MUI
                          paddingLeft: "16px",
                          paddingRight: "16px",
                          whiteSpace: "nowrap", // Evita que el texto se corte


                        }}
                      >
                        {
                          name.includes("-KIDS")
                            ? name.split("-").slice(0, 2).join("-")
                            : name.split("-")[0]
                        }
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
            {detail.SizeGuide && (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    mt: 2,
                    width: "100%",

                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSizeGuide(!showSizeGuide);
                  }}
                >
                  Size Guide
                </Typography>
                {showSizeGuide && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      m: { xs: 1, md: 2 },
                    }}
                  >
                    {detail.SizeGuide.image1 && (
                      <Zoom>
                        <img
                          src={detail.SizeGuide.image1}
                          alt="Size Guide 1"
                          width={200}
                          height={100}
                        />
                      </Zoom>
                    )}
                    {detail.SizeGuide.image2 && (
                      <Zoom>
                        <img
                          src={detail.SizeGuide.image2}
                          alt="Size Guide 2"
                          width={200}
                          height={100}
                        />
                      </Zoom>
                    )}
                  </Box>
                )}
              </>
            )}
          </div>,
          "size",
          '',
          true
        )}
      {detail.Materials &&
        renderSection(
          `Materials ${customization.materials}`,
          renderItems(detail.Materials, "materials", true),
          "materials",
          undefined,
          true
        )}
      {detail.Neck &&
        renderSection(
          `Neck ${customization.neck}`,
          renderItems(detail.Neck, "neck"),
          "neck",
          undefined,
          true
        )}
      {/* Renderiza Shorts solo si selected es 'uniform' */}
      {detail.Shorts && selected === "uniform" &&
        renderSection(
          `Shorts ${customization.shorts}`,
          renderItems(detail.Shorts, "shorts", false, 75, true),
          "shorts",
          undefined,
          true
        )}
      {detail.Pants &&
        renderSection(
          `Pants ${customization.pants}`,
          renderItems(detail.Pants, "pants", false, 75, true),
          "pants",
          undefined,
          true
        )}
      {detail.Socks &&
        renderSection(
          `Socks ${customization.socks}`,
          renderItems(detail.Socks, "socks", false, 75, true),
          "socks",
          undefined,
          true
        )}
      {detail.Technique &&
        renderSection(
          `Technique ${customization.technique}`,
          renderItems(detail.Technique, "technique"),
          "technique",
          undefined,
        )}

      {/* {detail.PaymentMethods &&
        renderSection(
          `Payment Methods`,
          <div style={{ textAlign: "center" }}>
            <Typography>{detail.PaymentMethods.text}</Typography>
            <Zoom>
              <Image
                src={detail.PaymentMethods.image}
                alt="Payment Methods"
                width={200}
                height={100}
              />
            </Zoom>
          </div>,
          "payment-methods"
        )}
      {detail.ShippingTypes &&
        renderSection(
          `Shipping Types `,
          <Typography>{detail.ShippingTypes}</Typography>,
          "shipping-types"
        )} */}
    </div>
  );
};

export default AditionalDetails;
