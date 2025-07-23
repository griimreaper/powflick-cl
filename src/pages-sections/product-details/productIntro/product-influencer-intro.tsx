"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
// GLOBAL CUSTOM COMPONENTS
import { H1, H2, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// DUMMY DATA
// CUSTOM DATA MODEL
import { Customization, detailProps } from "models/types";
import Image from "next/image";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { favProduct } from "services/Products";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Lock,
} from "@mui/icons-material";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import { useShoppingCartStore } from "store/shoppingCart";
import { Divider, Typography } from "@mui/material";
import { useCounter } from "hooks/useCounter";
import { addToCart } from "../../../../fpixel";
import { getTotalWithDiscount, getUnitPriceWithDiscount } from "utils/tools";
import AditionalDetailsinfluencer from "./AditionalDetailsInfluencer";

// ================================================================
type Props = { product: detailProps };
// ================================================================

export default function ProductInfluencerIntro({ product }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const {
    id,
    price,
    title,
    images,
    font: fontDefault,
    font_color,
  } = product.product;

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const {
    setShowCustomization,
    updateCustomizationAttribute,
    setFonts,
    setFontColor,
  } = useCustomizationStore();
  const { list, setFieldForAllCustomizations } = useCustomizationsStore();
  const { profile, setFavorites } = useDashboardStore();
  const { token } = profile;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFav, setIsFav] = useState<boolean>(
    profile.favorites?.some(({ product }) => product.id === id)
  );
  const { counter, setCounter } =
    useCounter(product.product.id);
  const [font, setFont] = useState<string>(fontDefault || "Arial");
  const [fontColor, setFontColr] = useState<string>(font_color || "000000");
  const { setProductInCart } = useShoppingCartStore();
  const customizationsTotal = list.find((p) => id === p.productId)?.total || 0;

  const isTopSelected = list.find((item) => item.productId === id)?.isTopSelected ? 'top' : 'uniform';

  const [selected, setSelected] = useState<"top" | "uniform">(isTopSelected || 'top');
  const isSelected = (value: "top" | "uniform") => selected === value;

  const [customizationsBySize, setCustomizationsBySize] = useState<{
    [size: string]: { number?: string; name?: string }[]
  }>({});

  const productCustomizations: Customization[] = list.find((p) => id === p.productId)?.customizations || [];

  useEffect(() => {
    // Agrupar customizaciones por size (size incluye talle-género)
    const grouped: {
      [size: string]: { number?: string; name?: string }[];
    } = {};

    productCustomizations.forEach(custom => {
      const key = custom.size; // ejemplo: "M-MEN"

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({
        number: custom.backSide.numbers[0]?.number || "",
        name: custom.backSide.texts[0]?.text || ""
      });
    });

    setCustomizationsBySize(grouped);
  }, []);

  useEffect(() => {
    const newValue = selected === 'top'
      ? 'No Shorts (-$13.99)'
      : 'Default (+$0.00)';

    const customizations = list.find((item) => item.productId === id)?.customizations || null;

    // Evita ciclo si ya están todos seteados con el nuevo valor
    const allMatch = customizations?.every(c => c.shorts === newValue);
    if (allMatch || !customizations) return;

    setFieldForAllCustomizations(id, 'shorts', newValue);
    updateCustomizationAttribute('shorts', newValue);
  }, [selected, counter]);

  useEffect(() => {
    const findAmountBySessionStorage: string | null = sessionStorage.getItem(
      "customizations-store"
    );
    if (findAmountBySessionStorage) {
      const jsonSS = JSON.parse(findAmountBySessionStorage);

      const customizations: Customization[] = jsonSS?.state?.list.find(
        ({ productId }: any) => productId === id
      )?.customizations;

      if (
        customizations?.length === 1 &&
        customizations?.some(
          (e) =>
            !e.backSide.texts[0]?.text &&
            !e.backSide.numbers[0]?.number &&
            !e.frontSide.texts[0]?.text &&
            !e.frontSide.numbers[0]?.number
        )
      ) {
        setTimeout(() => {
          setFonts(font);
          setFontColor(fontColor);
        }, 3000);
      }
    }
  }, [font, fontColor]);

  useEffect(() => {
    return () => {
      setShowCustomization(false);
    };
  }, []);

  // HANDLE SELECT IMAGE OR VIDEO
  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind);
    setSelectedVideo(null); // Reset video selection
  };

  const handleVideoClick = (url: string) => () => {
    setSelectedVideo(url);
    setSelectedImage(-1); // Reset image selection
  };

  const handleAddToFav = async () => {
    if (!token || token === undefined) {
      showErrorAlert("Error!", "Must be loged.");
    } else {
      setIsFav(!isFav);
      const fetchfavProduct = await favProduct(token, String(id), false);
      setFavorites(fetchfavProduct.list);
      if (
        fetchfavProduct.error &&
        fetchfavProduct.message !== "The list of product favs"
      ) {
        showErrorAlert("Error!", fetchfavProduct.message);
      } else {
        showSuccessAlert("Success!", fetchfavProduct.message);
      }
    }
  };

  const handleItemChange = (name: keyof Customization, value: string) => {
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });

    updateCustomizationAttribute(name, value);
  };

  const totalCustomizationPrice =
    list[list.findIndex((i) => i.productId === id)]?.total?.toFixed(2) ?? 0;
  const totalProductsPrice = (Number(product?.product.price) * counter).toFixed(
    2
  );
  const total = Number(totalProductsPrice) + Number(totalCustomizationPrice);

  const handleAddToBagClick = () => {
    const customizations: Customization[] | null =
      list[list.findIndex((i) => i.productId === id)]?.customizations ?? null;
    const totalCustomization = customizationsTotal;
    const totalProduct: number = parseFloat(
      (getTotalWithDiscount(price, counter)).toFixed(2)
    );
    const productToBag = product?.product;
    const amount = counter;
    const top = selected === 'top';;

    if (counter !== 0)
      setProductInCart(
        productToBag,
        customizations,
        totalCustomization,
        amount,
        top
      );
    showSuccessAlert("Success!", "Product added to bag");
    return {
      productToBag,
      customizations,
      totalCustomization,
      totalProduct,
      amount,
    };
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}

        {/* modularizamos, mostramos esta imagen si no se da click en customizar, y si se da click aqui hacemos renderizado condicional para mostrar componente Customization.*/}
        <Grid
          id="customization-section"
          item
          md={6}
          xs={12}
          alignItems="center"
        >
          <Box>
            <FlexBox
              borderRadius={3}
              overflow="visible"
              justifyContent="center"
              mb={6}
            >
              {selectedVideo ? (
                <video
                  id="product-video"
                  width="500"
                  height="500"
                  controls
                >
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  alt={title}
                  width={500}
                  height={500}
                  loading="eager"
                  src={product.product.images.filter(i => !i.includes('customization'))[selectedImage] || ""}
                />
              )}
            </FlexBox>

            <FlexBox
              overflow="auto"
              sx={{ width: "full", justifyContent: "center" }}
            >
              {images
                ?.filter((i: string) => !i.includes("customization"))
                .map((url: string, ind: number) => (
                  <FlexRowCenter
                    key={ind}
                    width={64}
                    height={64}
                    minWidth={64}
                    bgcolor="white"
                    border="1px solid"
                    borderRadius="10px"
                    style={{ cursor: "pointer" }}
                    onClick={handleImageClick(ind)}
                    mr={ind === images.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "grey.400"
                    }
                  >
                    <Avatar
                      alt="product"
                      src={url}
                      variant="square"
                      sx={{ height: 40 }}
                    />
                  </FlexRowCenter>
                ))}
              <FlexRowCenter
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                style={{ cursor: "pointer" }}
                mr="10px"
                borderColor="grey.400"
                onClick={handleVideoClick(
                  "https://sbvajd9r07chtxp5.public.blob.vercel-storage.com/video-Detail/20250303-105015-1dPq64oJspwVHro40Vm8Th0hMtcByU.mp4"
                )}
              >
                <video id="product-video-thumbnail" width="64" height="64">
                  <source
                    src="https://sbvajd9r07chtxp5.public.blob.vercel-storage.com/video-Detail/20250303-105015-1dPq64oJspwVHro40Vm8Th0hMtcByU.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </FlexRowCenter>
            </FlexBox>
          </Box>
        </Grid>

        {/* PRODUCT INFO AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* PRODUCT NAME */}
          <H1 mb={1}>{title}</H1>

          {/* PRODUCT BRAND */}
          {product.product.categories?.length > 0 && (
            <FlexBox alignItems="center" flexWrap="wrap" mb={1}>
              <Typography sx={{ marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>
                Categories:
              </Typography>

              {product.product.categories.map((cat: any, index: number) => (
                <Box key={cat} display="inline-flex" alignItems="center">
                  <Link href={`/products?category=${encodeURIComponent(cat)}`}>
                    {product.product.categories.length === 1 ? (
                      <H6>{cat}.</H6>
                    ) : index === 0 && product.product.categories.length > 1 ? (
                      <H6>{cat},</H6>
                    ) :
                      index === product.product.categories.length - 1 ? (
                        <H6 ml={0.5}>{cat}.</H6>
                      ) : (
                        <H6 ml={0.5}>{cat},</H6>
                      )}
                  </Link>
                </Box>
              ))}
            </FlexBox>
          )}

          {product.product.collections?.length > 0 && (
            <FlexBox alignItems="center" flexWrap="wrap" mb={1}>
              <Typography sx={{ marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>
                Collections:
              </Typography>

              {product.product.collections.map((col: any, index: number) => (
                <Box key={col} display="inline-flex" alignItems="center">
                  <Link href={`/products?collection=${encodeURIComponent(col)}`}>
                    {product.product.collections.length === 1 ? (
                      <H6>{col}.</H6>
                    ) : index === 0 && product.product.collections.length > 1 ? (
                      <H6>{col},</H6>
                    ) : index === product.product.collections.length - 1 ? (
                      <H6 ml={0.5}>{col}.</H6>
                    ) : (
                      <H6 ml={0.5}>{col},</H6>
                    )}
                  </Link>
                </Box>
              ))}
            </FlexBox>
          )}

          {product.product.tags?.length > 0 && (
            <FlexBox alignItems="center" mb={1} gap={1} flexWrap={"wrap"}>
              <div>Tags: </div>
              {product.product.tags.map((t: any) => (
                <Link key={t} href={`/products?tag=${encodeURIComponent(t)}`}>
                  <H6 bgcolor={"#f0f0f0"} sx={{
                    transition: 'background-color 0.3s ease',  // Animación para el cambio de color de fondo
                    '&:hover': {
                      bgcolor: '#e0e0e0',  // Cambia el color de fondo al hacer hover
                    },
                  }} borderRadius={20} paddingX={1.5}>
                    {'#' + t}
                  </H6>
                </Link>
              ))}
            </FlexBox>
          )}

          {/* PRODUCT RATING */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Rating color="warn" value={4} readOnly />
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {/* PRICE & STOCK */}
          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(getUnitPriceWithDiscount(price + (selected === 'top' ? -13.99 : 0), counter))}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

          {/* SHOP NAME */}


          {(product.product.categories.some((c: any) => c.includes('Soccer')) || product.product.categories.some((c: any) => c.includes('Basketball'))) && (
            <FlexBox alignItems="start" gap={2} my={2}>
              <Button
                onClick={() => setSelected("top")}
                variant="contained"
                sx={{
                  background: isSelected("top") ? "black" : "white",
                  color: isSelected("top") ? "white" : "black",
                  border: isSelected("top") ? "none" : "1px solid black",
                  px: "clamp(1rem, 5vw, 1.75rem)",
                  height: 40,
                  width: '140px',
                  "&:hover": {
                    background: isSelected("top") ? "black" : "#f5f5f5"
                  }
                }}
              >
                Top
              </Button>
              <Button
                onClick={() => setSelected("uniform")}
                variant="contained"
                sx={{
                  background: isSelected("uniform") ? "black" : "white",
                  color: isSelected("uniform") ? "white" : "black",
                  border: isSelected("uniform") ? "none" : "1px solid black",
                  px: "clamp(1rem, 5vw, 1.75rem)",
                  height: 40,
                  whiteSpace: 'nowrap',
                  minWidth: 80, // para que no quede muy chico
                  "&:hover": {
                    background: isSelected("uniform") ? "black" : "#f5f5f5"
                  }
                }}
              >
                Uniform (Jersey + Shorts)
              </Button>
            </FlexBox>
          )
          }

          {/* EDITS DETAIL */}
          <AditionalDetailsinfluencer
            detail={product}
            handleItemChange={handleItemChange}
            customizationsBySize={customizationsBySize}
            setCustomizationsBySize={setCustomizationsBySize}
            config={{ font, fontColor, isTopSelected: !!isTopSelected }}
          />

          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" width={'100%'} my={2}>
            <Box width={'70%'} gap={2} display="flex" alignItems="center" flexDirection={'row'} justifyContent="space-between">
              <Button
                id="addToBag-button-event-click"
                color="primary"
                variant="contained"
                sx={{
                  width: "clamp(120px, 30vw, 300px)", // Ajusta dinámicamente el tamaño del botón
                  px: "clamp(1rem, 5vw, 1.75rem)", // Ajusta el padding según la pantalla
                  height: 40,
                  my: 2,
                  whiteSpace: "nowrap",
                  flex: 1, // Permite que los botones se distribuyan equitativamente
                }}
                onClick={() => {
                  // Validación de errores en personalización
                  const influencerDetails = document.getElementById("influencer-details-form");
                  let hasErrors = false;
                  if (influencerDetails) {
                    // Busca cualquier input con aria-invalid="true" dentro del formulario
                    hasErrors = influencerDetails.querySelectorAll('input[aria-invalid="true"]').length > 0;
                  }
                  if (hasErrors) {
                    showErrorAlert("Error", "Please correct the customization fields before adding to cart.");
                    return;
                  }
                  const result = handleAddToBagClick();
                  (window as any).dataLayer.push({ ecommerce: null });
                  (window as any).dataLayer.push({
                    event: "Add To Cart",
                    ecommerce: {
                      currency: "USD",
                      value: Number(total),
                      total_product_price: Number(totalProductsPrice),
                      total_customization_price: Number(
                        totalCustomizationPrice
                      ),
                      items: [
                        {
                          item_id: result.productToBag.id,
                          item_name: result.productToBag.title,
                          affiliation: "Google Merchandise Store",
                          item_brand: "Pow Flick",
                          item_category:
                            product.product.product_categories.split("|")[0],
                          item_category2: product.product.sport,
                          item_variant: result.productToBag.colors,
                          price: Number(result.productToBag.price),
                          quantity: result.amount,
                        },
                      ],
                    },
                  });

                  addToCart("Add To Cart", {
                    ecommerce: {
                      items: [
                        {
                          item_id: result.productToBag.id,
                          item_name: result.productToBag.title,
                          affiliation: "Google Merchandise Store",
                          item_brand: "Pow Flick",
                          item_category:
                            product.product.product_categories.split("|")[0],
                          item_category2: product.product.sport,
                          item_variant: result.productToBag.colors,
                          price: Number(result.productToBag.price),
                          quantity: result.amount,
                        },
                      ],
                    },
                  });
                }}
              >
                Add to Cart
              </Button>

              <Button
                onClick={handleAddToFav}
                sx={{
                  width: "clamp(120px, 30%, 200px)",
                  px: "clamp(1rem, 5vw, 1.75rem)",
                  height: 40,
                  flex: 1,
                }}
              >
                {isFav ? (
                  <FavoriteOutlined color="primary" />
                ) : (
                  <FavoriteBorderOutlined color={"inherit"} />
                )}
              </Button>
            </Box>
          </Box>

          <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={1} mt={2} border={1} borderColor={'grey.200'} p={1}>
            <Typography variant="subtitle2" fontSize={{ xs: '4vw', md: '1.5vw' }} fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Lock />
              Guaranteed Safe & Secure Checkout
            </Typography>

            <Box display="flex" flexWrap={'wrap'} mt={1} width={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Box width={{ xs: '18vw', md: '6vw' }}>
                <img src="/assets/images/payment-methods/paypal-1.png" alt="Pago 1" style={{ width: '100%', height: 'auto' }} />
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black', height: '25px', my: 'auto' }} />

              <Box width={{ xs: 'auto', md: 'auto' }} >
                <img src="/assets/images/payment-methods/visa.png" alt="Pago 2" style={{ width: 'auto', height: 'auto' }} />
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black', height: '25px', my: 'auto' }} />

              <Box width={{ xs: '18vw', md: '6vw' }}>
                <img src="/assets/images/payment-methods/MasterCard.png" alt="Pago 2" style={{ width: '100%', height: 'auto' }} />
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black', height: '25px', my: 'auto' }} />

              <Box width={{ xs: 'auto', md: 'auto' }}>
                <img src="/assets/images/payment-methods/jcb.png" alt="Pago 3" style={{ width: 'auto', height: 'auto' }} />
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black', height: '25px', my: 'auto' }} />

              <Box width={{ xs: '18vw', md: '6vw' }}>
                <img src="/assets/images/payment-methods/3dsecure.png" alt="Pago 3" style={{ width: '100%', height: 'auto' }} />
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'black', height: '25px', my: 'auto' }} />

              <Box width={{ xs: '18vw', md: '6vw' }}>
                <img src="/assets/images/payment-methods/wise.png" alt="Pago 4" style={{ width: '100%', height: 'auto' }} />
              </Box>
            </Box>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
}
