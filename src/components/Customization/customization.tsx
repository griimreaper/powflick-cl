import { AutorenewOutlined } from "@mui/icons-material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import ContainerInfoBox from "components/Modals/ContainerInfoBox";
import useFlag from "hooks/useFlag";
import { Customization, ProductDB } from "models/types";
import React, { useEffect, useRef, useState } from "react";
import { getPDF } from "services/customization";
import { initialCustomization, useCustomizationsStore, useCustomizationStore } from "store/customizations";
import { showSuccessAlert } from "utils/alerts";
import PanelSides from "./panelSides";
import { Box, Button, Link, Popover, Typography } from "@mui/material";
// import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface CustomizationProps {
  frontImage: string | undefined;
  backImage: string | undefined;
  product: ProductDB;
  counter: number;
  productId: string;
  setCounter: Function;
}

export default function Customizations(props: CustomizationProps) {
  const [step1, setStep1] = useFlag();
  const [step2, setStep2] = useFlag();
  const [step3, setStep3] = useFlag();
  const [step4, setStep4] = useFlag();
  const [step5, setStep5] = useFlag();

  const { frontImage, backImage, product, counter, productId, setCounter } =
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

  useEffect(() => {
    if (customizations) {
      setCustomization(customizations[0]);
    } else {
      setCustomization(initialCustomization());
    }
  }, [props.productId]);

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

  useEffect(() => { }, [list]);

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

  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar el Popover

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 w-full h-full"></div>
      )}
      <div className="flex-col justify-center items-center">
        <Typography
          variant="h4"
          fontWeight="medium"
          textAlign="center"
          mb={4}
          width="100%"
        >
          Product{" "}
          {Number(customizations?.findIndex((c) => c.id === customization.id)) + 1}
        </Typography>
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
          <Box display="flex">
            <Link
              component="button"
              onClick={() => handleArrowEditCustomization("prev")}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid transparent",
                pt: 4,
                fontSize: "0.875rem", // text-sm
                fontWeight: 500,
                color: "gray.500",
                gap: 2,
                cursor: customizations?.findIndex((e) => e.id === customization.id) === 0
                  ? "not-allowed"
                  : "pointer",
                "&:hover": {
                  borderBottomColor: customizations?.findIndex((e) => e.id === customization.id) === 0
                    ? "transparent"
                    : "gray.300",
                  color: customizations?.findIndex((e) => e.id === customization.id) === 0
                    ? "gray.500"
                    : "gray.700",
                },
              }}
            >
              <ArrowLeftIcon
                sx={{ ml: 0, height: 20, width: 20, color: "gray.400" }}
                aria-hidden="true"
              />
              Prev
            </Link>
          </Box>
          <Box position="relative" id="toggleButton">
            <Button
              onClick={togglePanel}
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1, // rounded-md
                border: "1px solid transparent",
                backgroundColor: "neutral.main",
                padding: 1,
                fontSize: "1rem", // text-base
                fontWeight: 500,
                color: "white",
                "&:hover": { backgroundColor: "neutral.main", opacity: 0.8 },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 2px rgba(logo.main, 0.8)",
                },
                zIndex: 3,
              }}
            >
              <AutorenewOutlined sx={{ height: 32, width: "100%" }} aria-hidden="true" />
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
          <Box display="flex">
            <Link
              component="button"
              onClick={() => handleArrowEditCustomization("next")}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid transparent",
                paddingTop: 2, // pt-4
                fontSize: "0.875rem", // text-sm
                fontWeight: 500,
                color: "gray.500",
                gap: 1, // flex gap-2
                cursor:
                  customizations?.findIndex((e) => e.id === customization.id) ===
                    Number(customizations?.length) - 1
                    ? "not-allowed"
                    : "pointer",
                "&:hover": {
                  borderColor:
                    customizations?.findIndex((e) => e.id === customization.id) ===
                      Number(customizations?.length) - 1
                      ? "transparent"
                      : "gray.300",
                  color:
                    customizations?.findIndex((e) => e.id === customization.id) ===
                      Number(customizations?.length) - 1
                      ? "gray.500"
                      : "gray.700",
                },
              }}
            >
              Next
              <ArrowRightIcon
                sx={{
                  height: 20, // h-5
                  width: 20, // w-5
                  color: "gray.400",
                }}
                aria-hidden="true"
              />
            </Link>
          </Box>
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
          {list[list.findIndex((i) => i.productId === productId)]?.customizations.map(
            (item, index) => {
              const isActive = item.id === customization.id;

              return (
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
                        padding: "0.25rem 0.5rem",
                        bgcolor: "gray.200",
                        borderRadius: "0.375rem",
                        "&:hover": { bgcolor: "primary.light", color: "white" },
                      }}
                    >
                      List
                    </Button>

                    {/* Popover para el contenido dinámico */}
                    {index === 0 && step5 && (
                      <Popover
                        open={isPopoverOpen}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            borderRadius: 1,
                            width: "100%",
                          }}
                        >
                          <ContainerInfoBox
                            stepp={5}
                            arrowPosition="topLeft"
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
              );
            }
          )}
        </Box>
        <div>
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
              fontColor={product.font_color} />
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
              font={product?.font} fontColor={product?.font_color}
            />
          )}
        </div>

        {selectedCustomization !== null &&
          customizations &&
          customizations[selectedCustomization] && (
            <div
              style={{
                top: `${modalPosition.top}px`,
                left: `${modalPosition.left}px`,
              }}
              ref={customizationModalRef}
              className="bg-white absolute border rounded-md border-gray-300 p-4 z-50 flex flex-wrap font-medium text-gray-600  text-sm text-left sm:text-sm flex-col mr-4"
            >
              {customizations[selectedCustomization].size && (
                <p> Size: {customizations[selectedCustomization].size}</p>
              )}
              {customizations[selectedCustomization].frontSide &&
                customizations[selectedCustomization].frontSide.logos.some(
                  (e) => e.logoUrl
                ) &&
                customizations[selectedCustomization].frontSide.logos.map(
                  (each, index) =>
                    each.logoUrl && (
                      <p key={index} className="flex flex-row">
                        Front Logo {index + 1}:{" "}
                        <img src={each.logoUrl} className="w-6 h-6" /> (+{" "}
                        {4.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].frontSide &&
                customizations[selectedCustomization].frontSide.texts.some(
                  (e) => e.text
                ) &&
                customizations[selectedCustomization].frontSide.texts.map(
                  (each, index) =>
                    each.text && (
                      <p key={index}>
                        Front Text {index + 1}: {each.text} (+{" "}
                        {3.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].frontSide &&
                customizations[selectedCustomization].frontSide.numbers.some(
                  (e) => e.number
                ) &&
                customizations[selectedCustomization].frontSide.numbers.map(
                  (each, index) =>
                    each.number && (
                      <p key={index}>
                        Front Number {index + 1}: {each.number} (+{" "}
                        {3.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].backSide &&
                customizations[selectedCustomization].backSide.logos.some(
                  (e) => e.logoUrl
                ) &&
                customizations[selectedCustomization].backSide.logos.map(
                  (each, index) =>
                    each.logoUrl && (
                      <p key={index} className="flex flex-row">
                        Back Logo {index + 1}:{" "}
                        <img src={each.logoUrl} className="w-6 h-6" /> (+{" "}
                        {4.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].backSide &&
                customizations[selectedCustomization].backSide.texts.some(
                  (e) => e.text
                ) &&
                customizations[selectedCustomization].backSide.texts.map(
                  (each, index) =>
                    each.text && (
                      <p key={index}>
                        Back Text {index + 1}: {each.text} (+{" $"}
                        {3.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].backSide &&
                customizations[selectedCustomization].backSide.numbers.some(
                  (e) => e.number
                ) &&
                customizations[selectedCustomization].backSide.numbers.map(
                  (each, index) =>
                    each.number && (
                      <p key={index}>
                        Back Number {index + 1}: {each.number} (+{" $"}
                        {3.99})
                      </p>
                    )
                )}
              {customizations[selectedCustomization].materials !== "None" && (
                <p>
                  Materials: {customizations[selectedCustomization].materials}
                </p>
              )}
              {customizations[selectedCustomization].neck !== "Default" && (
                <p>Neck: {customizations[selectedCustomization].neck}</p>
              )}
              {customizations[selectedCustomization].pants !==
                "None (+$0.00)" && (
                  <p>Pants: {customizations[selectedCustomization].pants}</p>
                )}
              {customizations[selectedCustomization].shorts !==
                "No Shorts (+$0.00)" && (
                  <p>Shorts: {customizations[selectedCustomization].shorts}</p>
                )}
              {customizations[selectedCustomization].socks !==
                "No Socks (+$0.00)" && (
                  <p>Socks: {customizations[selectedCustomization].socks}</p>
                )}
              {/* Contenido del modal con los detalles de la customización */}
              <button
                onClick={() =>
                  ViewCustomization(
                    customizations[selectedCustomization],
                    productId
                  )
                }
                className="bg-neutral my-2 text-sm text-white rounded-md hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50"
                disabled={loadingState[productId]}
              >
                {loadingState[productId] ? (
                  // Contenido cuando está cargando
                  <img
                    src="/Double Ring-1s-200px.png"
                    alt="Loader GIF"
                    className="h-10 w-10 m-auto"
                  />
                ) : (
                  // Contenido normal del botón
                  "View"
                )}
              </button>
              {customizations?.length !== 1 && (
                <button
                  onClick={() => {
                    handleRemoveCustomization(
                      customizations[selectedCustomization].id
                    );
                    setSelectedCustomization(null);
                  }}
                  className="bg-red-600 my-2 text-sm text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Remove
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setSelectedCustomization(null)} // Cierra el diálogo al hacer clic en este botón
                  className="absolute top-0 right-0 mt-1 mr-1 px-0.3 py-0.3 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
      </div >
    </>
  );
}
