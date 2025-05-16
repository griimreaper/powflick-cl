import { Box } from "@mui/material";
import React, { useState, useRef, LegacyRef, useEffect, Ref, RefObject } from "react";
import Moveable, { OnEvent, OnPinch, PinchableEvents, PinchableProps } from "react-moveable"; import "./MoveableComponent.css";
import "./MoveableComponent.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { ArrowDropDown, ArrowDropUp, ArrowLeft, ArrowRight, DeleteForever, Height, OpenInFull, RedoOutlined } from "@mui/icons-material";
import { flushSync } from "react-dom";


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
  duplicateElement: (e: string, index: number) => void;
  deleteElement: (e: string, index: number) => void;
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
  deleteElement,
  duplicateElement,
  sizeChange,
}) => {
  const rotationRef = useRef(each.rotate);
  const isDraggingRef = useRef(false);
  const inputWidthRef = useRef<number>(0);
  const inputHeigthRef = useRef<number>(0);
  const isSelectedRef = useRef(selection.index === index && selection.type === each.type);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLInputElement | null>(null);
  const BoxRef = useRef<HTMLDivElement | null>(null);
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const imageHeightRef = useRef(0);

  // Calcular el ancho del input basado en el texto
  useEffect(() => {
    if (hiddenDivRef.current) {
      hiddenDivRef.current.innerText = each.text as string;
      hiddenDivRef.current.style.fontFamily = each.font as string;
      hiddenDivRef.current.style.fontSize = `${each.size}px`;
      inputWidthRef.current = hiddenDivRef.current.offsetWidth + 20;
    }
  }, [each.text, each.font, each.size]);

  // Sincroniza el estado de rotación con el valor de `each.rotate`
  useEffect(() => {
    rotationRef.current = each.rotate; // Asegurarse de mantener la rotación actualizada
  }, [each.rotate]);

  // Aplicar rotación en el DOM
  useEffect(() => {
    if (BoxRef.current) {
      BoxRef.current.style.transform = `rotate(${rotationRef.current}deg)`; // Aplicar la rotación al elemento DOM
    }
    if (elementRef.current) {
      elementRef.current.style.transform = `rotate(${rotationRef.current}deg)`; // Aplicar la rotación al elemento DOM
    }
  }, [rotationRef.current, isSelectedRef.current]); // Ejecuta cuando la rotación cambia

  useEffect(() => {
    if (!elementRef.current) return;

    // Crear ResizeObserver para detectar cambios en el tamaño de la imagen
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        imageHeightRef.current = entry.contentRect.height; // Actualiza la altura de la imagen
      }
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect(); // Limpiar observer al desmontar
  }, []);


  // Manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        isSelectedRef.current = false;
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
      if (each.text?.length! >= 1) {
        const newFontSize = Math.min(
          e.width * 0.7,
          e.height * 0.6
        );
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        sizeChange(newFontSize, index);
      }
    }
  };

  const handleRotate = (e: any) => {
    const newRotation = e.rotate;
    rotationRef.current = newRotation;
    handleRotation(each.type as string, newRotation, index);
    if (e.target) {
      e.target.style.transform = `rotate(${newRotation}deg)`;
    }
  };


  const handlePinch = (e: OnPinch) => {
    const newRotate = e.currentTarget.rotation
    const newSize = e.currentTarget.scale
    // Actualizamos la escala y rotación
    rotationRef.current = newRotate;
    handleResize(newSize)

    // Puedes implementar la lógica de cambio en el estado local o persistir los datos.
    console.log('Pinch event:', { newRotate, newSize });
  };



  return (
    <Box
      ref={containerRef}
      style={{
        position: "absolute",
        zIndex: 0,
        left: each.position.x,
        top: each.position.y,
        pointerEvents: "auto", // Permitir eventos de clic
      }}
    >
      <Box
        ref={hiddenDivRef}
        sx={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'pre',
          fontFamily: each.font,
          fontSize: each.size,
          pointerEvents: "none", // Deshabilita los eventos en el fondo
        }}
      />

      {isSelectedRef.current && (
        <>
          <Moveable
            flushSync={flushSync}
            className="custom-moveable"
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
            }}
            onResizeEnd={({ target }) => {
              const input = target as HTMLInputElement;

              inputHeigthRef.current = input.offsetHeight;
              inputWidthRef.current = input.offsetWidth;
            }}
            onRotate={handleRotate}
            onPinchStart={(e) => console.log('Pinch start event', e)}
            onPinch={(e: OnPinch) => handlePinch(e)}
          />
          {each.size ?
            (<Box ref={BoxRef}
              width={each.type === 'Logo' ? `${each.size}px` : `${inputWidthRef.current}px`}
              height={each.type === 'Logo' ? `${imageHeightRef.current}px` : `${each.size}px`}
              position={"absolute"}
              sx={{
                transform: "translate(-50%, -50%)",
              }}

            >
              <Box
                display={"flex"}
                position={"absolute"}
                top={"-50px"}
                justifyContent={"space-between"}
                width={"100%"}>
                {/* <Box
                  onClick={() => {
                    duplicateElement(each.type as string, index);
                  }}
                  sx={{
                    position: "relative",
                    color: "white",
                    cursor: "pointer",
                    minWidth: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "solid white 2px",
                    backgroundColor: "#44aaff",
                    borderRadius: "100%",
                  }}
                ></Box> */}
                <Box></Box>
                <Box></Box>
                {/* <RedoOutlined
                  sx={{
                    position: "relative",
                    color: "white",
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                    border: "solid white 2px",
                    backgroundColor: "#44aaff",
                    borderRadius: "100%",
                  }}
                /> */}
                <DeleteForever
                  onClick={() => {
                    deleteElement(each.type as string, index);
                  }}
                  sx={{
                    bottom: "-50px", // Ajusta según el tamaño de tu manejador
                    left: "0%",
                    color: "white",
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                    border: "solid white 2px",
                    backgroundColor: "#44aaff",
                    borderRadius: "100%",
                  }}
                />
              </Box>
            </Box>
            ) : (<></>)
          }
        </>
      )}
      {each.type !== "Logo" && handleChange !== undefined && (
        <input
          ref={elementRef as LegacyRef<HTMLInputElement>}

          style={{
            background: "transparent",
            border: 'transparent',
            fontFamily: each.font,
            userSelect: "none",
            color: each.color,
            overflow: 'visible',
            whiteSpace: "nowrap",
            padding: 2,
            cursor:
              isDraggingRef.current && selection.index === index ? "grabbing" : "grab",
            fontSize: `${each.size}px`,
            width: `${inputWidthRef.current}px`,
            height: `${(each.size || 0) * 1.5}px`,
            paddingTop: 10,
            textIndent: '3px', // o el valor que desees
            touchAction: "none",
          }}
          value={each.text}
          onTouchStart={(e) => {
            onTouchStart(e, index)
            e.preventDefault();
            isSelectedRef.current = true;
            isDraggingRef.current = true;
            setSelection({ type: each.type, index })
          }}
          onMouseUp={() => {
            isDraggingRef.current = false,
              elementRef.current?.focus()
          }}
          onChange={(e) => handleChange(e, index)}
          draggable={false}
          onMouseDown={(e) => {
            onMouseDown(e, index);
            e.preventDefault();
            isSelectedRef.current = true;
            isDraggingRef.current = true;
            setSelection({ type: each.type, index })
          }}
        />
      )}
      {each.type === "Logo" && each.logoUrl && (
        <div ref={elementRef} style={{ height: "auto" }}>
          <img
            src={each.logoUrl}
            style={{
              width: `${each.size}px`,
              height: "auto",
              cursor:
                isDraggingRef.current && selection.index === index ? "grabbing" : "grab",
              touchAction: "none",
            }}
            onMouseDown={(e) => {
              onMouseDown(e, index);
              isDraggingRef.current = true;
              isSelectedRef.current = true;
              setSelection({ type: each.type, index })
            }}
            onMouseUp={() => isDraggingRef.current = false}
            onTouchStart={(e) => {
              onTouchStart(e, index)
              isSelectedRef.current = true;
              isDraggingRef.current = true;
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
