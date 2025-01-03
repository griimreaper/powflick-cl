"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// DUMMY DATA
import productVariants from "data/product-variants";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { Customization, detailProps, ProductDB } from "models/types";
import Image from "next/image";
import Heart from "icons/Heart";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { favProduct } from "services/Products";
import {
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import AditionalDetails from "./AditionalDetails";
import Customizations from "components/Customization/customization";
import useCounter from "hooks/useCounter";
import { useShoppingCartStore } from "store/shoppingCart";

// ================================================================
type Props = { product: detailProps };
// ================================================================

type SelectVariants = {
  [key: string]: string; // Permite usar cualquier string como clave
};

export default function ProductIntro({ product }: Props) {
  const {
    id,
    price,
    title,
    images,
    slug,
    URL,
    font: fontDefault,
    font_color,
  } = product.product;

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const {
    customization,
    showCustomization,
    setShowCustomization,
    updateCustomizationAttribute,
    setCustomization,
    clearCustomization,
    setFonts,
    setFontColor,
  } = useCustomizationStore();
  const { list, trimCustomizations, setCustomizationInList } =
    useCustomizationsStore();
  const { profile, setFavorites } = useDashboardStore();
  const { token } = profile;
  const { state, dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFav, setIsFav] = useState<boolean>(profile.favorites?.some(({ product }) => product.id === id));
  const { counter, setCounter, handleCounterChange } = useCounter(product.product.id);
  const [font, setFont] = useState<string>(fontDefault || "Arial");
  const [fontColor, setFontColr] = useState<string>(font_color || "000000");
  const { setProductInCart } = useShoppingCartStore();
  const customizations =
    list[list.findIndex((i) => i.productId === id)]?.customizations ?? [];

  // CHECK PRODUCT EXIST OR NOT IN THE CART1
  const cartItem = state.cart.find((item) => item.id === id);

  useEffect(() => {
    const findAmountBySessionStorage: string | null = sessionStorage.getItem(
      "customizations-store"
    );
    if (findAmountBySessionStorage) {
      const jsonSS = JSON.parse(findAmountBySessionStorage);

      const amount = jsonSS?.state?.list.find(
        ({ productId }: any) => productId === id
      )?.amount;
      if (amount) {
        setCounter(Number(amount));
      } else {
        clearCustomization();
      }
    }
  }, []);

  useEffect(() => {
    if (customization.id !== "none") {
      setCustomizationInList(id, customization);
    }
  }, [customization]);

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
            !e.backSide.texts[0].text &&
            !e.backSide.numbers[0].number &&
            !e.frontSide.texts[0].text &&
            !e.frontSide.numbers[0].number
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
    if (customization.id !== "none") {
      setCustomizationInList(id, customization);
    }
  }, [customization]);

  useEffect(() => {
    return () => {
      setShowCustomization(false);
    };
  }, []);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

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

  const handleCustomizationClick = () => {
    setShowCustomization(!showCustomization); // Al hacer clic en "Custom", mostrar la personalización
    const section = document.getElementById("customization-section");
    if (section && !showCustomization) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemChange = (name: keyof Customization, value: string) => {
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });

    updateCustomizationAttribute(name, value);
  };

  const customizationProps = {
    frontImage: product?.product.images[2],
    backImage: product?.product.images[3],
    product: product?.product,
    counter,
    productId: id,
    setCounter,
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
    const totalCustomization: number =
      typeof list[list.findIndex((i) => i.productId === id)]?.total === "number"
        ? list[list.findIndex((i) => i.productId === id)]?.total
        : 0;
    const totalProduct: number = parseFloat(
      (Number(product?.product.price) * counter).toFixed(2)
    );
    const productToBag = product?.product;
    const amount = counter;

    if (counter !== 0)
      setProductInCart(
        productToBag,
        customizations,
        totalCustomization,
        totalProduct,
        amount
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
          {showCustomization ? (
            <Box mt={{ xs: 10, sm: 16, lg: 0 }} px={{ xs: 4, sm: 0 }}>
              <Customizations {...customizationProps} />
              {/* Agrega aquí los elementos de personalización */}
            </Box>
          ) : (
            <Box>
              <FlexBox
                borderRadius={3}
                overflow="hidden"
                justifyContent="center"
                mb={6}
              >
                <Image
                  alt={title}
                  width={500}
                  height={500}
                  loading="eager"
                  src={product.product.images[selectedImage] || ""}
                />
              </FlexBox>

              <FlexBox
                overflow="auto"
                sx={{ width: "full", justifyContent: "center" }}
              >
                {images
                  ?.filter((i: string) => i.includes("customization"))
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
              </FlexBox>
            </Box>
          )}
        </Grid>

        {/* PRODUCT INFO AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* PRODUCT NAME */}
          <H1 mb={1}>{title}</H1>

          {/* PRODUCT BRAND */}
          <FlexBox alignItems="center" mb={1} gap={1}>
            <div>Categories: </div>
            <H6> {product.product.product_categories.split("|")[0]}</H6>
          </FlexBox>

          {/* PRODUCT RATING */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Rating color="warn" value={4} readOnly />
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {/* PRICE & STOCK */}
          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            {/* BUTTONS */}
            <Box sx={{ display: "column", gap: 3 }}>
              <FlexBox alignItems="center" mb={4.5}>
                <Button
                  size="small"
                  sx={{ p: 1 }}
                  color="primary"
                  variant="outlined"
                  onClick={() => { handleCounterChange(-1); }}>
                  <Remove fontSize="small" />
                </Button>
                <H3 fontWeight="600" mx={2.5}>
                  {counter}
                </H3>
                <Button
                  size="small"
                  sx={{ p: 1 }}
                  color="primary"
                  variant="outlined"
                  onClick={() => { handleCounterChange(1); }}>
                  <Add fontSize="small" />
                </Button>
              </FlexBox>

              {/* ADD TO CART, HEART, AND CUSTOMIZE BUTTONS */}
              <FlexBox alignItems="center" gap={2}>
                <Button
                  id="addToBag-button-event-click"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    const result = handleAddToBagClick();
                    (window as any).dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
                    (window as any).dataLayer.push({
                      event: "Add To Cart",
                      ecommerce: {
                        currency: "USD",
                        value: Number(total),
                        total_product_price: Number(totalProductsPrice),
                        total_customization_price: Number(totalCustomizationPrice),
                        items: [
                          {
                            item_id: result.productToBag.id,
                            item_name: result.productToBag.title,
                            affiliation: "Google Merchandise Store",
                            item_brand: "Sport Zone",
                            item_category: product.product.product_categories.split("|")[0],
                            item_category2: product.product.sport,
                            item_variant: result.productToBag.colors,
                            price: Number(result.productToBag.price),
                            quantity: result.amount,
                          },
                        ],
                      },
                      // Your dataLayer push code here
                    });
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={handleAddToFav}
                  sx={{ px: "1.75rem", height: 40 }}
                >
                  {isFav ? (
                    <FavoriteOutlined color="primary" />
                  ) : (
                    <FavoriteBorderOutlined color={"inherit"} />
                  )}
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCustomizationClick}
                  sx={{ px: "1.75rem", height: 40 }}
                >
                  Customize
                </Button>
              </FlexBox>
            </Box>
          </Box>

          {/* SHOP NAME */}
          <FlexBox alignItems="center" gap={1} mb={2}>
            <div>Sold By:</div>
            <Link href="/">
              <H6>Sport Zone</H6>
            </Link>
          </FlexBox>

          {/* EDITS DETAIL */}
          <AditionalDetails
            detail={product}
            handleItemChange={handleItemChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
