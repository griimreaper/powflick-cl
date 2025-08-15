import { Metadata } from "next";
import CustomizationGuide from "./CustomizationGuide";

export const metadata: Metadata = {
    title: "Customization Guide - Pow Flick",
    alternates: {
        canonical: "https://www.powflick.com/en/customization-guide",
        languages: {
            en: "https://www.powflick.com/en/customization-guide",
            es: "https://www.powflick.com/es/customization-guide",
            "x-default": "https://www.powflick.com/en/customization-guide",
        }
    },
    description: "shows a tutorial on how to customize",
    keywords: ["e-commerce", "customization", "admin", "next.js", "react"],
};

export default async function Coupons() {
    return <CustomizationGuide />;
}
