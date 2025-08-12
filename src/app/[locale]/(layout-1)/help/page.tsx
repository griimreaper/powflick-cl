import { Metadata } from "next";
import Faqs from "./Help";

export const metadata: Metadata = {
    title: "Help - Pow Flick",
    alternates: {
        canonical: "https://www.powflick.com/en/help",
        languages: {
            en: "https://www.powflick.com/en/help",
            es: "https://www.powflick.com/es/help",
            "x-default": "https://www.powflick.com/en/help",
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
            <Faqs />
        </>
    )
}
