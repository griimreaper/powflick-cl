import { Box } from "@mui/material";
import React, { useState, useRef, LegacyRef, useEffect, Ref, RefObject } from "react";
import Moveable from "react-moveable";

interface ManipulableContainerProps {
  parentRef: RefObject<HTMLDivElement>;
  index: number;
  selection: {
    type: string;
    index: number;
  };
  setSelection: Function;
  onMouseDown: (e: any, index: number) => void;
  sizeChange: Function;
  handleChange?: Function;
  onTouchStart: (e: any, index: number) => void;
  handleRotation: (type: string, rotate: number, index: number) => void;
  each: {
    type?: "Logo" | "Text" | "Number";
    text?: string;
    font?: string;
    position: { x: number; y: number };
    size?: number;
    color?: string;
    logoUrl?: string;
    rotate: number;
  };
}

const ManipulableContainer: React.FC<ManipulableContainerProps> = ({
  parentRef,
  onMouseDown,
  setSelection,
  selection,
  onTouchStart,
  index,
  each,
  handleChange,
  handleRotation,
  sizeChange,
}) => {
  const [rotation, setRotation] = useState(each.rotate); // Usar el valor inicial de rotación
  const [isDragging, setIsDragging] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isSelected, setIsSelected] = useState(selection.index === index && selection.type === each.type); // Estado para controlar la visibilidad de Moveable
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLInputElement | null>(null);
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);

  // Calcular el ancho del input basado en el texto
  useEffect(() => {
    if (hiddenDivRef.current) {
      hiddenDivRef.current.innerText = each.text as string;
      hiddenDivRef.current.style.fontFamily = each.font as string;
      hiddenDivRef.current.style.fontSize = `${each.size}px`;
      setInputWidth(hiddenDivRef.current.offsetWidth);
    }
  }, [each.text, each.font, each.size]);

  // Sincroniza el estado de rotación con el valor de `each.rotate`
  useEffect(() => {
    setRotation(each.rotate); // Asegurarse de mantener la rotación actualizada
  }, [each.rotate]);

  // Aplicar rotación en el DOM
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = `rotate(${rotation}deg)`; // Aplicar la rotación al elemento DOM
    }
  }, [rotation]); // Ejecuta cuando la rotación cambia

  // Necesario para que el input se seleccione y muestre el editor para editar el elemento
  useEffect(() => {
    setIsSelected(
      selection.index === index &&
      selection.type === each.type
    )
  }, [selection]);

  useEffect(() => {
  }, [each.text])

  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResize = (e: any) => {
    if (each.type === "Logo") {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      sizeChange(e.width, index);
    } else {
      if (each.text?.length! > 1) {
        const newFontSize = Math.min(e.width, e.height);
        sizeChange(newFontSize, index);
      } else {
        sizeChange(e.height, index);
      }
    }
  };

  const handleRotate = (e: any) => {
    const newRotation = e.rotate;
    setRotation(newRotation);
    handleRotation(each.type as string, newRotation, index);
    if (e.target) {
      e.target.style.transform = `rotate(${newRotation}deg)`;
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        zIndex: 0,
        left: each.position.x,
        top: each.position.y,
      }}
    >
      <Box
        ref={hiddenDivRef}
        sx={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'pre',
          fontFamily: each.font,
        }}
      />

      {isSelected && (
        <Moveable
          target={elementRef.current}
          useMutationObserver
          useResizeObserver
          resizable
          renderDirections={["sw", "nw", "ne", "se"]}
          rotatable
          pinchable
          origin={false}
          checkInput={true}
          viewContainer={parentRef.current}
          dragContainer={parentRef.current}
          rootContainer={parentRef.current}
          keepRatio={true}
          onResize={(e) => {
            handleResize(e);
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
          }}
          onRotate={handleRotate}
        />
      )}
      {each.type !== "Logo" && handleChange !== undefined && (
        <input
          className="focus:outline-none focus:ring-2 focus:ring-transparent text-center p-0"
          ref={elementRef as LegacyRef<HTMLInputElement>}
          style={{
            background: "transparent",
            border: "none",
            fontFamily: each.font,
            userSelect: "none",
            color: each.color,
            cursor:
              isDragging && selection.index === index ? "grabbing" : "grab",
            fontSize: `${each.size}px`,
            width: `${inputWidth}px`,
            touchAction: "none",
          }}
          value={each.text}
          onTouchStart={(e) => {
            onTouchStart(e, index)
            setIsSelected(true);
            setIsDragging(true);
            setSelection({ type: each.type, index })
          }}
          onMouseUp={() => { setIsDragging(false), elementRef.current?.focus() }}
          onChange={(e) => handleChange(e, index)}
          onMouseDown={(e) => {
            onMouseDown(e, index);
            setIsSelected(true);
            setIsDragging(true);
            setSelection({ type: each.type, index })
          }}
        />
      )}
      {each.type === "Logo" && each.logoUrl && (
        <div ref={elementRef}>
          <img
            src={each.logoUrl}
            style={{
              width: `${each.size}px`,
              height: "auto",
              cursor:
                isDragging && selection.index === index ? "grabbing" : "grab",
              touchAction: "none",
            }}
            onMouseDown={(e) => {
              onMouseDown(e, index);
              setIsDragging(true);
              setIsSelected(true);
              setSelection({ type: each.type, index })
            }}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={(e) => {
              onTouchStart(e, index)
              setIsSelected(true);
              setIsDragging(true);
              setSelection({ type: each.type, index })
            }}
            draggable="false"
          />
        </div>
      )}
    </Box>
  );
};

export default ManipulableContainer;
