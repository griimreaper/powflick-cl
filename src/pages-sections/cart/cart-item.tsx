import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import Image from "components/SportZoneImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENT
import { Wrapper } from "./styles";
import { ShoppingCartStoreType } from "store/interfaces/interface";
import { Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CustomizationModal } from "./CustomizationModal";
import { useShoppingCartStore } from "store/shoppingCart";

// =========================================================
type Props = {
  item: ShoppingCartStoreType["cart"][0];
};
// =========================================================

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

export default function CartItem({ item }: Props) {
  // const { counter, handleCounterChange } = useCounter(item.product, true);
  const [selectedCustomization, setSelectedCustomization] = useState<
    [string, string] | null
  >(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

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

  const { cart } = useShoppingCartStore();

  return (
    <Wrapper>
      <Image
        alt={item.product.title as string}
        width={140}
        height={140}
        display="block"
        src={item.product.images[0] || "/assets/images/products/iphone-xi.png"}
      />

      {/* DELETE BUTTON */}
      <IconButton
        size="small"
        sx={{ position: "absolute", right: 15, top: 15 }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${item.product.slug}`}>
          <Span ellipsis fontWeight="600" fontSize={18}>
            {item.product.title}
          </Span>
        </Link>

        {/* PRODUCT PRICE SECTION */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(item.product.price)} x {item.customizations.length}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(item.product.price * item.customizations.length)}
          </Span>
        </FlexBox>

        {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
        <FlexBox alignItems="start" display={'flex'} gap={2} flexDirection={'column-reverse'} >
          <Box display={'flex'} gap={1} alignItems={'center'} flexDirection={'row'} maxWidth={'99%'} sx={{ overflowX: "auto", py: 1 }}>
            {item.customizations.map((_, index) => (
              <CustomButton
                key={index}
                variant="contained"
                onClick={(event) =>
                  handleCustomizationClick(item.product.id, _.id, event)
                }
                ref={buttonRef}
              >
                {index + 1}
              </CustomButton>
            ))}
          </Box>
          {/* <Box display={'flex'} gap={1} alignItems={'center'} flexDirection={'row'}>
            <Button
              color="primary"
              sx={{ p: "5px" }}
              variant="outlined"
              disabled={item.customizations.length === 1}
              onClick={() => handleCounterChange(-1, true)}
            >
              <Remove fontSize="small" />
            </Button>

            <Span mx={1} fontWeight={600} fontSize={15}>
              {item.customizations.length}
            </Span>

            <Button
              color="primary"
              sx={{ p: "5px" }}
              variant="outlined"
              onClick={() => handleCounterChange(1, true)}
            >
              <Add fontSize="small" />
            </Button>
          </Box> */}
        </FlexBox>
        {selectedCustomization !== null && (
          <CustomizationModal
            customization={cart
              .find((p) => p.product.id === selectedCustomization[0])
              ?.customizations.find((c) => c.id === selectedCustomization[1])}
            productId={selectedCustomization[0]}
            productSlug={item.product.slug!}
            onClose={() => setSelectedCustomization(null)}
            position={modalPosition}
            orderId={null}
            currencyOrder={null}
          />
        )}
      </FlexBox>
    </Wrapper>
  );
}
