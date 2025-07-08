import { Influencer } from "models/types";

export { default as InfluencerPageView } from "./influencers";
export { default as EditInfluencerPageView } from "./influencer-edit";
export { default as CreateInfluencerPageView } from "./influencer-create";

export interface InfluencersData {
    page: number;
    prevPage?: any;
    nextPage: number;
    totalPages: number;
    total: number;
    influencers: Influencer[];
}

export interface Filters {
    search: string,
    page: number,
    limit: number,
}
