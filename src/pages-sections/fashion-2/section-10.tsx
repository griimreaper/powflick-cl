import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { DataStructure, ProductDB } from "models/types";
import { Rating, styled } from "@mui/material";
import { Fragment } from "react";
import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { NavLink } from "components/nav-link";
import { H3, Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { currency } from "lib";
// STYLED COMPONENT
// CUSTOM DATA MODEL
interface Props {
  title: string;
  products: ProductDB[];
}

export const Wrapper = styled("div")(({ theme }) => ({
  gap: 16,
  display: "flex",
  marginBottom: 16,
  alignItems: "center",
  a: { flexShrink: 0 },
  ":last-of-type": { mb: 0 },
  ":hover": { img: { transform: "scale(1.1)" } },
  ".img-wrapper": {
    maxWidth: 100,
    display: "flex",
    borderRadius: 6,
    backgroundColor: theme.palette.grey[300],
    img: { transition: "0.3s" }
  }
}));

function ListBlock({ title, products }: Props) {
  return (
    <Fragment>
      <H3 mb={3}>{title}</H3>

      {products?.map((product) => (
        <Wrapper key={product.id}>
          <Link href={`/products/${product.slug}`}>
            <div className="img-wrapper">
              <LazyImage
                width={100}
                height={100}
                alt="product"
                src={product.URL}
              />
            </div>
          </Link>

          <div>
            <NavLink href="/">
              <Paragraph fontSize={16} mb={1}>
                {product.title}
              </Paragraph>
            </NavLink>

            <Paragraph fontWeight={700}>{currency(product.price)}</Paragraph>
            <Rating readOnly value={4} sx={{ fontSize: 14 }} />
          </div>
        </Wrapper>
      ))}
    </Fragment>
  );
}

export default async function Section10({ products }: { products: DataStructure['landing']['collections']}) {
  const {saleProducts, latestProducts, popularProducts, bestWeekProducts} = products;

  return (
    <Container className="pt-5 pb-5">
      <Grid container spacing={3}>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ListBlock title="Sale Products" products={saleProducts} />
        </Grid>

        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ListBlock title="Latest Products" products={latestProducts} />
        </Grid>

        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ListBlock title="Best of the Week" products={bestWeekProducts} />
        </Grid>

        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ListBlock title="Popular Products" products={popularProducts} />
        </Grid>
      </Grid>
    </Container>
  );
}
