import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import Delete from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { H6, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";
import { Customization, ProductDB } from "models/types";
import { CustomizationModal } from "pages-sections/cart/CustomizationModal";
import { useRef, useState } from "react";
import { CustomButton } from "components/layouts/vendor-dashboard/dashboard-navbar/styles";

// ==============================================================
type Props = { product: ProductDB, customizations: { productId: string, customization: Customization }[] };
// ==============================================================

export default function OrderedProduct({ product, customizations }: Props) {
  const { title, price, slug, images, id } = product || {};

  const [selectedCustomization, setSelectedCustomization] = useState<
    [string, string, string] | null
  >(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleCustomizationClick = (
    productId: string,
    customizationIndex: string,
    slug: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedCustomization([productId, customizationIndex, slug]);
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.top, left: rect.left });
  };
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box my={2} gap={2} display="grid" gridTemplateColumns={{ md: "1fr 1fr", xs: "1fr" }}>
      <FlexBox flexShrink={0} gap={1.5} alignItems="center">
        <Avatar
          src={images[0]}
          alt={title}
          sx={{ height: 64, width: 64, borderRadius: 2 }}
        />

        <Box>
          <H6 mb={1}>{title}</H6>

          <FlexBox alignItems="center" gap={1}>
            <Paragraph fontSize={14} color="grey.600">
              {currency(price)} x {customizations.length}
            </Paragraph>

          </FlexBox>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {customizations
              ?.filter((c) => c.productId === id)
              .map((_: any, index: number) => (
                <CustomButton
                  key={index}
                  variant="contained"
                  onClick={(event) => handleCustomizationClick(id, _.customization.id, slug, event)}
                  ref={buttonRef}
                >
                  {index + 1}
                </CustomButton>
              ))}
          </Box>
        </Box>
      </FlexBox>

      <FlexBetween flexShrink={0}>
        <Paragraph color="grey.600">Product properties: {customizations?.find((c) => c.productId === id)?.customization.size}</Paragraph>

      </FlexBetween>

      {selectedCustomization !== null && (
        <CustomizationModal
          customization={customizations?.find(c => c.customization.id === selectedCustomization[1])?.customization}
          productId={selectedCustomization[0]}
          productSlug={selectedCustomization[2]}
          onClose={() => setSelectedCustomization(null)}
          position={modalPosition}
          orderId={null}
          currencyOrder={null}
        />
      )}
    </Box>
  );
}
