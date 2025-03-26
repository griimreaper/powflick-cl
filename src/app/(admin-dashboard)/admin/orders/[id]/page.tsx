import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/vendor-dashboard/orders/page-view";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";
import { getOrder } from "services/dashboardAdmin/orders";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Order Details - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function OrderDetails({ params }: IdParams) {
  try {
    const session = await getServerSession();
    let token = session?.user?.name?.split("|")[0];
    const data = await getOrder(params.id, token as string);

    return <OrderDetailsPageView data={data} />;
  } catch (error) {
    notFound();
  }
}
