import { Metadata } from "next";
import { TicketsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";

export const metadata: Metadata = {
  title: "Support Tickets - Pow Flick ",
  description: `Pow Flick support tickets page.`,
  authors: [{ name: "", url: "" }],
  keywords: ["", "", "", ""],
};

export default async function SupportTickets() {
  return <TicketsPageView />;
}
