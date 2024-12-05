"use client";

import { Fragment, useEffect, useState } from "react";
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
import { useDashboardStore } from "store/dashboard";
import { ProductDB } from "models/types";

export default function WishListPageView() {
  const [page, setPage] = useState<number>(1);
  const { profile } = useDashboardStore();
  const [favoritesToShow, setFavoritesToShow] = useState<{ id: string, product: ProductDB }[]>([]);

  const PAGE_SIZE = 8;

  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const favoritesOnPage = profile?.favorites?.slice(startIndex, endIndex) || [];
    setFavoritesToShow(favoritesOnPage);
  }, [profile, page]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);  // Cambia la página
  };

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Wish List" Icon={Favorite} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {favoritesToShow.map(({ product: item }) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={4}
              imgUrl={item.images[0]}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION AREA */}
      <Pagination
        page={page}  // Pasa el estado `page` para que el componente de paginación lo controle
        count={Math.ceil(profile?.favorites?.length / PAGE_SIZE)}  // Número total de páginas basado en los productos
        onChange={handleChangePage}  // Función que maneja el cambio de página
      />
    </Fragment>
  );
}
