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
}

const defaultCustom = initialCustomization();

const AditionalDetails: FC<AditionalDetailsProps> = ({
  detail,
  counter,
  handleItemChange,
  sport,
  id,
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
                  variant="contained"
                  color="primary"
                  sx={{
                    height: "clamp(32px, 20px, 50px)", // Mantiene una altura adaptable
                    width: "clamp(30px, 30vw, 80px)", // Mantiene un ancho consistente en distintas pantallas
                    flexShrink: 0, // Evita que el botón se reduzca si el texto a la izquierda crece
                    mx: 1,
                    whiteSpace: "nowrap",
                    textAlign: "center",
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
            Special Techniques require a minimum of 100 pieces per technique.
          </Typography>
          <Typography fontSize={'12px'}>
            Example: 50 with Embroidery on jersey + 50 with Embroidery on shorts = 100 pieces.
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
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              flex: compact ? "1 0 15%" : "1 0 21%",
              margin: compact ? "0.2rem" : "0.5rem",
            }}
          >
            <Button
              onClick={() => handleItemChange(type, item.name)}
              style={{
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
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
                    <Link href={item.link}>
                      <Typography fontSize={'11px'} color={'blue'} align="center">
                        Contact Us
                      </Typography>
                    </Link>
                  }
                </>
              }
            </Button>
          </div>
        ))}
      </div>
    </>
  );

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
          },
        }}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} height="100%">
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f5f5f5"
          >
            {selectedItem?.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            )}
          </Box>
          {selectedItem?.description &&
            <Box flex={1} p={4} overflow="auto">
              <Box dangerouslySetInnerHTML={{ __html: selectedItem.description }} />
            </Box>
          }
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
      {detail.Shorts &&
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
          true
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
