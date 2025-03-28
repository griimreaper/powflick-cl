import { Tags } from "models/types";

export { default as TagsPageView } from "./tags";
export { default as EditTagsPageView } from "./tag-edit";
export { default as CreateTagsPageView } from "./tag-create";

export interface TagsData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    tags: Tags[];
}

export interface Filters {
    search: string,
    page: number,
    limit: number,
}
