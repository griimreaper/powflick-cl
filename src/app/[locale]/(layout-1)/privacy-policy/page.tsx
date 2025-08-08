import { Metadata } from "next";
import PrivacyPage from "./Privacy";

export const metadata: Metadata = {
    title: "Privacy Policy - Pow Flick",
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
