import { Add, ChevronRightOutlined, Close, ErrorOutline, Remove } from "@mui/icons-material";
import ContainerInfoBox from "components/Modals/ContainerInfoBox";
import useFlag from "hooks/useFlag";
import { Customization, ProductDB } from "models/types";
import React, { useEffect, useRef, useState } from "react";
import { getPDF } from "services/customization";
import {
  useCustomizationStore,
} from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import { showSuccessAlert } from "utils/alerts";
import PanelSides from "./panelSides";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomizationDetails from "./CustomizationDetails";
import TeamDialogTrigger from "./TeamDialog";
// import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface CustomizationProps {
  frontImage: string | undefined;
  backImage: string | undefined;
  product: ProductDB;
  counter: number;
  productId: string;
  setCounter: Function;
  increment: () => void;
  decrement: () => void;
  handleCustomizationClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Customizations(props: CustomizationProps) {
  const [step1, setStep1] = useFlag();
  const [step2, setStep2] = useFlag();
  const [step3, setStep3] = useFlag();
  const [step4, setStep4] = useFlag();
  const [step5, setStep5] = useFlag();

  const { frontImage, backImage, product, counter, productId, setCounter, increment, decrement } =
    props;
  const [showFrontPanel, setShowFrontPanel] = useFlag();
  const [selectedCustomization, setSelectedCustomization] = useState<
    number | null
  >(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const customizationModalRef = useRef<HTMLDivElement>(null);
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );
  let { customization, setCustomization, clearCustomization } =
    useCustomizationStore();
  let { list, removeCustomizationById } = useCustomizationsStore();
  const customizations = list.find(
    (p) => productId === p.productId
  )?.customizations;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        customizationModalRef.current &&
        !customizationModalRef.current.contains(event.target as Node)
      ) {
        setSelectedCustomization(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCustomizationClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedCustomization(index);
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const top = rect.top + scrollTop;
    setModalPosition({ top, left: rect.left - 1 });
  };

  // Función para alternar entre mostrar el panel frontal y el panel posterior
  const togglePanel = () => {
    setShowFrontPanel(!showFrontPanel);
  };

  const ViewCustomization = async (
    customization: Customization,
    productId: string
  ) => {
    try {
      // Inicia el loader para el producto específico
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [productId]: true,
      }));

      const pdf = await getPDF(product, customization);
      const uint8Array = new Uint8Array(pdf);
      const pdfUrl = URL.createObjectURL(
        new Blob([uint8Array], { type: "application/pdf" })
      );

      const windowFeatures =
        "width=800,height=600,menubar=yes,toolbar=yes,scrollbars=yes";
      window.open(pdfUrl, "_blank", windowFeatures);

      // Espera un momento antes de detener el loader para dar tiempo a que se abra la nueva pestaña
      setTimeout(() => {
        setLoadingState((prevLoadingState) => ({
          ...prevLoadingState,
          [productId]: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [productId]: false,
      }));
    }
  };

  const handleEditCustomization = (customization: Customization) => {
    let frontSide = localStorage.getItem("frontSide");
    let backSide = localStorage.getItem("backSide");

    if (frontSide) {
      localStorage.removeItem("frontSide");
      localStorage.setItem(
        "frontSide",
        JSON.stringify(customization.frontSide)
      );
    }
    if (backSide) {
      localStorage.removeItem("backSide");
      localStorage.setItem("backSide", JSON.stringify(customization.backSide));
    }

    setCustomization(customization);
  };

  const handleArrowEditCustomization = (direction: "prev" | "next") => {
    const index = Number(
      customizations?.findIndex((c) => c.id === customization.id)
    );
    if (direction === "prev" && index !== 0) {
      setCustomization(customizations?.[index - 1] as Customization);
    } else if (
      direction === "next" &&
      index !== Number(customizations?.length) - 1
    ) {
      setCustomization(customizations?.[index + 1] as Customization);
    }
  };

  const handleRemoveCustomization = (customizationId: string) => {
    removeCustomizationById(customizationId);
    setCounter(counter - 1);
    const newCustomList = customizations?.filter(
      (e) => e.id !== customizationId
    );

    newCustomList?.length !== 0
      ? setCustomization(
        list[list.findIndex((i) => i.productId === productId)]
          ?.customizations[0]
      )
      : clearCustomization();
    showSuccessAlert("Success!", "Customization removed successfully!");
  };

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    setIsOverlayVisible(step1 || step2 || step3 || step4 || step5);
  }, [step1, step2, step3, step4, step5]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  const handlePopoverOpen = (event: any) => {
    setIsPopoverOpen(true);
  };

  return (
    <>
      {isOverlayVisible && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 30,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >

        <TeamDialogTrigger customizations={customizations} showFront={showFrontPanel} setShowFrontPanel={setShowFrontPanel} productId={productId}/>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            width: "100%",
            borderBottom: "2px solid",
            borderColor: "gray.200",
            pb: 2,
          }}
        >
        </Box>

        <Box
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            gap: 2,
            p: 2,
          }}
        >
          <Button
            size="small"
            sx={{ p: 1 }}
            color="primary"
            variant="outlined"
            style={{
              width: "32px",
              height: "32px",
              alignSelf: "center",
            }}
            onClick={() => {
              decrement();
            }}
          >
            <Remove fontSize="small" />
          </Button>
          {list[
            list.findIndex((i) => i.productId === productId)
          ]?.customizations.map((item, index) => {
            const isActive = item.id === customization.id;

            return (
              <>
                <Box key={item.id}>
                  {/* Botón numerado */}

                  <Button
                    onClick={() => handleEditCustomization(item)}
                    variant={isActive ? "contained" : "outlined"}
                    color={isActive ? "primary" : "secondary"}
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      fontSize: "0.875rem", // text-sm
                      borderRadius: "0.375rem", // rounded-md
                      mb: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </Button>

                  {/* Botón "List" con Popover */}
                  <Box sx={{ position: "relative" }}>
                    <Button
                      ref={buttonRef}
                      onClick={(event) => {
                        handleCustomizationClick(index, event);
                        handlePopoverOpen(event);
                      }}
                      variant="outlined"
                      size="small"
                      sx={{
                        fontSize: "0.75rem", // text-xs
                        padding: "0.25rem 0.3rem",
                        bgcolor: "gray.200",
                        borderRadius: "0.375rem",
                        "&:hover": { bgcolor: "primary.light" },
                      }}
                    >
                      List
                    </Button>

                    {/* Popover para el contenido dinámico */}
                    {index === 0 && step5 && (
                      <Popover
                        open={isPopoverOpen}
                        anchorEl={buttonRef.current}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        sx={{
                          display: "absolute",
                          "& .MuiPopover-paper": {
                            backgroundColor: "transparent", // Fondo transparente
                            boxShadow: "none", // Sin sombra
                          },
                        }}
                      >
                        <Box sx={{ p: 1 }}>
                          <ContainerInfoBox
                            stepp={5}
                            arrowPosition="top"
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
                      </Popover>
                    )}
                  </Box>

                </Box>
              </>
            );
          })}
          <Button
            size="small"
            sx={{ p: 1 }}
            color="primary"
            variant="outlined"
            style={{
              width: "32px",
              height: "32px",
              alignSelf: "center",
            }}
            onClick={() => {
              increment();
            }}
          >
            <Add fontSize="small" />
          </Button>
        </Box >
        <Box sx={{ width: "100%" }}>
          {/* Mostrar el panel frontal o posterior según el estado */}
          {showFrontPanel ? (
            <PanelSides
              steps={{
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
              }}
              image={backImage}
              sideName="backSide"
              id={productId}
              font={product.font}
              fontColor={product.font_color}
              togglePanel={togglePanel}
            />
          ) : (
            <PanelSides
              steps={{
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
              }}
              image={frontImage}
              sideName="frontSide"
              id={productId}
              font={product.font}
              fontColor={product.font_color}
              togglePanel={togglePanel}
            />
          )}
        </Box>

        {
          selectedCustomization !== null &&
          customizations &&
          customizations[selectedCustomization] && (
            <Box
              ref={customizationModalRef}
              sx={{
                position: "absolute",
                top: `${modalPosition.top}px`,
                left: `${modalPosition.left}px`,
                backgroundColor: "white",
                border: "1px solid #d1d5db", // Equivalent to border-gray-300
                borderRadius: "8px", // Rounded corners (adjust as needed)
                padding: "16px", // Equivalent to p-4
                zIndex: 50,
                display: "flex",
                flexWrap: "wrap",
                fontWeight: 500, // Equivalent to font-medium
                color: "#4b5563", // Equivalent to text-gray-600
                fontSize: "14px", // Equivalent to text-sm
                textAlign: "left",
                marginRight: "16px", // Equivalent to mr-4
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <IconButton
                  onClick={() => setSelectedCustomization(null)} // Cierra el diálogo
                  style={{
                    position: "absolute",
                    padding: "0px",
                    top: "-14px",
                    right: "-14px",
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </div>
              <CustomizationDetails customization={customizations[selectedCustomization]} />
              <Button
                onClick={() =>
                  ViewCustomization(
                    customizations[selectedCustomization],
                    productId
                  )
                }
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "neutral.main",
                  },
                  "&:focus": {
                    outline: "none",
                    ring: 2,
                    ringColor: "logo.main",
                    ringOffset: 2,
                    ringOffsetColor: "gray.50",
                  },
                }}
                disabled={loadingState[productId]}
              >
                {loadingState[productId] ? (
                  <CircularProgress size={24} sx={{ margin: "auto" }} />
                ) : (
                  "View"
                )}
              </Button>
              {customizations?.length !== 1 && (
                <Button
                  onClick={() => {
                    handleRemoveCustomization(
                      customizations[selectedCustomization]?.id
                    );
                    setSelectedCustomization(null);
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "error",
                    },
                    "&:focus": {
                      outline: "none",
                      ring: 2,
                      ringColor: "error.main",
                      ringOffset: 2,
                      ringOffsetColor: "gray.50",
                    },
                  }}
                >
                  Remove
                </Button>
              )}
            </Box>
          )
        }
      </Box >
    </>
  );
}
