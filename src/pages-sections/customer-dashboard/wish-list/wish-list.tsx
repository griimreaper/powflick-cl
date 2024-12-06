"use client";

import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite";
// LOCAL CUSTOM HOOK
import useWishList from "./use-wish-list";
// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// Local CUSTOM COMPONENT
import Pagination from "../pagination";
import DashboardHeader from "../dashboard-header";

// ==================================================================
type Props = { totalProducts: number; products: Product[] | any};
// ==================================================================

export default function WishListPageView(props: Props) {
  const { totalProducts, products } = props;
  const { currentPage, handleChangePage } = useWishList();

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products.map((item: any) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={4}
              imgUrl={item.URL}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <Pagination
        page={currentPage}
        count={Math.ceil(totalProducts / 6)}
        onChange={(_, page) => handleChangePage(page)}
      />
    </Fragment>
  );
}
