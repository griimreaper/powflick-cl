import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Box,
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
import { SearchOutlinedIcon } from "components/search-box/styles";
import { ZoomInOutlined } from "@mui/icons-material";
import { killParenthesisIn } from "utils/tools";
import { useCustomizationsStore } from "store/customizationsStore";
import { Paragraph } from "components/Typography";

interface detailProps {
  Neck: { name: string; image: string }[] | null;
  Socks: SocksItem[];
  Shorts: { name: string; image: string }[] | string[] | null;
  Pants: { name: string; image: string }[] | null;
  Size: string[];
  Materials: { name: string; image: string }[];
  PaymentMethods: { text: string; image: string };
  ShippingTypes: string;
  SizeGuide: { image1: string; image2: string };
}

interface SocksItem {
  name: string;
  image: string;
  price?: number;
}

interface AditionalDetailsProps {
  detail: detailProps | any;
  counter: number;
  handleItemChange: (name: keyof Customization, value: string) => void;
  id: string,
  sport: string
}

const defaultCustom = initialCustomization();

const AditionalDetails: FC<AditionalDetailsProps> = ({
  detail,
  counter,
  handleItemChange,
  sport,
  id,
}) => {
  const { customization } = useCustomizationStore();
  const { list, setCustomizationsInList } = useCustomizationsStore();
  const isLocked = counter < 20;

  const handleSetForAll = (name: keyof Customization, value: string) => {
    const foundItem = list.find(({ productId }) => productId === id);

    if (foundItem) {
      // Manejar el caso cuando no se encuentra el producto
      const newList: Customization[] = foundItem.customizations.map(
        (customization: any) => {
          return {
            ...customization,
            [name]: value,
          };
        }
      );

      setCustomizationsInList(id, newList);
    }
  };


  const renderSection = (
    label: string,
    content: JSX.Element,
    key: keyof Partial<Customization> | string,
    extraText?: string,
    button?: boolean,
  ) => {
    const isLocked = key === "socks" && counter < 20;

    return (
      <Accordion key={key} disabled={isLocked}>
        {!isLocked ?
          <AccordionSummary
            expandIcon={!isLocked ? <ExpandMoreIcon /> : null} // Oculta el icono si está bloqueado
            aria-controls={`${key}-content`}
            id={`${key}-header`}
          >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    handleSetForAll(key as keyof Customization, customization[key as keyof Customization] as string);
                  }}
                >
                  Set for all
                </Button>

              )}

            </Box>
          </AccordionSummary>
          : <></>
        }
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
    <div style={{ display: "flex", overflowX: "auto", padding: "0.5rem", gap: "0.5rem", background: "#fff" }}>
      {type === 'shorts' && (sport === 'Basketball' || sport === 'Soccer') &&
        <Button variant="outlined" color="primary"
          onClick={() => handleItemChange(type, 'Default (+$0.00)')}
          style={{
            textTransform: "none",
            padding: 40,
            flex: compact ? "1 0 15%" : "1 0 21%",
            margin: compact ? "0.2rem" : "0.5rem",
          }}>Default Short</Button>
      }
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
              display: "block",
              width: "100%",
              padding: compact ? "0.2rem" : "0.5rem",
            }}
          >
            {useZoom ? (
              <div>
                <ZoomInOutlined sx={{ position: "absolute", right: "0", visibility: { md: "hidden" } }} />
                <Zoom>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={imageSize}
                    height={imageSize}
                    style={{ borderRadius: "10px" }}
                  />
                </Zoom>
              </div>
            ) : (
              <Image
                src={item.image}
                alt={item.name}
                width={imageSize}
                height={imageSize}
                style={{ borderRadius: "10px" }}
              />
            )}
            <Typography variant="body2" align="center">
              {type === 'socks' ? killParenthesisIn(item.name) : item.name}
            </Typography>
          </Button>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ marginTop: "2rem" }}>
      {isLocked ?
        <Paragraph sx={{ color: 'primary.main', fontWeight: 600, my: 1, ml: 2 }}>Socks available after 20 uniforms</Paragraph> : <></>}
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
                        }}
                      >
                        {name.split("-")[0]}
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>,
          "size"
        )}
      {detail.Neck &&
        renderSection(
          `Neck ${customization.neck}`,
          renderItems(detail.Neck, "neck", true),
          "neck",
          undefined,
          true
        )}
      {detail.Socks &&
        renderSection(
          `Socks: ${customization.socks}`,
          renderItems(detail.Socks, "socks", false, 25, true),
          "socks",
          undefined,
          true
        )}
      {detail.Shorts &&
        renderSection(
          `Shorts: ${customization.shorts}`,
          renderItems(detail.Shorts, "shorts"),
          "shorts",
          undefined,
          true
        )}
      {detail.Pants &&
        renderSection(
          `Pants: ${customization.pants}`,
          renderItems(detail.Pants, "pants"),
          "pants",
          undefined,
          true
        )}
      {detail.Materials &&
        renderSection(
          `Materials: ${customization.materials}`,
          renderItems(detail.Materials, "materials", true),
          "materials",
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
      {detail.SizeGuide &&
        renderSection(
          `Size Guide`,
          <div style={{ textAlign: "center" }}>
            {detail.SizeGuide.image1 && (
              <div>
                <ZoomInOutlined sx={{ position: "absolute", left: "65%" }} />
                <Zoom>
                  <img
                    src={detail.SizeGuide.image1}
                    alt="Size Guide 1"
                    width={200}
                    height={100}
                  />
                </Zoom>
              </div>
            )}
            {detail.SizeGuide.image2 && (
              <div>
                <ZoomInOutlined sx={{ position: "absolute", left: "65%" }} />
                <Zoom>
                  <img
                    src={detail.SizeGuide.image2}
                    alt="Size Guide 2"
                    width={200}
                    height={100}
                  />
                </Zoom>
              </div>
            )}
          </div>,
          "size-guide"
        )}
    </div>
  );
};

export default AditionalDetails;
