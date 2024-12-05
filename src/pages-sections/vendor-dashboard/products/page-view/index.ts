import { ProductDB } from "models/types";

export { default as ProductsPageView } from "./products";
export { default as EditProductPageView } from "./product-edit";
export { default as ProductCreatePageView } from "./product-create";
export { default as ProductReviewsPageView } from "./product-reviews";

export interface ProductData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    products: ProductDB[];
    count: any
}
export interface Filters {
    search: string,
    page: number,
    limit: number,
    order: 'ASC' | 'DESC'
}

export interface paginationProps {
    page: number | null | undefined;
    prevPage: number | null | undefined;
    nextPage: number | null | undefined;
    totalPages: number | null | undefined,
    handlePage: (page: number) => void;
  }
  