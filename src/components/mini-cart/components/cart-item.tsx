import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Close from "@mui/icons-material/Close";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { ShoppingCartStoreType } from "store/interfaces/interface";
import { useShoppingCartStore } from "store/shoppingCart";

import { useRef, useState } from "react";
import { CustomizationModal } from "pages-sections/cart/CustomizationModal";
import { styled } from "@mui/material";
import { getTotalWithDiscount, getUnitPriceWithDiscount } from "utils/tools";

// ==============================================================
interface Props {
  item: ShoppingCartStoreType["cart"][0];
}
// ==============================================================

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.grey[500]}`,
  backgroundColor: theme.palette.grey[200],
  width: "2rem",
  height: "2rem",
  borderRadius: "4px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s, color 0.3s, border 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
}));

export default function MiniCartItem({ item }: Props) {
  // const { counter, setCounter, handleCounterChange } = useCounter(item.product.id);

  const { cart } = useShoppingCartStore();

  const { removeProductById } = useShoppingCartStore();
  const [selectedCustomization, setSelectedCustomization] = useState<
    [string, string] | null
  >(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const isTopSelected = !item.customizations.some(c => c.shorts === 'Default (+$0.00)')
  console.log(isTopSelected);
  

  const adjustModalPosition = (position: { top: number; left: number }) => {
    const modalWidth = 400;
    const modalHeight = 300; // Estimación del alto del modal
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let { top, left } = position;

    // Ajuste horizontal
    if (left + modalWidth > screenWidth) {
      left = screenWidth - modalWidth - 20;
    }
    if (left < 10) {
      left = 10;
    }

    // Ajuste vertical
    if (top + modalHeight > screenHeight) {
      top = screenHeight - modalHeight - 20;
    }
    if (top < 10) {
      top = 10;
    }

    return { top, left };
  };

  const handleCustomizationClick = (
    productId: string,
    customizationIndex: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedCustomization([productId, customizationIndex]);
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.top, left: rect.left });
  };
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.product.id}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider"
      sx={{ zIndex: 10 }} // Añadir zIndex aquí
    >
      <FlexBox alignItems="center" flexDirection="column">
        {/* <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={() => {
            handleCounterChange(1, true);
          }}
          sx={{ height: 28, width: 28, borderRadius: 50 }}
        >
          <Add fontSize="small" />
        </Button> */}

        <H6 my="3px">{item.customizations.length}</H6>

        {/* <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={item.customizations.length === 1}
          onClick={() => {
            handleCounterChange(-1, true);
          }}
          sx={{ height: 28, width: 28, borderRadius: 50 }}
        >
          <Remove fontSize="small" />
        </Button> */}
      </FlexBox>

      <Link href={`/products/${item.product.id}`}>
        <Avatar
          alt={item.product.title}
          src={(item.product?.images && item.product.images[0]) || ""}
          sx={{ mx: 1, width: 75, height: 75 }}
        />
      </Link>

      <Box
        flex="1"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Link href={`/products/${item.product.slug}`}>
          <H6 ellipsis className="title">
            {item.product.title}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(getUnitPriceWithDiscount(item.product.price + (isTopSelected ? -13.99 : 0), item.amount))} x {item.customizations.length}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(
            item.totalProduct + item.totalCustomization
          )}
        </H6>

        <FlexBox alignItems="center" gap={1} sx={{ overflowX: "auto", py: 1 }}>
          {item.customizations.map((_, index) => (
            <CustomButton
              key={index}
              variant="contained"
              onClick={(event: any) =>
                handleCustomizationClick(item.product.id, _.id, event)
              }
              ref={buttonRef}
            >
              {index + 1}
            </CustomButton>
          ))}
        </FlexBox>
      </Box>

      {selectedCustomization !== null && (
        <CustomizationModal
          customization={cart
            .find((p) => p.product.id === selectedCustomization[0])
            ?.customizations.find((c) => c.id === selectedCustomization[1])}
          productId={selectedCustomization[0]}
          productSlug={item.product.slug!}
          onClose={() => setSelectedCustomization(null)}
          position={adjustModalPosition(modalPosition)}
          orderId={null}
          currencyOrder={null}
          style={{ zIndex: 9999 }}
        />
      )}

      <IconButton
        size="small"
        onClick={() => {
          removeProductById(item.product.id);
        }}
        sx={{ marginLeft: 2.5 }}
      >
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
