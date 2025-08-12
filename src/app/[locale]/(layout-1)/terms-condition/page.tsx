import { Metadata } from "next";
import TermsPage from "./Terms";

export const metadata: Metadata = {
    title: "Terms & Conditions - Pow Flick",
    alternates: {
        canonical: "https://www.powflick.com/en/terms-condition",
        languages: {
            en: "https://www.powflick.com/en/terms-condition",
            es: "https://www.powflick.com/es/terms-condition",
            "x-default": "https://www.powflick.com/en/terms-condition",
        }
    },
    description:
        "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};


export default function Page() {
    return (
        <>
            <TermsPage />
        </>
    )
}
