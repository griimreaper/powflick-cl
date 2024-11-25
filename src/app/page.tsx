import ShopLayout1 from "components/layouts/shop-layout-1";
import { DataStructure } from "models/types";
import { Metadata } from "next";
import FashionTwoPageView from "pages-sections/fashion-2/page-view";
import { getLanding } from "services/Landing";

export const revalidate = 86400 * 7;

export const metadata: Metadata = {
  title: "Sport Zone",
  description: `Sport Zone is a modern e-commerce for selling sports equipment and accessories.`,
  authors: [{ name: "Devcodelab", url: "https://ui-lib.com" }],
  keywords: [" "],
};

export default async function FashionShopTwo() {
  const data: DataStructure = await getLanding();
  return (
    <>
      <ShopLayout1 data={data}>
        <FashionTwoPageView data={data}/>;
      </ShopLayout1>
    </>
  );
}
