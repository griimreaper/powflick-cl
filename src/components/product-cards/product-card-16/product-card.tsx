import Link from "next/link";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import { H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { PriceText } from "./styles";
import DiscountChip from "../discount-chip";
import useProduct from "../use-product";
import { ProductDB } from "models/types";
import { viewItem } from "../../../../fpixel";

// ==============================================================
type Props = { product: ProductDB };
// ==============================================================

export default function ProductCard16({ product }: Props) {
  const { slug, title, URL, price, discount, id } = product || {};

  const { cartItem, handleCartAmountChange } = useProduct(slug);

  const handleIncrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      name: title,
      imgUrl: URL,
      qty: (cartItem?.qty || 0) + 1,
    };
    handleCartAmountChange(product);
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      name: title,
      imgUrl: URL,
      qty: (cartItem?.qty || 0) - 1,
    };
    handleCartAmountChange(product, "remove");
  };

  return (
    <div>
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
                  discount: `${product.discount}`,
                  item_list_name: `${product.slug}`,
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
        <FlexBox
          position="relative"
          bgcolor="transparent"
          borderRadius={3}
          mb={2}
        >
          {URL ? (
            <LazyImage alt={title} width={380} height={379} src={URL} />
          ) : (
            <div>No image available</div>
          )}
          {discount ? (
            <DiscountChip discount={discount} sx={{ left: 20, top: 20 }} />
          ) : null}
        </FlexBox>
      </Link>

      <FlexBetween alignItems="flex-end">
        <div>
          <Link href={`/products/${slug}`}>
            <H6 fontWeight={700} mb={1}>
              {title}
            </H6>
          </Link>

          <Rating readOnly value={4} size="small" precision={0.5} />

          <PriceText>
            {discount ? (
              <span className="base-price">{currency(price)}</span>
            ) : null}
            {calculateDiscount(price, discount)}
          </PriceText>
        </div>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        {/* <QuantityButtons
          quantity={cartItem?.qty || 0}
          handleIncrement={handleIncrementQuantity}
          handleDecrement={handleDecrementQuantity}
        /> */}
      </FlexBetween>
    </div>
  );
}
