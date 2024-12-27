import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Customization } from "models/types";
import {
  initialCustomization,
  useCustomizationStore,
} from "store/customizations";

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

const AditionalDetails: FC<AditionalDetailsProps> = ({
  detail,
  handleItemChange,
}) => {
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

  const renderItems = (
    items: any[],
    type: keyof Customization,
    useZoom: boolean = false,
    imageSize: number = 100,
    compact: boolean = false
  ) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
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
              <Zoom>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={imageSize}
                  height={imageSize}
                  style={{ borderRadius: "10px" }}
                />
              </Zoom>
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
              {item.name}
            </Typography>
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ marginTop: "2rem" }}>
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
          "neck"
        )}
      {detail.Socks &&
        renderSection(
          `Socks ${customization.socks}`,
          renderItems(detail.Socks, "socks", false, 25, true),
          "socks"
        )}
      {detail.Shorts &&
        renderSection(
          `Shorts ${customization.shorts}`,
          renderItems(detail.Shorts, "shorts"),
          "shorts"
        )}
      {detail.Pants &&
        renderSection(
          `Pants ${customization.pants}`,
          renderItems(detail.Pants, "pants"),
          "pants"
        )}
      {detail.Materials &&
        renderSection(
          `Materials ${customization.materials}`,
          renderItems(detail.Materials, "materials", true),
          "materials"
        )}
      {detail.PaymentMethods &&
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
        )}
      {detail.SizeGuide &&
        renderSection(
          `Size Guide`,
          <div style={{ textAlign: "center" }}>
            {detail.SizeGuide.image1 && (
              <Zoom>
                <Image
                  src={detail.SizeGuide.image1}
                  alt="Size Guide 1"
                  width={200}
                  height={100}
                />
              </Zoom>
            )}
            {detail.SizeGuide.image2 && (
              <Zoom>
                <Image
                  src={detail.SizeGuide.image2}
                  alt="Size Guide 2"
                  width={200}
                  height={100}
                />
              </Zoom>
            )}
          </div>,
          "size-guide"
        )}
    </div>
  );
};

export default AditionalDetails;
