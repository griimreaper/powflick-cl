// GLOBAL CUSTOM COMPONENTS
import Newsletter from "components/newsletter";
import Reviews from "components/Reviews/Reviews";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";
import { DataStructure } from "models/types";
import BannerTop from "components/BannerTop";

export default function FashionTwoPageView({ data }: { data: DataStructure }) {
  return (
    <div className="bg-white">
      <BannerTop props={""} textColor={""} />
      {/* HERO SECTION CAROUSEL */}
      <Section1 data={data?.navbar} />

      {/* SERVICE CARDS */}
      <Section2 />

      {/* BEST SELLING CATEGORIES */}
      <Section3 />

      {/* BEST SELLING PRODUCTS */}
      <Section4 products={data?.landing?.collections?.mostSoldProducts} />

      {/* OFFER BANNERS */}
      <Section5 />

      {/* Discount PRODUCTS */}
      <Section6 products={data?.landing?.collections?.discountProducts} />

      {/* SUMMER SALE OFFER AREA */}
      <Section7 />

      {/* BLOG LIST AREA */}
      <Section8 />

      {/* BRAND LIST CAROUSEL AREA */}
      <Section9 />

      {/* PRODUCT LIST COLUMN */}
      <Section10 products={data?.landing?.collections} />
      <Reviews review={data?.landing?.reviews} />
      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
    </div>
  );
}
