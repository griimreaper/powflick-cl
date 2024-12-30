import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// import {
//   convertCurrency,
//   currencySymbol,
//   eliminarCaracteresNoNumericos,
//   killParenthesisIn,
// } from "@/utils/tools";
import { Customization } from "models/types";
import { initialCustomization, useCustomizationStore } from "store/customizationStore";

interface detailProps {
  Neck: { name: string; image: string }[] | null;
  Socks: { name: string; image: string }[];
  Shorts: { name: string; image: string }[] | string[] | null;
  Pants: { name: string; image: string }[] | null;
  Size: string[];
  Materials: { name: string; image: string }[];
  PaymentMethods: { text: string; image: string };
  ShippingTypes: string;
  SizeGuide: { image1: string; image2: string };
}

interface AditionalDetailsProps {
  detail: detailProps | any;
  handleItemChange: (name: keyof Customization, value: string) => void;
}

const defaultCustom = initialCustomization();

const AditionalDetails: FC<AditionalDetailsProps> = ({ detail, handleItemChange }) => {
  const { customization } = useCustomizationStore();

  const renderSection = (
    label: string,
    content: JSX.Element,
    key: string,
    extraText?: string
  ) => (
    <Accordion key={key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${key}-content`}
        id={`${key}-header`}
      >
        <Typography>
          {label} {extraText ? `(${extraText})` : ""}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );

  return (
    <div style={{ marginTop: "2rem" }}>
      {detail.Size &&
        renderSection(
          `Size ${customization.size}`,
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["-MEN", "-KIDS", "-WOMEN"].map((gender) => (
              <div key={gender} style={{ width: "100%" }}>
                <Typography variant="subtitle2">{gender.split("-").pop()}</Typography>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {detail.Size.filter((s: string) => s.includes(gender)).map((name: string) => (
                    <Button
                      key={name}
                      variant={customization.size === name ? "contained" : "outlined"}
                      onClick={() => handleItemChange("size", name)}
                      style={{
                        margin: "0.5rem",
                        borderRadius: "20px",
                      }}
                    >
                      {name.split("-")[0]}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>,
          "size"
        )}
      {detail.Neck &&
        renderSection(
          `Neck`,
          <div style={{ display: "flex", gap: "1rem" }}>
            {detail.Neck.map((item: any, index: number) => (
              <div key={index} style={{ textAlign: "center" }}>
                <Zoom>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "20px",
                      border: customization.neck === item.name ? "2px solid #1976d2" : "",
                    }}
                  />
                </Zoom>
                <Typography>{item.name}</Typography>
              </div>
            ))}
          </div>,
          "neck"
        )}
      {/* Similar sections for Socks, Shorts, Pants, Materials, PaymentMethods, ShippingTypes, and SizeGuide */}
    </div>
  );
};

export default AditionalDetails;
