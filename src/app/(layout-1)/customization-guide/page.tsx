import { Metadata } from "next";
import CustomizationGuide from "./CustomizationGuide";

export const metadata: Metadata = {
    title: "Customization Guide - Pow Flick",
    description: "shows a tutorial on how to customize",
    keywords: ["e-commerce", "customization", "admin", "next.js", "react"],
};

export default async function Coupons() {
    return <CustomizationGuide />;
}
