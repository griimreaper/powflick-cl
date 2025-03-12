import { Box } from "@mui/material";
import React, { useState, useRef, LegacyRef, useEffect, Ref, RefObject } from "react";
import Moveable, { OnEvent, OnPinch, PinchableEvents, PinchableProps } from "react-moveable";
import "./MoveableComponent.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { ArrowDropDown, ArrowDropUp, ArrowLeft, ArrowRight, DeleteForever, OpenInFull, RedoOutlined } from "@mui/icons-material";

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
  const [rotation, setRotation] = useState(each.rotate); // Usar el valor inicial de rotación
  const [isDragging, setIsDragging] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isSelected, setIsSelected] = useState(selection.index === index && selection.type === each.type); // Estado para controlar la visibilidad de Moveable
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLInputElement | null>(null);
  const BoxRef = useRef<HTMLDivElement | null>(null);
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const [imageHeight, setImageHeight] = useState(0);
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
    if (BoxRef.current) {
      BoxRef.current.style.transform = `rotate(${rotation}deg)`; // Aplicar la rotación al elemento DOM
    }
    if (elementRef.current) {
      elementRef.current.style.transform = `rotate(${rotation}deg)`; // Aplicar la rotación al elemento DOM
    }
  }, [rotation, isSelected]); // Ejecuta cuando la rotación cambia

  // Necesario para que el input se seleccione y muestre el editor para editar el elemento
  useEffect(() => {
    setIsSelected(
      selection.index === index &&
      selection.type === each.type
    )
  }, [selection]);

  useEffect(() => {
  }, [each.text])

  useEffect(() => {
    if (!elementRef.current) return;

    // Crear ResizeObserver para detectar cambios en el tamaño de la imagen
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setImageHeight(entry.contentRect.height); // Actualiza la altura de la imagen
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


  const handlePinch = (e: OnPinch) => {
    const newRotate = e.currentTarget.rotation
    const newSize = e.currentTarget.scale
    // Actualizamos la escala y rotación
    setRotation(newRotate);
    handleResize(newSize)

    // Puedes implementar la lógica de cambio en el estado local o persistir los datos.
    console.log('Pinch event:', { newRotate, newSize });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
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
          pointerEvents: "none", // Deshabilita los eventos en el fondo
        }}
      />

      {isSelected && (
        <>
          <Moveable
            className="custom-moveable"
            target={elementRef.current}
            useMutationObserver
            useResizeObserver
            resizable
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
              const minWidth = 80;  // Ancho mínimo en píxeles
              const maxWidth = 300;  // Ancho máximo en píxeles
              const minHeight = 30; // Alto mínimo en píxeles
              const maxHeight = 300; // Alto máximo en píxeles

              const newWidth = Math.max(minWidth, Math.min(e.width, maxWidth));
              const newHeight = Math.max(minHeight, Math.min(e.height, maxHeight));

              e.target.style.width = `${newWidth}px`;
              e.target.style.height = `${newHeight}px`;
            }}
            onRotate={handleRotate}
            onPinchStart={(e) => console.log('Pinch start event', e)}
            onPinch={(e: OnPinch) => handlePinch(e)}
          />
          {each.size ?
            (<Box ref={BoxRef} width={each.type === 'Logo' ? `${each.size}px` : `${inputWidth}px`} height={each.type === 'Logo' ? `${imageHeight}px` : `${each.size}px`} position={"absolute"} >

              <ArrowLeft
                sx={{
                  position: "absolute",
                  left: each.type === "Logo" ? `-${each.size * 0.24}px` : `-${each.size * 0.7}px`, // Ajusta según el tamaño de tu manejador
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: each.type === "Logo" ? `${each.size / 2.5}px` : `${each.size * 1.2}px`,
                  cursor: "pointer",
                  color: "primary.main",
                }}
              />
              <ArrowRight
                sx={{
                  position: "absolute",
                  right: each.type === "Logo" ? `-${each.size * 0.24}px` : `-${each.size * 0.7}px`, // Ajusta según el tamaño de tu manejador
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: each.type === "Logo" ? `${each.size / 2.5}px` : `${each.size * 1.2}px`,
                  cursor: "pointer",
                  color: "primary.main",
                }}
              />
              <ArrowDropDown
                sx={{
                  position: "absolute",
                  bottom: each.type === "Logo" ? `-${each.size * 0.24}px` : `-${each.size * 0.7}px`, // Ajusta según el tamaño de tu manejador
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: each.type === "Logo" ? `${each.size / 2.5}px` : `${each.size * 1.2}px`,
                  cursor: "pointer",
                  color: "primary.main",
                }}
              />
              <ArrowDropUp
                sx={{
                  position: "absolute",
                  top: each.type === "Logo" ? `-${each.size * 0.24}px` : `-${each.size * 0.7}px`, // Ajusta según el tamaño de tu manejador
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: each.type === "Logo" ? `${each.size / 2.5}px` : `${each.size * 1.2}px`,
                  cursor: "pointer",
                  color: "primary.main",
                }}
              />
              <Box
                display={"flex"}
                position={"absolute"}
                top={"-50px"}
                justifyContent={"center"}
                width={"100%"}>
                <RedoOutlined
                  sx={{
                    position: "relative",
                    color: "white",
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                    backgroundColor: "primary.main",
                    borderRadius: "100%",
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                position={"absolute"}
                bottom={"-50px"}
                justifyContent={"space-between"}
                width={"100%"}>
                <Box
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
                    backgroundColor: "primary.main",
                    borderRadius: "100%",
                  }}
                >x2</Box>
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
                    backgroundColor: "primary.main",
                    borderRadius: "100%",
                  }}
                />
                <OpenInFull
                  sx={{
                    right: "0%",
                    color: "white",
                    cursor: "sw-resize",
                    width: "25px",
                    height: "25px",
                    backgroundColor: "primary.main",
                    borderRadius: "100%",
                  }}
                />
              </Box>
            </Box>
            ) : (<></>)
          }
        </>
      )}
      {each.type !== "Logo" && handleChange !== undefined ? (
        <input
          ref={elementRef as LegacyRef<HTMLInputElement>}
          style={{
            background: "transparent",
            border: "none",
            fontFamily: each.font,
            userSelect: "none",
            outline: "none",
            color: each.color,
            cursor:
              isDragging && selection.index === index ? "grabbing" : "grab",
            fontSize: `${each.size}px`,
            width: `${inputWidth + 1}px`,
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
      ) : <></>}
      {each.type === "Logo" && each.logoUrl && (
        <div ref={elementRef} style={{ height: "auto" }}>
          <img
            src={each.logoUrl}
            style={{
              border: isSelected ? "" : "2px dashed rgba(9, 9, 9, 0.5)",
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
