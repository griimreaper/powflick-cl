import { Metadata } from "next";
import PrivacyPage from "./Privacy";

export const metadata: Metadata = {
    title: "Privacy Policy - Pow Flick",
    alternates: {
        canonical: "https://www.powflick.com/en/privacy-policy",
        languages: {
            en: "https://www.powflick.com/en/privacy-policy",
            es: "https://www.powflick.com/es/privacy-policy",
            "x-default": "https://www.powflick.com/en/privacy-policy",
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
            <PrivacyPage />
        </>
    )
}
