"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM COMPONENTS
import {
  AddToCartButton,
  Card,
  CardMedia,
  FavoriteButton,
  QuickViewButton,
} from "./styles";
// CUSTOM DATA MODEL
import { ProductDB } from "models/types";
import Marquee from "react-fast-marquee";
import ProductPrice from "components/product-cards/product-price";
import DiscountChip from "../discount-chip";
import { BorderBox } from '../../page-sidenav/side-navbar/styles/index';
import { themeColors } from "theme/theme-colors";
import Image from "next/image";
import { track } from "react-facebook-pixel";
import { viewItem } from "../../../../fpixel";


// ==============================================================
type Props = { product: ProductDB, active?: boolean };
// ==============================================================

export default function ProductCard8({ product, active=false }: Props) {
  const { slug, id, title, price, URL, images, product_categories, discount } =
    product || {};

  const {
    cartItem,
    handleCartAmountChange,
    openModal,
    toggleDialog,
    isFavorite,
    toggleFavorite,
  } = useProduct(id);

  // HANDLE ADD TO CART PRODUCT
  const handleAddToCart = () => {
    const payload = {
      id,
      slug,
      price,
      name: title,
      imgUrl: URL,
      qty: (cartItem?.qty || 0) + 1,
    };

    handleCartAmountChange(payload);
  };

  let percentSale = Math.floor(
    100 - (product?.price / product?.regular_price) * 100
  );
  let percentSold = Math.floor((product?.selled / 1) * 100);

  return (
    <Card>
      <CardMedia style={active ? { border: "1px solid #7B7B7B",background: 'transparent', } : {}}>
        <DiscountChip discount={discount} />
        <Link
          href={`/products/${slug}`}
          onClick={() => {
            (window as any).dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
            (window as any).dataLayer.push({
              event: "View item",
              ecommerce: {
                items: [
                  {
                    item_id: `${product.id}`,
                    item_name: `${product.title}`,
                    item_list_name: `${product.slug}`,
                    discount: `${product.discount}`,
                    item_category: `${product.product_categories.split("|")[0]}`,
                    price: `${Number(product.price)}`,
                  },
                ],
              },
            });

              viewItem("View item", {
                ecommerce: {
                  items: [
                    {
                      item_id: `${product.id}`,
                      item_name: `${product.title}`,
                      item_list_name: `${product.slug}`,
                      discount: `${product.discount}`,
                      item_category: `${product.product_categories.split("|")[0]}`,
                      price: `${Number(product.price)}`,
                    },
                  ],
                },
              });
          }}
        >
          <Image
            width={300}
            height={300}
            layout="responsive"
            alt="category"
            className="product-img"
            loading="lazy"
            src={URL}
          />
        </Link>
        {discount !== 0 && (
          <>
            <Marquee
              className="banner-sale-auto"
              style={{
                backgroundColor: "black",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "0.8rem 0",
                height: "1px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "0 2.5rem",
                }}
              >
                Hot Sale {percentSale}% OFF
              </div>
              {/* <Icon.Lightning weight="fill" className="text-red" /> */}
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "0 2.5rem",
                }}
              >
                Hot Sale {percentSale}% OFF
              </div>
              {/* <Icon.Lightning weight="fill" className="text-red" /> */}
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "0 2.5rem",
                }}
              >
                Hot Sale {percentSale}% OFF
              </div>
              {/* <Icon.Lightning weight="fill" className="text-red" /> */}
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "0 2.5rem",
                }}
              >
                Hot Sale {percentSale}% OFF
              </div>
              {/* <Icon.Lightning weight="fill" className="text-red" /> */}
              <div
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "0 2.5rem",
                }}
              >
                Hot Sale {percentSale}% OFF
              </div>
            </Marquee>
          </>
        )}

        {/* ADD TO CART BUTTON */}
        {/* <AddToCartButton className="product-actions" onClick={handleAddToCart}>
          <AddShoppingCart className="icon" fontSize="small" />
        </AddToCartButton> */}

        {/* PRODUCT FAVORITE BUTTON */}
        <FavoriteButton
          className="product-actions"
          onClick={() => toggleFavorite()}
        >
          {isFavorite ? (
            <Favorite className="icon" fontSize="small" color="primary" />
          ) : (
            <FavoriteBorder className="icon" fontSize="small" />
          )}
        </FavoriteButton>

        {/* PRODUCT QUICK VIEW BUTTON */}
        <Box mx={1} position="relative">
          <QuickViewButton
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            className="product-view-action"
            onClick={toggleDialog}
          >
            Quick View
          </QuickViewButton>
        </Box>
      </CardMedia>

      {/* PRODUCT VIEW DIALOG BOX */}
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={product}
      />

      <Box p={1} textAlign="center">
        {/* PRODUCT CATEGORY */}
        {product_categories?.split("|").length > 0 ? (
          <Small color="grey.500">{product_categories.split("|")[0]}</Small>
        ) : null}

        {/* PRODUCT TITLE / NAME */}
        <Paragraph color='primary.main' fontWeight="bold">
          {title}
        </Paragraph>

        {/* PRODUCT PRICE  */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ProductPrice discount={discount} price={price} />
        </div>

        {/* PRODUCT RATING / REVIEW  */}

        {/* <FlexRowCenter gap={1}> */}
        {/* <Rating name="read-only" value={4} readOnly sx={{ fontSize: 16 }} /> */}
        {/* <Small fontWeight={600} color="grey.500"> */}
        {/* ({reviews.length} Reviews) */}
        {/* </Small> */}
        {/* </FlexRowCenter> */}
      </Box>
    </Card>
  );
}
