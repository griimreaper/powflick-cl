import { Metadata } from "next";
import { InfluencerPageView } from "pages-sections/vendor-dashboard/influencers/page-view";

export const metadata: Metadata = {
  title: "Influencers - Pow Flick",
  description: ``,
  authors: [{ name: "devcodelab" }],
  keywords: [""]
};

export default async function Collections() {
  return <InfluencerPageView/>;
}
