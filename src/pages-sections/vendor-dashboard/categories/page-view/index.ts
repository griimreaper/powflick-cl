export { default as CategoriesPageView } from "./categories";
export { default as EditCategoryPageView } from "./category-edit";
export { default as CreateCategoryPageView } from "./create-category";

export interface CategoriesData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    categories: {
        id: string;
        name: string
    }[];
}

export interface Filters {
    search: string,
    page: number,
    limit: number,
}
