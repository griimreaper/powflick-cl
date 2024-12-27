import { FC, useRef, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
// GLOBAL CUSTOM COMPONENTS
import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Order, ProductDB } from "models/types";
import { CustomizationModal } from "pages-sections/cart/CustomizationModal";
import { useShoppingCartStore } from "store/shoppingCart";
import { CustomButton } from "components/layouts/vendor-dashboard/dashboard-navbar/styles";
import { Box, Grid } from "@mui/material";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { order: Order };
// ==============================================================

export default function OrderedProducts({ order }: Props) {
  const { id, createdAt, products, updatedAt, customizations } = order;
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
    <Card sx={{ p: 0, mb: "30px" }}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={id} />
        <Item title="Placed on:" value={new Date(createdAt).toDateString()} />
        <Item
          title="Delivered on:"
          value={updatedAt ? format(new Date(updatedAt), "dd MMM, yyyy") : "None"}
        />
      </FlexBetween>

      {products?.map((item: any | ProductDB, ind) => (
        <Grid container spacing={2} key={ind} sx={{ py: 1 }}>
          {/* Columna 1: Información del producto */}
          <Grid item sm={6}>
            <FlexBox alignItems="center">
              <Avatar alt={item.title} src={item.images[0]} sx={{ height: 64, width: 64 }} />
              <Box>
                <H6>{item.title}</H6>
                <Paragraph color="grey.600">
                  {currency(item.OrderProduct?.price)} x {item.OrderProduct?.amount}
                </Paragraph>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {customizations
                    ?.filter((c) => c.productId === item.id)
                    .map((_: any, index: number) => (
                      <CustomButton
                        key={index}
                        variant="contained"
                        onClick={(event) => handleCustomizationClick(item.id, _.customization.id, item.slug, event)}
                        ref={buttonRef}
                      >
                        {index + 1}
                      </CustomButton>
                    ))}
                </Box>
              </Box>
            </FlexBox>
          </Grid>

          {/* Columna 2: Propiedades del producto */}
          <Grid item sm={4}>
            <Paragraph color="grey.600" ellipsis>
              Product properties: {customizations?.find((c) => c.productId === item.id)?.customization.size}
            </Paragraph>
          </Grid>

          {/* Columna 3: Botón para reseñas */}
          <Grid item  sm={2}>
            <Button variant="text" color="primary">
              Write a Review
            </Button>
          </Grid>
        </Grid>
      ))}
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
    </Card>
  );
}

function Item({ title, value }: { title: string; value: number | string }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph>{value}</Paragraph>
    </FlexBox>
  );
}
