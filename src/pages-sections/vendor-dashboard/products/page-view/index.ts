import { ProductDB, Review } from "models/types";

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

export interface ReviewsData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    reviews: Review[];
    count: any
}
export interface Filters {
    search: string,
    page: number,
    limit: number,
    order: 'ASC' | 'DESC'
    orderBy: 'collection' | 'tag' | 'createdAt'
}

export interface FiltersReview {
    limit: number;
    page: number;
    search: '',
    isActive?: 'true' | 'false' | ''
    type?: 'ORDER' | 'PRODUCT' | null
    rating?: '1' | '2' | '3' | '4' | '5' | ''
}

export interface paginationProps {
    page: number | null | undefined;
    prevPage: number | null | undefined;
    nextPage: number | null | undefined;
    totalPages: number | null | undefined,
    handlePage: (page: number) => void;
  }
  