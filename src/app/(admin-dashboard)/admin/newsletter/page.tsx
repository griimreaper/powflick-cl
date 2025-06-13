import { Metadata } from "next";
import NewsletterPage from "pages-sections/vendor-dashboard/newsletter/page";

export const metadata: Metadata = {
    title: "NewsLetter - Pow Flick",
    description: "Administra todos los newsletter de la tienda.",
    keywords: ["e-commerce", "newsletter", "admin", "next.js", "react"],
};

export default async function Coupons() {
    return <NewsletterPage />;
}
