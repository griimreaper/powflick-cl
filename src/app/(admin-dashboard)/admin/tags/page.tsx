import { Metadata } from "next";
import { TagsPageView } from "pages-sections/vendor-dashboard/tags/page-view";

export const metadata: Metadata = {
  title: "Tags - Pow Flick",
  description: ``,
  authors: [{ name: "devcodelab" }],
  keywords: [""]
};

export default async function Collections() {
  return <TagsPageView />;
}
