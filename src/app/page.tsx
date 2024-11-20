import ShopLayout1 from "components/layouts/shop-layout-1";
import { Metadata } from "next";
import FashionTwoPageView from "pages-sections/fashion-2/page-view";

export const metadata: Metadata = {
  title: "Sport Zone",
  description: `Sport Zone is a modern e-commerce for selling sports equipment and accessories.`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: [" "],
};

export default function FashionShopTwo() {
  return (
    <>
      <ShopLayout1>
        <FashionTwoPageView />;
      </ShopLayout1>
    </>
  );
}
