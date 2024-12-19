
import React, { useState, useEffect } from "react";
import { CustomizationSides, Logo, Number as Numb, Text } from "models/types";
import ContainerInfoBox from "../Modals/ContainerInfoBox";
import { useCustomizationsStore, useCustomizationStore } from "store/customizations";
import MainContainer from "./MainContainer";
import EditableContainer from "./EditableContainer";
import useHearingEvent from "hooks/hearingEvent";

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

const fonts: { [key: string]: string } = {
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
  const [logos, setLogos] = useState<Logo[]>([
    {
      type: "Logo",
      logoUrl: "",
      logoSize: 100,
      logoPosition: { x: 250, y: 250 },
      logoDragOffset: { x: 0, y: 0 },
      rotate: 0,
    },
  ]);
  const [texts, setTexts] = useState<Text[]>([
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
  const [numbers, setNumbers] = useState<Numb[]>([
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
  const { customization, updateCustomizationAttribute } =
    useCustomizationStore();
  const { list, setCustomizationsInList, setCustomizationInList } =
    useCustomizationsStore();
  const customizations = list.find(
    ({ productId }) => productId === id
  )?.customizations;

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
    const generateText = selection.type ? false : true;
    if (name === 'Text' && !texts.some(t => t.text) && generateText) {
      setTexts(texts.map((t, i) => i === 0 ? t = { ...t, text: 'Insert Text' } : t))
    } else if (name === 'Number' && !numbers.some(t => t.number) && generateText) {
      setNumbers(numbers.map((n, i) => i === 0 ? n = { ...n, number: '0' } : n))
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
        saveDataToLocal();
      }
    }
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
      sessionStorage.removeItem("customization-store");
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

  console.log(texts,'text');
  
  return (
    <div className="flex flex-col items-center w-full">
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
      <div className="grid grid-cols-3 gap-4 w-full m-4 md:text-lg xs:text-sm pb-4 border-b ">
        <div className="relative ">
          <button
            id="logoButton"
            onClick={() => {
              handleShowItem("Logo"), setShowInputsEdit("");
            }}
            className="sm:max-w-xs w-16 mx-auto flex items-center justify-center rounded-md border border-transparent bg-neutral sm:w-28 text-base font-medium text-white hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Logo
          </button>
          {step1 && (
            <div className="absolute left-[20%] lg:left-[35%] transform top-full mt-2 z-40 ">
              <ContainerInfoBox
                stepp={1}
                arrowPosition="topLeft"
                className="w-full lg:w-screen "
                visible={{ step1, step2, step3, step4, step5 }}
                setVisible={{
                  setStep1,
                  setStep2,
                  setStep3,
                  setStep4,
                  setStep5,
                }}
              />
            </div>
          )}
        </div>
        <div className="relative ">
          <button
            onClick={() => {
              handleShowItem("Text"), setShowInputsEdit("");
            }}
            className="sm:max-w-xs w-16 mx-auto flex items-center justify-center rounded-md border border-transparent bg-neutral sm:w-28 text-base font-medium text-white hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Text
          </button>
          {step2 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-40 ">
              <ContainerInfoBox
                stepp={2}
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
            </div>
          )}
        </div>
        <div className="relative " id="numberButton">
          <button
            onClick={() => {
              handleShowItem("Number"), setShowInputsEdit("");
            }}
            className="sm:max-w-xs w-16 mx-auto flex items-center justify-center rounded-md border border-transparent bg-neutral sm:w-28 text-base font-medium text-white hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Number
          </button>
          {step3 && (
            <div className="absolute transform right-[20%] lg:right-[35%] top-full mt-2 z-40 ">
              <ContainerInfoBox
                stepp={3}
                arrowPosition="topRight"
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
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
}
