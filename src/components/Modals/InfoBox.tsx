import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface InfoBoxProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onDismiss: () => void;
  arrowPosition?: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight";
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  step,
  onNext,
  onPrevious,
  onDismiss,
  arrowPosition = "top",
  className,
}) => {
  const steps = [
    {
      text: "You can choose a logo or image from your gallery and add it to the garment.",
    },
    {
      text: "You can add text to the garment with different fonts, colors and size.",
    },
    {
      text: "You can add numbers to the garment with different fonts, colors and size",
    },
    {
      text: "You can turn the garment to repeat the previous steps on the back of the garment",
    },
    {
      text: "You can see the customizations made in each product",
    },
  ];

  const currentStep = steps[step - 1];

  const arrowStyles: Record<string, React.CSSProperties> = {
    top: {
      position: "absolute",
      top: -8,
      left: "50%",
      transform: "translateX(-50%)",
      borderStyle: "solid",
      borderWidth: "0 8px 8px 8px",
      borderColor: "transparent transparent white transparent",
    },
    bottom: {
      position: "absolute",
      bottom: -8,
      left: "50%",
      transform: "translateX(-50%)",
      borderStyle: "solid",
      borderWidth: "8px 8px 0 8px",
      borderColor: "white transparent transparent transparent",
    },
    left: {
      position: "absolute",
      left: -8,
      top: "50%",
      transform: "translateY(-50%)",
      borderStyle: "solid",
      borderWidth: "8px 8px 8px 0",
      borderColor: "transparent white transparent transparent",
    },
    right: {
      position: "absolute",
      right: -8,
      top: "50%",
      transform: "translateY(-50%)",
      borderStyle: "solid",
      borderWidth: "8px 0 8px 8px",
      borderColor: "transparent transparent transparent white",
    },
    topLeft: {
      position: "absolute",
      top: -8,
      left: 16,
      borderStyle: "solid",
      borderWidth: "0 8px 8px 8px",
      borderColor: "transparent transparent white transparent",
    },
    topRight: {
      position: "absolute",
      top: -8,
      right: 16,
      borderStyle: "solid",
      borderWidth: "0 8px 8px 8px",
      borderColor: "transparent transparent white transparent",
    },
  };

  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        maxWidth: 400,
        p: 2,
        bgcolor: "white",
        color: "black",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={arrowStyles[arrowPosition]}></Box>
      <Typography variant="body1" gutterBottom>
        {currentStep.text}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, gap: 1}}>
        <Button
          onClick={onDismiss}
          variant="contained"
          color="primary"
          size="small"
        >
          Dismiss
        </Button>
        <Typography variant="body2" color="textSecondary">
          {step}/{steps.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {step > 1 && (
            <Button
              onClick={onPrevious}
              variant="contained"
              color="primary"
              size="small"
            >
              Previous
            </Button>
          )}
          {step < steps.length && (
            <Button
              onClick={onNext}
              variant="contained"
              color="primary"
              size="small"
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InfoBox;
