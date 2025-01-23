import { Metadata } from "next";
import CollectionsPageView from "pages-sections/vendor-dashboard/collections/page-view/collections";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Collections - Pow Flick",
  description: ``,
  authors: [{ name: "devcodelab" }],
  keywords: [""]
};

export default async function Collections() {
  return <CollectionsPageView />;
}
