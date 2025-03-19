import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TicketDetailsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";
import { getOneMessage } from "services/dashboardAdmin/messages";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Messages Detail - Pow Flick",
    description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function MessagesDetails({ params }: any) {
    const session = await getServerSession();
    let token = session?.user?.name?.split("|")[0];
    const message = await getOneMessage(params.id, token as string)

    return <TicketDetailsPageView id={params.id} message={message} />;
}
