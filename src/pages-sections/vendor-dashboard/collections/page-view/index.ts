import { Collection } from "models/types";

export { default as CollectionsPageView } from "./collections";
export { default as EditCollectionPageView } from "./collection-edit";
export { default as CreateCollectionPageView } from "./collection-create";

export interface CollectionsData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    collections: Collection[];
}

export interface Filters {
    search: string,
    page: number,
    limit: number,
}
