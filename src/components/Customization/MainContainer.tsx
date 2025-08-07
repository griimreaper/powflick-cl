import React, { useRef } from "react";
import { Logo, Number, Text } from "models/types";
import useFlag from "hooks/useFlag";
import ManipulableContainer from "./ManipulableContainer";
import { Box, Icon } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useCustomizationStore } from "store/customizationStore";

interface MainContainerProps {
  selection: {
    type: "Text" | "Number" | "Logo" | "";
    index: number;
  };
  setSelection: Function;
  image: string;
  logos: Logo[] & any;
  setLogos: Function;
  texts: Text[] & any;
  setTexts: Function;
  handleTextChange: Function;
  numbers: Number[] & any;
  setNumbers: Function;
  handleNumberChange: Function;
  saveDataToLocal: () => void;
  setActualize: () => void;
}

function MainContainer({
  selection,
  setSelection,
  image,
  logos,
  setLogos,
  texts,
  setTexts,
  handleTextChange,
  numbers,
  setNumbers,
  handleNumberChange,
  saveDataToLocal,
  setActualize,
}: MainContainerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDraggingLogo, setIsDraggingLogo] = useFlag();
  const [isDraggingText, setIsDraggingText] = useFlag();
  const [isDraggingNumber, setIsDraggingNumber] = useFlag();

  const { setShowCustomization } = useCustomizationStore();
  // Padding interno para evitar que el texto/número se corte
  const PADDING = 25;

  // Función para medir el ancho real del texto con la fuente y tamaño actual
  function getTextWidth(text: string, fontSize: number, fontFamily: string = "Arial") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * fontSize; // fallback
    context.font = `${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  }

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const panelRect = panelRef.current?.getBoundingClientRect();
    const { clientX, clientY } = event;
    if (panelRect) {
      if (isDraggingLogo) {
        const offsetX =
          clientX - panelRect.left - logos[selection.index].logoDragOffset.x;
        const offsetY =
          clientY - panelRect.top - logos[selection.index].logoDragOffset.y;
        const maxX = panelRect.width - logos[selection.index].logoSize;
        const maxY = panelRect.height - logos[selection.index].logoSize;
        const constrainedX = Math.max(0, Math.min(maxX, offsetX));
        const constrainedY = Math.max(0, Math.min(maxY, offsetY));
        setLogos(
          logos.map((l: Logo, i: number) =>
            i === selection.index
              ? { ...l, logoPosition: { x: constrainedX, y: constrainedY } }
              : l
          )
        );
      } else if (isDraggingText) {
        const offsetX =
          clientX - panelRect.left - texts[selection.index].textDragOffset.x;
        const offsetY =
          clientY - panelRect.top - texts[selection.index].textDragOffset.y;
        const textWidth = getTextWidth(
          texts[selection.index].text,
          texts[selection.index].textSize,
          texts[selection.index].font
        );
        const maxX = panelRect.width - textWidth - PADDING;
        const maxY = panelRect.height - texts[selection.index].textSize - PADDING;
        const constrainedX = Math.max(PADDING, Math.min(maxX, offsetX));
        const constrainedY = Math.max(PADDING, Math.min(maxY, offsetY));
        setTexts(
          texts.map((t: Text, i: number) =>
            i === selection.index
              ? { ...t, textPosition: { x: constrainedX, y: constrainedY } }
              : t
          )
        );
      } else if (isDraggingNumber) {
        const offsetX =
          clientX -
          panelRect.left -
          numbers[selection.index].numberDragOffset.x;
        const offsetY =
          clientY - panelRect.top - numbers[selection.index].numberDragOffset.y;
        const numberWidth = getTextWidth(
          numbers[selection.index].number,
          numbers[selection.index].numberSize,
          numbers[selection.index].font
        );
        const maxX = panelRect.width - numberWidth - PADDING;
        const maxY = panelRect.height - numbers[selection.index].numberSize - PADDING;
        const constrainedX = Math.max(PADDING, Math.min(maxX, offsetX));
        const constrainedY = Math.max(PADDING, Math.min(maxY, offsetY));
        setNumbers(
          numbers.map((n: Number, i: number) =>
            i === selection.index
              ? { ...n, numberPosition: { x: constrainedX, y: constrainedY } }
              : n
          )
        );
      }
    }
    setActualize();
  };

  const handleLogoDragStart = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setIsDraggingLogo(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Logo", index });
      const { left, top } = panelRect;
      const offsetX = event.clientX - left - logos[index].logoPosition.x;
      const offsetY = event.clientY - top - logos[index].logoPosition.y;
      setLogos(
        logos.map((l: Logo, i: number) =>
          i === index
            ? {
              ...l,
              logoDragOffset: { x: offsetX, y: offsetY },
              logoPosition: {
                x: logos[index].logoPosition.x,
                y: logos[index].logoPosition.y,
              },
            }
            : l
        )
      );
      setActualize();
    }
  };

  const handleLogoTouchStart = (
    event: React.TouchEvent<HTMLImageElement>,
    index: number
  ) => {
    setIsDraggingLogo(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Logo", index });
      const { left, top } = panelRect;
      const touch = event.touches[0]; // Obtener el primer toque
      const offsetX = touch.clientX - left - logos[index].logoPosition.x;
      const offsetY = touch.clientY - top - logos[index].logoPosition.y;
      setLogos(
        logos.map((l: Logo, i: number) =>
          i === index
            ? {
              ...l,
              logoDragOffset: { x: offsetX, y: offsetY },
              logoPosition: {
                x: logos[index].logoPosition.x,
                y: logos[index].logoPosition.y,
              },
            }
            : l
        )
      );
      setActualize();
    }
  };

  const handleTextDragStart = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setIsDraggingText(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Text", index });
      const { left, top } = panelRect;
      const offsetX = event.clientX - left - texts[index].textPosition.x;
      const offsetY = event.clientY - top - texts[index].textPosition.y;
      setTexts(
        texts.map((t: Text, i: number) =>
          i === index
            ? {
              ...t,
              textDragOffset: { x: offsetX, y: offsetY },
              textPosition: {
                x: texts[index].textPosition.x,
                y: texts[index].textPosition.y,
              },
            }
            : t
        )
      );
      setActualize();
    }
  };

  const handleTextTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    setIsDraggingText(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Text", index });
      const { left, top } = panelRect;
      const touch = event.touches[0]; // Obtener el primer toque
      const offsetX = touch.clientX - left - texts[index].textPosition.x;
      const offsetY = touch.clientY - top - texts[index].textPosition.y;
      setTexts(
        texts.map((t: Text, i: number) =>
          i === index
            ? {
              ...t,
              textDragOffset: { x: offsetX, y: offsetY },
              textPosition: {
                x: texts[index].textPosition.x,
                y: texts[index].textPosition.y,
              },
            }
            : t
        )
      );
      setActualize();
    }
  };

  const handleNumberDragStart = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setIsDraggingNumber(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Number", index });
      const { left, top } = panelRect;
      const offsetX = event.clientX - left - numbers[index].numberPosition.x;
      const offsetY = event.clientY - top - numbers[index].numberPosition.y;
      setNumbers(
        numbers.map((n: Number, i: number) =>
          i === index
            ? {
              ...n,
              numberDragOffset: { x: offsetX, y: offsetY },
              numberPosition: {
                x: numbers[index].numberPosition.x,
                y: numbers[index].numberPosition.y,
              },
            }
            : n
        )
      );
      setActualize();
    }
  };

  const handleNumberTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    setIsDraggingNumber(true);
    const panelRect = panelRef.current?.getBoundingClientRect();
    if (panelRect) {
      setSelection({ type: "Number", index });
      const { left, top } = panelRect;
      const touch = event.touches[0]; // Obtener el primer toque
      const offsetX = touch.clientX - left - numbers[index].numberPosition.x;
      const offsetY = touch.clientY - top - numbers[index].numberPosition.y;
      setNumbers(
        numbers.map((n: Number, i: number) =>
          i === index
            ? {
              ...n,
              numberDragOffset: { x: offsetX, y: offsetY },
              numberPosition: {
                x: numbers[index].numberPosition.x,
                y: numbers[index].numberPosition.y,
              },
            }
            : n
        )
      );
      setActualize();
    }
  };

  const handleDragMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    const panelRect = panelRef.current?.getBoundingClientRect();
    const touch = event.touches[0];
    const { clientX, clientY } = touch;
    if (panelRect) {
      if (isDraggingLogo) {
        const offsetX =
          clientX - panelRect.left - logos[selection.index].logoDragOffset.x;
        const offsetY =
          clientY - panelRect.top - logos[selection.index].logoDragOffset.y;
        const maxX = panelRect.width - logos[selection.index].logoSize;
        const maxY = panelRect.height - logos[selection.index].logoSize;
        const constrainedX = Math.max(0, Math.min(maxX, offsetX));
        const constrainedY = Math.max(0, Math.min(maxY, offsetY));
        setLogos(
          logos.map((l: Logo, i: number) =>
            i === selection.index
              ? { ...l, logoPosition: { x: constrainedX, y: constrainedY } }
              : l
          )
        );
      } else if (isDraggingText) {
        const offsetX =
          clientX - panelRect.left - texts[selection.index].textDragOffset.x;
        const offsetY =
          clientY - panelRect.top - texts[selection.index].textDragOffset.y;
        const textWidth = getTextWidth(
          texts[selection.index].text,
          texts[selection.index].textSize,
          texts[selection.index].font
        );
        const maxX = panelRect.width - textWidth - PADDING;
        const maxY = panelRect.height - texts[selection.index].textSize - PADDING;
        const constrainedX = Math.max(PADDING, Math.min(maxX, offsetX));
        const constrainedY = Math.max(PADDING, Math.min(maxY, offsetY));
        setTexts(
          texts.map((t: Text, i: number) =>
            i === selection.index
              ? { ...t, textPosition: { x: constrainedX, y: constrainedY } }
              : t
          )
        );
      } else if (isDraggingNumber) {
        const offsetX =
          clientX -
          panelRect.left -
          numbers[selection.index].numberDragOffset.x;
        const offsetY =
          clientY - panelRect.top - numbers[selection.index].numberDragOffset.y;
        const numberWidth = getTextWidth(
          numbers[selection.index].number,
          numbers[selection.index].numberSize,
          numbers[selection.index].font
        );
        const maxX = panelRect.width - numberWidth - PADDING;
        const maxY = panelRect.height - numbers[selection.index].numberSize - PADDING;
        const constrainedX = Math.max(PADDING, Math.min(maxX, offsetX));
        const constrainedY = Math.max(PADDING, Math.min(maxY, offsetY));
        setNumbers(
          numbers.map((n: Number, i: number) =>
            i === selection.index
              ? { ...n, numberPosition: { x: constrainedX, y: constrainedY } }
              : n
          )
        );
      }
    }
    setActualize();
  };

  const handleRotation = (type: string, rotate: number, index: number) => {
    if (type === "Logo") {
      setLogos(
        logos.map((l: Logo, i: number) => (i === index ? { ...l, rotate } : l))
      );
    } else if (type === "Text") {
      setTexts(
        texts.map((t: Text, i: number) => (i === index ? { ...t, rotate } : t))
      );
    } else {
      setNumbers(
        numbers.map((n: Number, i: number) =>
          i === index ? { ...n, rotate } : n
        )
      );
    }
    saveDataToLocal();
    setActualize();
  };

  const handleDragEnd = () => {
    setIsDraggingLogo(false);
    setIsDraggingText(false);
    setIsDraggingNumber(false);
    saveDataToLocal();
  };
  const handleTextSizeChanger = (textSize: number, index: number) => {
    setTexts(
      texts.map((t: Text, i: number) => (i === index ? { ...t, textSize } : t))
    );
    saveDataToLocal();
    setActualize();
  };

  const handleNumberSizeChanger = (numberSize: number, index: number) => {
    setNumbers(
      numbers.map((n: Number, i: number) =>
        i === index ? { ...n, numberSize } : n
      )
    );
    saveDataToLocal();
    setActualize();
  };

  const handleLogoSizeChanger = (logoSize: number, index: number) => {
    setLogos(
      logos.map((l: Logo, i: number) => (i === index ? { ...l, logoSize } : l))
    );
    saveDataToLocal();
    setActualize();
  };

  const deleteElement = (type: string, index: number) => {
    if (type === "Logo") {
      setLogos((prevLogos: any) => prevLogos.filter((_: any, i: number) => i !== index));
    } else if (type === "Text") {
      setTexts((prevTexts: any) => prevTexts.filter((_: any, i: number) => i !== index));
    } else if (type === "Number") {
      setNumbers((prevNumbers: any) => prevNumbers.filter((_: any, i: number) => i !== index));
    }

    setSelection({ type: "", index: 0 });
    saveDataToLocal();
    setActualize();
  };

  const duplicateElement = (type: string, index: number) => {
    if (type === "Logo") {
      setLogos((prevLogos: any) => {
        const newLogos = [...prevLogos];
        newLogos.splice(index + 1, 0, prevLogos[index]); // Inserta el duplicado después del original
        return newLogos;
      });
    } else if (type === "Text") {
      setTexts((prevTexts: any) => {
        const newTexts = [...prevTexts];
        newTexts.splice(index + 1, 0, prevTexts[index]);
        return newTexts;
      });
    } else if (type === "Number") {
      setNumbers((prevNumbers: any) => {
        const newNumbers = [...prevNumbers];
        newNumbers.splice(index + 1, 0, prevNumbers[index]);
        return newNumbers;
      });
    }

    setSelection({ type, index: index + 1 }); // Selecciona el nuevo duplicado
    saveDataToLocal();
    setActualize();
  };

  console.log(texts);
  

  return (
    <Box sx={{ width: "full", justifyContent: "center", display: "flex" }}>
      <Box
        sx={{
          width: "full",
          justifyContent: "center",
          display: { xs: "flex", md: "none" },
          position: "relative",  // <- agregado para que el absolute funcione respecto a este contenedor
        }}
      >
        <Icon
          sx={{
            cursor: "pointer",
            backgroundColor: "#ca0b0b",
            borderRadius: "50%",
            color: "white",
            position: "absolute",
            left: '22rem',       // ajusta este valor para ubicarlo horizontalmente
            top: 16,         // importante para posicionarlo verticalmente
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            zIndex: 2,
          }}
          onClick={() => setShowCustomization(false)}
        >
          <CloseOutlined />
        </Icon>
      </Box>
      <Box
        ref={panelRef}
        id="customization-panel"
        sx={{
          position: "relative",
          width: "500px",
          height: "500px",
          overflow: "hidden",
          justifyContent: "center",
        }}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchMove={handleDragMoveTouch}
        onTouchEnd={handleDragEnd}
      >
        <Box
          component="img"
          src={image}
          draggable={false}
          sx={{
            borderRadius: "50%",
            position: "relative",
            width: "100%",
            height: "auto",
          }}
        />

        {logos &&
          logos.map(
            (
              { logoPosition, logoSize, logoUrl, rotate }: Logo,
              index: number
            ) =>
              logoUrl && (
                <ManipulableContainer // Componente para manejar la ubicacion, tamaño, y rotacion de cada elemento
                  parentRef={panelRef}
                  key={index}
                  index={index}
                  selection={selection}
                  setSelection={setSelection}
                  onMouseDown={(e) => handleLogoDragStart(e, index)}
                  onTouchStart={(e) => handleLogoTouchStart(e, index)}
                  sizeChange={handleLogoSizeChanger}
                  handleRotation={handleRotation}
                  deleteElement={deleteElement}
                  duplicateElement={duplicateElement}
                  each={{
                    position: logoPosition,
                    size: logoSize,
                    logoUrl,
                    rotate,
                    type: "Logo",
                  }}
                />
              )
          )}
        {texts &&
          texts.map(
            (
              { font, text, textColor, textPosition, textSize, rotate }: Text,
              index: number
            ) => (
              <ManipulableContainer
                parentRef={panelRef}
                key={index}
                index={index}
                selection={selection}
                setSelection={setSelection}
                handleChange={handleTextChange}
                onMouseDown={(e) => handleTextDragStart(e, index)}
                onTouchStart={(e) => handleTextTouchStart(e, index)}
                sizeChange={handleTextSizeChanger}
                handleRotation={handleRotation}
                deleteElement={deleteElement}
                duplicateElement={duplicateElement}
                each={{
                  text: text,
                  font,
                  position: textPosition,
                  color: textColor,
                  size: textSize,
                  rotate,
                  type: "Text",
                }}
              />
            )
          )}
        {numbers &&
          numbers.map(
            (
              {
                font,
                number,
                numberColor,
                numberPosition,
                numberSize,
                rotate,
              }: Number,
              index: number
            ) => (
              <ManipulableContainer
                parentRef={panelRef}
                key={index}
                index={index}
                selection={selection}
                setSelection={setSelection}
                handleChange={handleNumberChange}
                onMouseDown={(e) => handleNumberDragStart(e, index)}
                onTouchStart={(e) => handleNumberTouchStart(e, index)}
                sizeChange={handleNumberSizeChanger}
                handleRotation={handleRotation}
                deleteElement={deleteElement}
                duplicateElement={duplicateElement}
                each={{
                  font,
                  text: number,
                  position: numberPosition,
                  color: numberColor,
                  size: numberSize,
                  rotate,
                  type: "Number",
                }}
              />
            )
          )}
      </Box>
    </Box>
  );
}

export default MainContainer;
