import { ContactType, Message } from "models/types";

export { default as MessagesPageView} from "./messages";
// export { default as MessageDetailsPageView } from "./order-details";

export interface DataMessage {
    prevPage: number | null
    page: number | null,
    nextPage: number | null,
    totalPages: number | null,
    total: number,
    messages: Message[],
}

export interface Filters {
    orderByDate: 'ASC' | 'DESC',
    showAnswered: boolean | null,
    category: 'Complaint or Claim' | "Help with an Order" | 'Help with Page Functionality' | 'General Help',
    filterBy: 'name' | 'email',
    search: string,
    page: number,
    limit: number,
}