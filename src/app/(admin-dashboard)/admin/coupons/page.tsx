import { Metadata } from "next";
import CouponsPageView from "pages-sections/vendor-dashboard/coupons/page-view/coupons";

export const metadata: Metadata = {
    title: "Coupons - Pow Flick",
    description: "Administra todos los cupones de la tienda.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "coupons", "admin", "next.js", "react"],
};

export default async function Coupons() {
    return <CouponsPageView />;
}
