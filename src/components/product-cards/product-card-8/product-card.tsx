"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph, Small } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog";
// CUSTOM UTILS LIBRARY FUNCTION
import {
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
import Image from "next/image";
import { viewItem } from "../../../../fpixel";
import { useEffect, useState } from "react";

// ==============================================================
type Props = { product: ProductDB, active?: boolean };
// ==============================================================

export default function ProductCard8({ product, active = false }: Props) {
  const { slug, id, title, price, images, categories, discount } =
    product || {};
  const [isHovered, setIsHovered] = useState(false);
  const {
    openModal,
    toggleDialog,
    isFavorite,
    toggleFavorite,
  } = useProduct(id);

  let percentSale = Math.floor(
    100 - (product?.price / product?.regular_price) * 100
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hoverImages = images?.filter((i) => !i.includes("customization"));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && hoverImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === hoverImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000); // cambia cada 1 segundo
    } else {
      setCurrentImageIndex(0); // reset al salir del hover
    }

    return () => clearInterval(interval);
  }, [isHovered, hoverImages]);

  return (
    <Card>
      <CardMedia style={active ? { border: "1px solid #7B7B7B", background: 'white', } : {}}>
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
                    item_category: `${product.categories[0]?.name}`,
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
                    item_category: `${product.categories[0]?.name}`,
                    price: `${Number(product.price)}`,
                  },
                ],
              },
            });
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              overflow: "hidden",
            }}
          >
            {hoverImages?.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${title}-${index}`}
                fill
                style={{
                  position: "absolute",
                  objectFit: "cover",
                  transition: "opacity 0.5s ease",
                  opacity: index === currentImageIndex ? 1 : 0,
                }}
              />
            ))}
          </div>
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
        {categories ? (
          <Small color="grey.500" fontSize={{ xs: '3vw', sm: '2.2vw', md: '1.5vw', lg: '1vw' }}>{categories[0]?.name}</Small>
        ) : null}

        {/* PRODUCT TITLE / NAME */}
        <Paragraph color='primary.main' fontSize={{ xs: '3vw', sm: '2.2vw', md: '1.5vw', lg: '1vw' }} fontWeight="bold">
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
