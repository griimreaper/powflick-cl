/* eslint-disable @next/next/no-img-element */
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations('ProductCustomize');
  const customization = useCustomizationStore(state => state.customization);
  const { setFieldForAllCustomizations } = useCustomizationsStore();
  const isLocked = counter < 20;
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [sizeGuideLang, setSizeGuideLang] = useState<'es' | 'en'>('en');

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
            expandIcon={!isLocked ? <ExpandMoreIcon /> : null}
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
              {/* Solo mostrar Size Guide si el acordeón es de talla */}
              {key === "size" && (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      ":hover": {
                        textDecoration: "underline",
                        color: "primary.main",
                      },
                      cursor: "pointer",

                      width: "auto",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSizeGuide(!showSizeGuide);
                    }}
                  >
                    {t('sizeGuide')}
                  </Typography>
                  {showSizeGuide && (
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
                          <Box display="flex" width="100%" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={2}>
                            <Box width={{ xs: '100%', md: '30%' }}>
                              <Zoom>
                                <img
                                  src="/assets/images/detail/size-table-english-mobile-1.png"
                                  alt="size-image"
                                  width={1000}
                                  height={1000}
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              </Zoom>
                            </Box>
                            <Box width={{ xs: '100%', md: '70%' }}>
                              <Zoom>
                                <img
                                  src="/assets/images/detail/size-table-english.png"
                                  alt="size-image-2"
                                  width={1000}
                                  height={1000}
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              </Zoom>
                            </Box>
                          </Box>
                        ) : (
                          <Box display="flex" width="100%" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={2}>
                            <Box width={{ xs: '100%', md: '30%' }}>
                              <Zoom>
                                <img
                                  src="/assets/images/detail/size-table-spanish-mobile-1.png"
                                  alt="size-image"
                                  width={1000}
                                  height={1000}
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              </Zoom>
                            </Box>
                            <Box width={{ xs: '100%', md: '70%' }}>
                              <Zoom>
                                <img
                                  src="/assets/images/detail/size-table-spanish.png"
                                  alt="size-image-2"
                                  width={1000}
                                  height={1000}
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              </Zoom>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Dialog >
                  )}
                </>
              )}
              {button && !isLocked && (
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #000",
                    height: "clamp(32px, 20px, 50px)", // Mantiene una altura adaptable
                    width: "auto", // Mantiene un ancho consistente en distintas pantallas
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
                  {t('setForAll')}
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
            {t('specialTech.title')}
          </Typography>
          <Typography fontSize={'12px'}>
            {t('specialTech.example')}
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
          const isTechnique = type === "technique";
          return (
            <div
              key={index}
              style={{
                position: "relative",
                flex: compact ? "1 0 15%" : "1 0 21%",
                margin: compact ? "0.2rem" : "0.5rem",
                opacity: 1,
                pointerEvents: "auto",
                cursor: isTechnique ? "default" : "pointer",
              }}
            >
              <Button
                onClick={
                  isTechnique
                    ? undefined
                    : () => handleItemChange(type, item.name)
                }
                disabled={isTechnique}
                style={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  width: "100%",
                  padding: compact ? "0.2rem" : "0.5rem",
                  background: isTechnique
                    ? "#fff"
                    : customization[type] === item.name
                      ? "grey"
                      : "white",
                  color: isTechnique
                    ? "black"
                    : customization[type] === item.name
                      ? "white"
                      : "black",
                  cursor: isTechnique ? "default" : "pointer",
                  boxShadow: isTechnique ? "none" : undefined,
                  border: isTechnique ? "1px solid #eee" : undefined,
                  pointerEvents: "auto",
                }}
                // Elimina el efecto hover para technique
                sx={isTechnique ? { "&:hover": { background: "#fff" } } : undefined}
              >
                {useZoom ? (
                  <div
                    onClick={isTechnique ? undefined : () => handleOpenDialog(item)}
                    style={{ cursor: isTechnique ? "default" : "pointer", position: "relative" }}
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
                      {type === "socks" ? killParenthesisIn(item.name) : (type === 'technique' ? (function (name) {
                        switch (name) {
                          case 'Default Sublimated': return t('techniqueNames.defaultSublimated');
                          case 'Heat Press Technique': return t('techniqueNames.heatPress');
                          case 'Stitch Embroidery': return t('techniqueNames.stitchEmbroidery');
                          case 'Embroidery Logo': return t('techniqueNames.embroideryLogo');
                          default: return name;
                        }
                      })(item.name) : item.name)}
                    </Typography>
                    {item.description &&
                      <Typography fontSize={'11px'} align="center"  >
                        {item.description}
                      </Typography>
                    }
                    {item.link &&
                      <Link href={item.link} passHref legacyBehavior>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography fontSize={'11px'} color={'blue'} align="center">
                            {t('contactUs')}
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

  const renderFabricSection = (name?: string) => {
    if (!name) return null;
    const lower = name.toLowerCase();
    const isLP = ["liteplay", "liteplay™", "liteplay™ fabric"].some(n => lower.includes(n));
    const isAD = ["aerodry", "aerodry™", "aerodry™ fabric"].some(n => lower.includes(n));
    const isPM = ["promesh", "promesh™", "promesh™ fabric"].some(n => lower.includes(n));

    const headers = {
      weight: t('fabric.common.weight'),
      blend: t('fabric.common.blend'),
      stretch: t('fabric.common.stretch'),
      finish: t('fabric.common.finish'),
    };

    if (isLP) {
      return (
        <Box width="100%">
          <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
            {t('fabric.litePlay.title')}
          </Typography>
          <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
            {t('fabric.litePlay.subtitle')}
          </Typography>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.litePlay.dailyTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.litePlay.dailyBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.litePlay.softTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.litePlay.softBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.litePlay.quickDryTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.litePlay.quickDryBody')}</Typography>
          </Box>
          <Box mt={2} mb={2}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.weight}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.litePlay.values.weight')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.blend}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.litePlay.values.blend')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.stretch}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.litePlay.values.stretch')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.finish}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.litePlay.values.finish')}</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      );
    }

    if (isAD) {
      return (
        <Box width="100%">
          <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
            {t('fabric.aeroDry.title')}
          </Typography>
          <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
            {t('fabric.aeroDry.subtitle')}
          </Typography>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.aeroDry.airflowTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.aeroDry.airflowBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.aeroDry.drycoreTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.aeroDry.drycoreBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.aeroDry.toughnessTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.aeroDry.toughnessBody')}</Typography>
          </Box>
          <Box mt={2} mb={2}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.weight}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.aeroDry.values.weight')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.blend}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.aeroDry.values.blend')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.stretch}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.aeroDry.values.stretch')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.finish}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.aeroDry.values.finish')}</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      );
    }

    if (isPM) {
      return (
        <Box width="100%">
          <Typography variant="h4" fontWeight="bold" mb={2} sx={{ lineHeight: 1.1 }}>
            {t('fabric.proMesh.title')}
          </Typography>
          <Typography fontStyle="italic" mb={3} sx={{ fontSize: 17 }}>
            {t('fabric.proMesh.subtitle')}
          </Typography>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.proMesh.knitTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.proMesh.knitBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.proMesh.flexTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.proMesh.flexBody')}</Typography>
          </Box>
          <Box mb={2}>
            <Typography fontWeight="bold" sx={{ fontSize: 15 }}>{t('fabric.proMesh.durabilityTitle')}</Typography>
            <Typography variant="body2" sx={{ fontSize: 14 }}>{t('fabric.proMesh.durabilityBody')}</Typography>
          </Box>
          <Box mt={2} mb={2}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.weight}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.proMesh.values.weight')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.blend}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.proMesh.values.blend')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.stretch}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.proMesh.values.stretch')}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold", padding: 8, border: "1px solid #ddd", background: "#fafafa" }}>{headers.finish}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{t('fabric.proMesh.values.finish')}</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      );
    }

    return null;
  };

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
            {selectedItem && (isLitePlay(selectedItem.name) || isAeroDry(selectedItem.name) || isProMesh(selectedItem.name)) ? (
              <Box width="100%">{renderFabricSection(selectedItem.name)}</Box>
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
          {t('socksAvailable', { count: 20 })}
        </Paragraph>
      ) : (
        <></>
      )}
      {detail.Size &&
        renderSection(
          `${t('sections.size')} ${customization.size}`,
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["-MEN", "-KIDS", "-WOMEN"].map((gender) => (
              <div key={gender} style={{ width: "100%" }}>
                <Typography variant="subtitle2">
                  {(function (g) { const k = g.split('-').pop() || ''; const key = k.toLowerCase(); return t(`genders.${key}` as any); })(gender)}
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




          </div>,
          "size",
          '',
          true
        )}
      {detail.Materials &&
        renderSection(
          `${t('sections.materials')} ${customization.materials}`,
          renderItems(detail.Materials, "materials", true),
          "materials",
          undefined,
          true
        )}
      {detail.Neck &&
        renderSection(
          `${t('sections.neck')} ${customization.neck}`,
          renderItems(detail.Neck, "neck"),
          "neck",
          undefined,
          true
        )}
      {/* Renderiza Shorts solo si selected es 'uniform' */}
      {detail.Shorts && selected === "uniform" &&
        renderSection(
          `${t('sections.shorts')} ${customization.shorts}`,
          renderItems(detail.Shorts, "shorts", false, 75, true),
          "shorts",
          undefined,
          true
        )}
      {detail.Pants &&
        renderSection(
          `${t('sections.pants')} ${customization.pants}`,
          renderItems(detail.Pants, "pants", false, 75, true),
          "pants",
          undefined,
          true
        )}
      {detail.Socks &&
        renderSection(
          `${t('sections.socks')} ${customization.socks}`,
          renderItems(detail.Socks, "socks", false, 75, true),
          "socks",
          undefined,
          true
        )}
      {detail.Technique &&
        renderSection(
          `${t('sections.technique')} ${customization.technique}`,
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
