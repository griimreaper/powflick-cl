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
import { Customization, Order, ProductDB } from "models/types";
import { CustomizationModal } from "pages-sections/cart/CustomizationModal";
import { useShoppingCartStore } from "store/shoppingCart";
import { CustomButton } from "components/layouts/vendor-dashboard/dashboard-navbar/styles";
import { Box, Grid } from "@mui/material";
import { ReviewModal } from "./ReviewModal";
import { showSuccessAlert } from "utils/alerts";
import { getUnitPriceWithDiscount } from "utils/tools";
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
  const { setProductInCart } = useShoppingCartStore();

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

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

  const handleReviewClick = (productId: string) => {
    setSelectedProductId(productId);
    setOpenReviewModal(true);  // Abrir el modal de reseña
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);  // Cerrar el modal de reseña
    setSelectedProductId(null); // Limpiar el producto seleccionado
  };

  const handleReorder = (
    customizations: Customization[],
    product: ProductDB,
    totalProduct: number,
    amount: number,
    top: boolean = false
  ) => {
    const totalCustomization: number = customizations.reduce(
      (sum, custom) => (sum += custom.price),
      0
    );
    const productToBag = product;
    setProductInCart(
      productToBag,
      customizations,
      totalCustomization,
      totalProduct,
      amount,
      top,
    );
  };

  console.log(order);

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
          <Grid item xs={12} sm={9} display={'flex'} width={'100%'}>
            <FlexBox alignItems="center" width={'100%'}>
              <Avatar alt={item.title} src={item.images[0]} sx={{ height: 64, width: 64, marginX: 2 }} />
              <Box width={'100%'}>
                <H6>{item.title}</H6>
                <Paragraph color="grey.600">
                  {currency(getUnitPriceWithDiscount(item.price + (item.OrderProduct?.top ? -13.99 : 0), item.OrderProduct?.amount))} x {item.OrderProduct?.amount}
                </Paragraph>
                <Box width={'95%'} sx={{ display: "flex", gap: 1, py: 1, overflowX: 'scroll' }} >
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
          {/* <Grid item xs={6} sm={3}>
            <Paragraph color="grey.600" ellipsis ml={2}>
              Product properties: {customizations?.find((c) => c.productId === item.id)?.customization.size}
            </Paragraph>
          </Grid> */}

          {/* Columna 3: Botón para reseñas */}
          <Grid item xs={12} sm={3}>
            {/* Botón para reordenar la misma orden */}
            <Box sx={{ mb: 3, mr: 3 }} px={2} display={"flex"} width={"100%"} justifyContent={"end"} whiteSpace={'nowrap'} flexDirection={{ sx: "row", sm: "column" }} flexWrap={"nowrap"}>
              <Button variant="text" color="primary" onClick={() => {
                handleReorder(
                  order.customizations
                    .filter(
                      ({ productId }) =>
                        productId === item.id
                    )
                    .map(
                      ({ customization }) =>
                        customization
                    ),
                  item,
                  item.OrderProduct.price,
                  item.OrderProduct.amount,
                  item.OrderProduct.top,
                );
                showSuccessAlert(
                  "Success!",
                  "The product has been added to the cart"
                );
              }}>
                Add to Cart
              </Button>
              <Button variant="text" color="primary" onClick={() => handleReviewClick(item.id)}>
                Write a Review
              </Button>
            </Box>
          </Grid>
        </Grid>
      ))}

      <ReviewModal
        open={openReviewModal}
        onClose={handleCloseReviewModal}
        productId={selectedProductId}
      />

      {selectedCustomization !== null && (
        <CustomizationModal
          customization={customizations?.find(c => c.customization.id === selectedCustomization[1])?.customization}
          productId={selectedCustomization[0]}
          productSlug={selectedCustomization[2]}
          onClose={() => setSelectedCustomization(null)}
          position={modalPosition}
          orderId={order.id}
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
