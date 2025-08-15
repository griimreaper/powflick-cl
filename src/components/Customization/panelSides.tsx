import React, { useState, useEffect, useRef } from "react";
import { CustomizationSides, Logo, Number as Numb, Text } from "models/types";
import ContainerInfoBox from "../Modals/ContainerInfoBox";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import MainContainer from "./MainContainer";
import EditableContainer from "./EditableContainer";
import useHearingEvent from "hooks/hearingEvent";
import { Box, Button, Grid } from "@mui/material";
import { AutorenewOutlined } from "@mui/icons-material";

interface PanelSidesProps {
  image?: string;
  sideName: "frontSide" | "backSide";
  id: string;
  font: string;
  steps: any;
  fontColor: string;
  togglePanel: () => void;
  selection: {
    type: 'Text' | 'Number' | 'Logo' | '';
    index: number;
  };
  setSelection: Function;
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
  "Hatten": "Hatten",
  "NCAA Oregon Ducks Autzen": "NCAA Oregon Ducks Autzen",
  "Qatar Personal Use": "Qatar Personal Use",
  "Real Madrid": "Real Madrid",
  "Quantum Rangers Personal": "Quantum Rangers Personal",
  "Boston Caps": "Boston Caps",
  "Chinese Rocks": "Chinese Rocks",
  "Madura United FC": "Madura United FC",
  "Overgrid": "Overgrid",
  "Slovakia": "Slovakia",
  "Crawford Line": "Crawford Line",
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
  togglePanel,
  selection,
  setSelection,
}: PanelSidesProps) {
  const { list, setCustomizationInList } =
    useCustomizationsStore();

  const customizations = list.find(
    ({ productId }) => productId === id
  )?.customizations;

  const { customization, updateCustomizationAttribute } =
    useCustomizationStore();

  const logosRef = useRef<Logo[]>(
    customization[sideName].logos || [
      {
        type: "Logo",
        logoUrl: "",
        logoSize: 100,
        logoPosition: { x: 250, y: 250 },
        logoDragOffset: { x: 0, y: 0 },
        rotate: 0,
      },
    ]
  );

  const textsRef = useRef<Text[]>(
    customization[sideName].texts || [
      {
        type: "Text",
        text: "",
        font: typeof font === "string" && fonts[font] ? font : "",
        textColor: typeof fontColor === "string" && fontColor ? fontColor : "black",
        textSize: 24,
        textPosition: { x: 150, y: 150 },
        textDragOffset: { x: 0, y: 0 },
        rotate: 0,
      },
    ]
  );

  const numbersRef = useRef<Numb[]>(
    customization[sideName].numbers || [
      {
        type: "Number",
        number: "",
        font: typeof font === "string" && fonts[font] ? font : "",
        numberColor: typeof fontColor === "string" && fontColor ? fontColor : "black",
        numberPosition: { x: 80, y: 100 },
        numberDragOffset: { x: 0, y: 0 },
        numberSize: 50,
        rotate: 0,
      },
    ]
  );

  const [showInputsEdit, setShowInputsEdit] = useState<string>("");
  const { actualize, setActualize } = useHearingEvent();
  const [, forceUpdate] = useState(0);

  const saveDataToLocal = () => {
    let side: CustomizationSides = {
      logos: logosRef.current,
      texts: textsRef.current,
      numbers: numbersRef.current,
    };

    // Guardar[sideName] en el localStorage
    localStorage.setItem(sideName, JSON.stringify(side));
  };

  useEffect(() => {
    if (!customizations) return;

    const currentSideData = customizations.find(c => c.id === customization.id)?.[sideName];
    if (!currentSideData) return;

    // Sobrescribir textsRef.current con objetos válidos
    textsRef.current = currentSideData.texts.map((newText, i) => {
      const base = textsRef.current[i] || newText;
      return {
        ...base,
        text: newText?.text ?? "",
      };
    });

    // Sobrescribir numbersRef.current con objetos válidos
    numbersRef.current = currentSideData.numbers.map((newNumber, i) => {
      const base = numbersRef.current[i] || newNumber;
      return {
        ...base,
        number: newNumber?.number ?? "",
      };
    });

    // Reemplazo directo de logos
    logosRef.current = currentSideData.logos.map((newLogo, i) => {
      const base = logosRef.current[i] || newLogo;
      return {
        ...base,
        logoUrl: newLogo?.logoUrl ?? base.logoUrl ?? "",
      };
    });

    forceUpdate(n => n + 1);
  }, [customizations, customization, sideName, font, fontColor]);

  useEffect(() => {
    saveDataToLocal();
  }, [logosRef.current, numbersRef.current, textsRef.current]);

  const handleShowItem = (name: 'Text' | 'Number' | 'Logo' | '') => {
    selection.type === name ? setSelection({ index: 0, type: '' }) : setSelection({ index: 0, type: name });
    const generateText = selection.type && name === '' ? false : true;
    if (name === 'Text' && !textsRef.current.some(t => t.text) && generateText) {
      textsRef.current = textsRef.current.map((t, i) => i === 0 ? t = { ...t, text: 'Insert Text', font: font, textColor: fontColor } : t);
    } else if (name === 'Number' && !numbersRef.current.some(t => t.number) && generateText) {
      numbersRef.current = numbersRef.current.map((n, i) => i === 0 ? n = { ...n, number: '0', font: font, numberColor: fontColor } : n);
    }
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    textsRef.current =
      textsRef.current.map((t: Text, i: number) =>
        i === index
          ? {
            ...t,
            text: filteredValue.slice(0, 14),
          }
          : t
      )
      ;
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
      numbersRef.current =
        numbersRef.current.map((n: Numb, i: number) =>
          i === index ? { ...n, number: "" } : n
        );
      saveDataToLocal();
    } else {
      // Si el valor no es una cadena vacía, intentar convertirlo a un número entero
      const integerValue = parseInt(inputValue, 10);
      // Verificar si el valor es un número entero positivo dentro del rango deseado (1-999)
      if (!isNaN(integerValue) && integerValue >= 1 && integerValue <= 999) {
        // Establecer el número solo si está dentro del rango deseado
        numbersRef.current =
          numbersRef.current.map((n: Numb, i: number) =>
            i === index ? { ...n, number: integerValue.toString() } : n
          );
      }
    }
    saveDataToLocal();
    setActualize();
  };

  const setLogos = (updater: Logo[] | ((prev: Logo[]) => Logo[])) => {
    const prev = logosRef.current;
    logosRef.current =
      typeof updater === "function" ? (updater as (prev: Logo[]) => Logo[])(prev) : updater;

    // Si querés forzar un re-render después de cambiar los datos:
    forceUpdate(n => n + 1);
  };

  const setTexts = (updater: Text[] | ((prev: Text[]) => Text[])) => {
    const prev = textsRef.current;
    textsRef.current =
      typeof updater === "function" ? (updater as (prev: Text[]) => Text[])(prev) : updater;

    forceUpdate(n => n + 1);
  };

  const setNumbers = (updater: Numb[] | ((prev: Numb[]) => Numb[])) => {
    const prev = numbersRef.current;
    numbersRef.current =
      typeof updater === "function" ? (updater as (prev: Numb[]) => Numb[])(prev) : updater;

    forceUpdate(n => n + 1);
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
    setSelection({ type: selection.type, index: 0 });
    if (customizations?.find((e) => e.id === customization.id)) {
      if (customization[sideName].logos)
        logosRef.current = customization[sideName].logos as Logo[];
      if (customization[sideName].texts)
        textsRef.current = customization[sideName].texts as Text[];
      if (customization[sideName].numbers)
        numbersRef.current = customization[sideName].numbers as Numb[];
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
        logos={logosRef.current}
        setLogos={setLogos}
        texts={textsRef.current}
        setTexts={setTexts}
        handleTextChange={handleTextChange}
        numbers={numbersRef.current}
        setNumbers={setNumbers}
        handleNumberChange={handleNumberChange}
        saveDataToLocal={saveDataToLocal}
        setActualize={setActualize}
      />
      {/* Buttons sides, Logo, Text, Number */}
      <Grid
        container
        spacing={0}
        sx={{
          width: "100%",
          margin: "16px",
          paddingBottom: "16px",
          borderBottom: "1px solid",
          flexWrap: "nowrap",
        }}
      >
        {/* Button sides */}
        <Box position="relative" id="toggleButton">
          <Button
            onClick={togglePanel}
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1, // rounded-md
              border: "1px solid transparent",
              backgroundColor: "neutral.main",
              padding: "6px 16px",
              fontSize: "1rem", // text-base
              fontWeight: 500,
              color: "white",
              "&:hover": { backgroundColor: "neutral.main", opacity: 0.8 },
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 2px rgba(logo.main, 0.8)",
              },
            }}
          >
            <AutorenewOutlined
              sx={{ height: 24, width: "auto" }}
              aria-hidden="true"
            />
          </Button>

          {step4 && (
            <Box
              position="absolute"
              left="50%"
              top="100%"
              mt={2}
              zIndex={40}
              sx={{ transform: "translateX(-50%)" }}
            >
              <ContainerInfoBox
                stepp={4}
                arrowPosition="top"
                className="w-full lg:w-screen"
                visible={{ step1, step2, step3, step4, step5 }}
                setVisible={{
                  setStep1,
                  setStep2,
                  setStep3,
                  setStep4,
                  setStep5,
                }}
              />
            </Box>
          )}
        </Box>
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
                width: { xs: "64px", sm: "112px", md: "64px", lg: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                backgroundColor: selection.type === "Logo" ? "black" : "white",
                color: selection.type === "Logo" ? "white" : "black",
                border: "1px solid black",
                // Elimina el hover rojo
                "&:hover": {
                  backgroundColor: selection.type === "Logo" ? "black" : "white",
                  color: selection.type === "Logo" ? "white" : "black",
                  opacity: 0.8,
                },
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
                width: { xs: "64px", sm: "112px", md: "64px", lg: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                backgroundColor: selection.type === "Text" ? "black" : "white",
                color: selection.type === "Text" ? "white" : "black",
                border: "1px solid black",
                // Elimina el hover rojo
                "&:hover": {
                  backgroundColor: selection.type === "Text" ? "black" : "white",
                  color: selection.type === "Text" ? "white" : "black",
                  opacity: 0.8,
                },
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
                width: { xs: "64px", sm: "112px", md: "64px", lg: "112px" },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                textTransform: "none",
                backgroundColor: selection.type === "Number" ? "black" : "white",
                color: selection.type === "Number" ? "white" : "black",
                border: "1px solid black",
                // Elimina el hover rojo
                "&:hover": {
                  backgroundColor: selection.type === "Number" ? "black" : "white",
                  color: selection.type === "Number" ? "white" : "black",
                  opacity: 0.8,
                },
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
        logos={logosRef.current}
        setLogos={setLogos}
        texts={textsRef.current}
        setTexts={setTexts}
        handleTextChange={handleTextChange}
        numbers={numbersRef.current}
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
