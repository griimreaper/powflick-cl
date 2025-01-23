"use client";

import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterList from "@mui/icons-material/FilterList";
// GLOBAL CUSTOM COMPONENTS
import SideNav from "components/side-nav";
import ProductsGridView from "components/products-view/products-grid-view";
// Local CUSTOM COMPONENTS
import ShopIntroCard from "../shop-intro-card";
import ProductFilterCard from "../../product-details/product-filter-card";
// CUSTOM DATA MODEL
import Shop from "models/Shop.model";

// ============================================================
type Props = { shop: Shop };
// ============================================================

export default function ShopDetailsPageView({ shop }: Props) {
  const isDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Container className="mt-2 mb-3">
      {/* SHOP INTRODUCTION AREA */}
      <ShopIntroCard
        name={shop.name}
        phone={shop.phone}
        address={shop.address}
        coverPicture={shop.coverPicture}
        profilePicture={shop.profilePicture}
      />

    </Container>
  );
}
