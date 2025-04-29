import { useRouter } from "next/navigation";
import { useState } from "react";
import { eliminarCaracteresNoNumericos } from "utils/tools";
import { Customization, CustomizationSides } from "models/types";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import { useShoppingCartStore } from "store/shoppingCart";
import { getProductsBySlug } from "services/Products";
import { getPDF } from "services/customization";
import { showSuccessAlert } from "utils/alerts";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import CustomizationDetails from "components/Customization/CustomizationDetails";

interface CustomizationModalProps {
  customization: Customization | undefined; // Aquí deberías especificar el tipo de datos de las customizaciones
  productId: string;
  productSlug: string;
  onClose: () => void;
  position: { top: number; left: number };
  orderId: number | null;
  currencyOrder: { name: string; currency: number } | null;
  style?: React.CSSProperties;
}

export function CustomizationModal({
  customization,
  onClose,
  position,
  productId,
  productSlug,
  orderId,
  currencyOrder,
  style,
}: CustomizationModalProps) {
  const [openLogosModal, setOpenLogosModal] = useState(false);
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );
  const router = useRouter();
  const { setCustomization, setShowCustomization } = useCustomizationStore();
  const { setCustomizationsInList } = useCustomizationsStore();
  const { removeCustomizationFromProduct, handleShowCart, cart } =
    useShoppingCartStore();

  const ViewCustomization = async (
    customization: Customization,
    productId: string
  ) => {
    try {
      const { product } = await getProductsBySlug(productId);

      // Inicia el loader para el producto específico
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [productId]: true,
      }));

      const pdf = await getPDF(
        product,
        customization,
        orderId ? String(orderId) : null
      );
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

    router.push("/products/" + productSlug);
    const customizations: Customization[] =
      cart.find(({ product }) => product.id === productId)?.customizations ??
      [];
    setCustomizationsInList(productId, customizations);
    setCustomization(customization);
    setTimeout(() => {
      setShowCustomization(true);
    }, 2000);
    handleShowCart();
  };

  const handleRemoveCustomization = (
    productId: string,
    customizationId: string
  ) => {
    removeCustomizationFromProduct(productId, customizationId);
    showSuccessAlert("Success!", "Product removed from cart");
  };

  const downloadImage = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Dialog
      open={Boolean(customization)}
      onClose={onClose}
      PaperProps={{
        style: {
          position: "absolute",
          top: position?.top || 0,
          left: position?.left || 0,
          ...style,
        },
      }}
    >
      <DialogTitle>
        Customization Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <CustomizationDetails customization={customization} />
        <Box display="flex" justifyContent="center" gap={1}>
          <Button
            onClick={() => ViewCustomization(customization!, productId)}
            variant="outlined"
            color="primary"
            disabled={loadingState[productId]}
            style={{ marginTop: 16 }}
          >
            {loadingState[productId] ? "Loading..." : "View"}
          </Button>

          {orderId === null && (
            <Button
              onClick={() => handleEditCustomization(customization!)}
              variant="outlined"
              color="secondary"
              style={{ marginTop: 16 }}
            >
              Edit
            </Button>
          )}

          {orderId === null && (
            <Button
              onClick={() =>
                handleRemoveCustomization(productId, customization?.id!)
              }
              variant="outlined"
              color="error"
              style={{ marginTop: 16 }}
            >
              Remove
            </Button>
          )}

          {orderId !== null &&
            (customization?.frontSide?.logos?.some(l => l.logoUrl) ||
              customization?.backSide?.logos?.some(l => l.logoUrl)) && (
              <Button
                onClick={() => { setOpenLogosModal(true) }}
                variant="outlined"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Logos
              </Button>
            )}
        </Box>
      </DialogContent>
      <Dialog open={openLogosModal} onClose={() => setOpenLogosModal(false)}>
        <DialogTitle>
          Logos
          <IconButton
            aria-label="close"
            onClick={() => setOpenLogosModal(false)}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {["frontSide", "backSide"].map((side: string) =>
            customization?.[side as 'frontSide' | 'backSide']?.logos?.map((logo, index) =>
              logo.logoUrl ? (
                <Box
                  key={`${side}-${index}`}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  justifyContent="space-between"
                  mb={1}
                >
                  <img
                    src={logo.logoUrl}
                    alt={`${side} logo ${index + 1}`}
                    style={{ width: 80, height: 80, objectFit: "contain" }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => downloadImage(logo.logoUrl, `logo-${index + 1}.png`)}
                  >
                    Download
                  </Button>
                </Box>
              ) : null
            )
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
