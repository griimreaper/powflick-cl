import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";

interface ContainerInfoBoxProps {
  className?: string;
  arrowPosition?: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight";
  stepp?: number;
  visible?: { step1: any; step2: any; step3: any; step4: any; step5: any };
  setVisible: {
    setStep1: any;
    setStep2: any;
    setStep3: any;
    setStep4: any;
    setStep5: any;
  };
}

const ContainerInfoBox: React.FC<ContainerInfoBoxProps> = ({
  visible,
  stepp = 1,
  className,
  arrowPosition = "top",
  setVisible,
}) => {
  // en dashboard se puede colocar un boton para reanudar el tutorial de customizacion
  useEffect(() => {
    const dismissed = localStorage.getItem("stepsDismissed");
    if (dismissed) {
      setVisible.setStep1(false);
      setVisible.setStep2(false);
      setVisible.setStep3(false);
      setVisible.setStep4(false);
      setVisible.setStep5(false);
    }
  }, [setVisible]);

  const handleDismiss = () => {
    setVisible.setStep1(false);
    setVisible.setStep2(false);
    setVisible.setStep3(false);
    setVisible.setStep4(false);
    setVisible.setStep5(false);
    localStorage.setItem("stepsDismissed", "true");
  };

  const handleNext = () => {
    switch (stepp) {
      case 1:
        setVisible.setStep1(false);
        setVisible.setStep2(true);
        break;
      case 2:
        setVisible.setStep2(false);
        setVisible.setStep3(true);
        break;
      case 3:
        setVisible.setStep3(false);
        setVisible.setStep4(true);
        const ButtonScroll = document.getElementById("toggleButton");
        ButtonScroll && ButtonScroll.scrollIntoView({ behavior: "smooth" });
        break;
      case 4:
        setVisible.setStep4(false);
        setVisible.setStep5(true);
        break;
      case 5:
        setVisible.setStep5(false);
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (stepp) {
      case 2:
        setVisible.setStep2(false);
        setVisible.setStep1(true);
        break;
      case 3:
        setVisible.setStep3(false);
        setVisible.setStep2(true);
        break;
      case 4:
        setVisible.setStep4(false);
        setVisible.setStep3(true);
        const ButtonScroll = document.getElementById("numberButton");
        ButtonScroll &&
          ButtonScroll.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      case 5:
        setVisible.setStep5(false);
        setVisible.setStep4(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <InfoBox
        step={stepp}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onDismiss={handleDismiss}
        arrowPosition={arrowPosition}
        className={className}
      />
    </>
  );
};

export default ContainerInfoBox;
