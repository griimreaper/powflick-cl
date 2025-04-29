
import React, { useState, useEffect } from "react";
import { CustomizationSides, Logo, Number as Numb, Text } from "models/types";
import ContainerInfoBox from "../Modals/ContainerInfoBox";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import MainContainer from "./MainContainer";
import EditableContainer from "./EditableContainer";
import useHearingEvent from "hooks/hearingEvent";
import { Box, Button, Grid } from "@mui/material";

interface PanelSidesProps {
  image?: string;
  sideName: "frontSide" | "backSide";
  id: string;
  font: string;
  steps: any;
  fontColor: string;
}

interface Selection {
  type: 'Text' | 'Number' | 'Logo' | '';
  index: number;
}

export const fonts: { [key: string]: string } = {
  Arial: "Arial",
  Anton: "Anton",
  Rasioline: "Rasioline",
  "Spot Light": "Spot Light",
  "Uni North": "Uni North",
  "Times New Roman": "Times New Roman",
  "Courier New": "Courier New",
  Verdana: "Verdana",
  Georgia: "Georgia",
  Tahoma: "Tahoma",
  "Fest": "Fest",
  "Black Bass Demo": "Black Bass Demo",
  "Dirga Hayu": "Dirga Hayu",
  "Restaurant Menu Book": "Restaurant Menu Book",
};

export default function PanelSides({
  steps: {
    step1,
    setStep1,
    step2,
    setStep2,
    step3,
    setStep3,
    step4,
    setStep4,
    step5,
    setStep5,
  },
  image,
  sideName,
  id,
  font,
  fontColor,
}: PanelSidesProps) {
  const { list, setCustomizationInList } =
    useCustomizationsStore();

  const customizations = list.find(
    ({ productId }) => productId === id
  )?.customizations;

  const { customization, updateCustomizationAttribute } =
  useCustomizationStore();

  const [logos, setLogos] = useState<Logo[]>(customization[sideName].logos || [
    {
      type: "Logo",
      logoUrl: "",
      logoSize: 100,
      logoPosition: { x: 250, y: 250 },
      logoDragOffset: { x: 0, y: 0 },
      rotate: 0,
    },
  ]);
  const [texts, setTexts] = useState<Text[]>(customization[sideName].texts || [
    {
      type: "Text",
      text: "",
      font: typeof font === "string" && fonts[font] ? font : "",
      textColor: (typeof fontColor === "string" && fontColor) || "black",
      textSize: 24,
      textPosition: { x: 150, y: 150 },
      textDragOffset: { x: 0, y: 0 },
      rotate: 0,
    },
  ]);
  const [numbers, setNumbers] = useState<Numb[]>(customization[sideName].numbers ||[
    {
      type: 'Number',
      number: "",
      font: typeof font === "string" && fonts[font] ? font : "",
      numberColor: (typeof fontColor === "string" && fontColor) || "black",
      numberPosition: { x: 80, y: 100 },
      numberDragOffset: { x: 0, y: 0 },
      numberSize: 50,
      rotate: 0,
    },
  ]);
  const [selection, setSelection] = useState<Selection>({
    type: '',
    index: 0,
  });
  const [showInputsEdit, setShowInputsEdit] = useState<string>("");
  const { actualize, setActualize } = useHearingEvent();

  const saveDataToLocal = () => {
    let side: CustomizationSides = {
      logos,
      texts,
      numbers,
    };

    // Guardar[sideName] en el localStorage
    localStorage.setItem(sideName, JSON.stringify(side));
  };

  useEffect(() => {
    saveDataToLocal();
  }, [logos, numbers, texts]);

  const handleShowItem = (name: 'Text' | 'Number' | 'Logo' | '') => {
    selection.type === name ? setSelection({ index: 0, type: '' }) : setSelection({ index: 0, type: name });
    const generateText = selection.type && name === '' ? false : true;
    if (name === 'Text' && !texts.some(t => t.text) && generateText) {
      setTexts(texts.map((t, i) => i === 0 ? t = { ...t, text: 'Insert Text', font: font, textColor: fontColor } : t))
    } else if (name === 'Number' && !numbers.some(t => t.number) && generateText) {
      setNumbers(numbers.map((n, i) => i === 0 ? n = { ...n, number: '0', font: font, numberColor: fontColor } : n))
    }
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    setTexts(
      texts.map((t: Text, i: number) =>
        i === index
          ? {
            ...t,
            text: filteredValue.slice(0, 14),
          }
          : t
      )
    );
    saveDataToLocal();
    setActualize();
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    // Verificar si el valor del input es una cadena vacía
    if (inputValue === "") {
      // Si es una cadena vacía, establecer el valor del número como null
      setNumbers(
        numbers.map((n: Numb, i: number) =>
          i === index ? { ...n, number: "" } : n
        )
      );
      saveDataToLocal();
    } else {
      // Si el valor no es una cadena vacía, intentar convertirlo a un número entero
      const integerValue = parseInt(inputValue, 10);
      // Verificar si el valor es un número entero positivo dentro del rango deseado (1-999)
      if (!isNaN(integerValue) && integerValue >= 1 && integerValue <= 999) {
        // Establecer el número solo si está dentro del rango deseado
        setNumbers(
          numbers.map((n: Numb, i: number) =>
            i === index ? { ...n, number: integerValue.toString() } : n
          )
        );
      }
    }
    saveDataToLocal();
    setActualize();
  };


  const handleUpdateAttribute = () => {
    // Obtener los atributos desde el localStorage
    let frontSide = localStorage.getItem("frontSide");
    let backSide = localStorage.getItem("backSide");

    if (frontSide) {
      frontSide = JSON.parse(frontSide);
      // Actualizar la personalización con los atributos obtenidos
      updateCustomizationAttribute("frontSide", frontSide);
    }
    if (backSide) {
      backSide = JSON.parse(backSide);
      // Actualizar la personalización con los atributos obtenidos
      updateCustomizationAttribute("backSide", backSide);
    }

    setCustomizationInList(id, customization);
  };

  useEffect(() => {
    handleUpdateAttribute();
  }, [actualize]);

  // Almacenar la posición del logo en el estado local cuando cambia
  useEffect(() => {
    setSelection({ type: '', index: 0 });
    if (customizations?.find((e) => e.id === customization.id)) {
      if (customization[sideName].logos)
        setLogos(customization[sideName].logos as Logo[]);
      if (customization[sideName].texts)
        setTexts(customization[sideName].texts as Text[]);
      if (customization[sideName].numbers)
        setNumbers(customization[sideName].numbers as Numb[]);
    }
  }, [customization.id, sideName]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("frontSide");
      localStorage.removeItem("backSide");
    };
  }, []);

  useEffect(() => {
    const handleStep = () => {
      setStep1(true);
    };
    handleStep();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <MainContainer // Contenedor principal, este es el lienzo donde van ubicados los elementos del usuario
        selection={selection}
        setSelection={setSelection}
        image={image as string}
        logos={logos}
        setLogos={setLogos}
        texts={texts}
        setTexts={setTexts}
        handleTextChange={handleTextChange}
        numbers={numbers}
        setNumbers={setNumbers}
        handleNumberChange={handleNumberChange}
        saveDataToLocal={saveDataToLocal}
        setActualize={setActualize}
      />
      {/* Buttons Logo, Text, Number */}
      <Grid
        container
        spacing={0}
        sx={{
          width: "100%",
          margin: "16px",
          paddingBottom: "16px",
          borderBottom: "1px solid",
        }}
      >
        {/* Logo Button */}
        <Grid item xs={4} sm={4}>
          <Box sx={{ position: "relative" }}>
            <Button
              id="logoButton"
              onClick={() => {
                handleShowItem("Logo");
                setShowInputsEdit("");
              }}
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "64px", sm: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                "&:focus": {
                  outline: "none",
                  ring: 2,
                  ringColor: "red",
                },
              }}
            >
              Logo
            </Button>
            {step1 && (
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "20%", lg: "35%" },
                  top: "100%",
                  marginTop: "8px",
                  zIndex: 40,
                  transform: "translateY(0)",
                }}
              >
                <ContainerInfoBox
                  stepp={1}
                  arrowPosition="topLeft"
                  className="w-full lg:w-screen"
                  visible={{ step1, step2, step3, step4, step5 }}
                  setVisible={{ setStep1, setStep2, setStep3, setStep4, setStep5 }}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Text Button */}
        <Grid item xs={4} sm={4}>
          <Box sx={{ position: "relative" }}>
            <Button
              onClick={() => {
                handleShowItem("Text");
                setShowInputsEdit("");
              }}
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "64px", sm: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                "&:focus": {
                  outline: "none",
                  ring: 2,
                  ringColor: "red",
                },
              }}
            >
              Text
            </Button>
            {step2 && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  marginTop: "8px",
                  zIndex: 40,
                  transform: "translateX(-50%)",
                }}
              >
                <ContainerInfoBox
                  stepp={2}
                  arrowPosition="top"
                  className="w-full lg:w-screen"
                  visible={{ step1, step2, step3, step4, step5 }}
                  setVisible={{ setStep1, setStep2, setStep3, setStep4, setStep5 }}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Number Button */}
        <Grid item xs={4} sm={4}>
          <Box sx={{ position: "relative" }} id="numberButton">
            <Button
              onClick={() => {
                handleShowItem("Number");
                setShowInputsEdit("");
              }}
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "64px", sm: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                "&:focus": {
                  outline: "none",
                  ring: 2,
                  ringColor: "red",
                },
              }}
            >
              Number
            </Button>
            {step3 && (
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: "20%", lg: "35%" },
                  top: "100%",
                  marginTop: "8px",
                  zIndex: 40,
                  transform: "translateY(0)",
                }}
              >
                <ContainerInfoBox
                  stepp={3}
                  arrowPosition="topRight"
                  className="w-full lg:w-screen"
                  visible={{ step1, step2, step3, step4, step5 }}
                  setVisible={{ setStep1, setStep2, setStep3, setStep4, setStep5 }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <EditableContainer // Editor del elemento
        id={id}
        selection={selection}
        setSelection={setSelection}
        logos={logos}
        setLogos={setLogos}
        texts={texts}
        setTexts={setTexts}
        handleTextChange={handleTextChange}
        numbers={numbers}
        setNumbers={setNumbers}
        handleNumberChange={handleNumberChange}
        sideName={sideName}
        saveDataToLocal={saveDataToLocal}
        fonts={fonts}
        font={font}
        fontColor={fontColor}
        setActualize={setActualize}
        showInputsEdit={showInputsEdit}
        setShowInputsEdit={setShowInputsEdit}
      />
    </Box>
  );
}
