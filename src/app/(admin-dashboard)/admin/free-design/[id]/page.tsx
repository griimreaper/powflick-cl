import { Metadata } from "next";
import { FreeDesignDetail } from "pages-sections/vendor-dashboard/free-design/page-view";
// CUSTOM DATA MODEL
import { getServerSession } from "next-auth";
import { getOneFreeDesign } from "services/FreeDesign";

export const metadata: Metadata = {
    title: "Free Design Detail - Pow Flick",
    description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function FreeDesignDetails({ params }: any) {
    const session = await getServerSession();
    let token = session?.user?.name?.split("|")[0];
    const freeDesign = await getOneFreeDesign(token as string, params.id);

    return <FreeDesignDetail id={params.id} freeDesign={freeDesign} />;
}
