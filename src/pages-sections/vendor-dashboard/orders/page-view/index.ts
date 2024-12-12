import { Order } from "models/types";

export { default as OrdersPageView } from "./orders";
export { default as OrderDetailsPageView } from "./order-details";

export interface DataOrders {
    orders: Order[],
    totalOrders: number,
    totalPages: number,
    page: number,
    prevPage: number,
    nextPage: number,
}

export interface Filters {
    order: 'ASC' | 'DESC',
    status: string,
    filterBy: 'USER' | 'PRODUCT',
    search: string,
    page: number,
    limit: number,
}