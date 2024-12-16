import Link from "next/link";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import { H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { PriceText } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { ProductDB } from "models/types";

// ==============================================================
type Props = { product: ProductDB };
// ==============================================================

export default function ProductCard12({ product }: Props) {
  const { slug, title, URL, price, discount } = product || {};

  return (
    <Link href={`/products/${slug}`}>
      <FlexBox borderRadius={3} mb={2}>
        <LazyImage alt={title} width={380} height={379} src={URL} />
      </FlexBox>

      <div>
        <Rating readOnly value={4} size="small" precision={0.5} />
        <H6 fontSize={17} fontWeight={700}>
          {title}
        </H6>

        <PriceText>
          {discount ? <span className="base-price">{currency(price)}</span> : null}
          {calculateDiscount(price, discount)}
        </PriceText>
      </div>
    </Link>
  );
}
