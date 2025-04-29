import { FreeDesign } from "models/types";

export { default as FreeDesignPageView} from "./free-design";
export { default as FreeDesignDetail } from "./free-design-detail";

export interface DataFreeDesign {
    prevPage: number | null
    page: number | null,
    nextPage: number | null,
    totalPages: number | null,
    total: number,
    results: FreeDesign[],
}

export interface Filters {
    order: 'ASC' | 'DESC',
    filterBy: 'name' | 'email',
    search: string,
    page: number,
    limit: number,
}