import { useRouter } from "next/navigation";
import { useState } from "react";
import { eliminarCaracteresNoNumericos } from "utils/tools";
import { Customization } from "models/types";
import {
  useCustomizationsStore,
  useCustomizationStore,
} from "store/customizations";
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
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {customization?.size && (
          <Typography>Size: {customization.size}</Typography>
        )}

        {customization?.frontSide?.logos?.map((each, index) =>
          each.logoUrl ? (
            <Typography key={index} component="div">
              Front Logo {index + 1}:{" "}
              <img
                src={each.logoUrl}
                alt="Front Logo"
                style={{ width: 24, height: 24, marginLeft: 8 }}
              />{" "}
              (+ $4.99)
            </Typography>
          ) : null
        )}

        {customization?.frontSide?.texts?.map((each, index) =>
          each.text ? (
            <Typography key={index}>
              Front Text {index + 1}: {each.text} (+ ${3.99})
            </Typography>
          ) : null
        )}

        {customization?.backSide?.logos?.map((each, index) =>
          each.logoUrl ? (
            <Typography key={index} component="div">
              Back Logo {index + 1}:{" "}
              <img
                src={each.logoUrl}
                alt="Back Logo"
                style={{ width: 24, height: 24, marginLeft: 8 }}
              />{" "}
              (+ $4.99)
            </Typography>
          ) : null
        )}

        {customization?.materials !== "None" && customization && (
          <Typography>
            Materials:{" "}
            {customization.materials.split(" ")[1]
              ? customization.materials.split(" ")[0] +
                " ($" +
                Number(
                  eliminarCaracteresNoNumericos(
                    String(customization.materials.split(" ").pop())
                  )
                ) +
                ")"
              : customization.materials}
          </Typography>
        )}
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
        </Box>
      </DialogContent>
    </Dialog>
  );
}
