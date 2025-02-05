import { Metadata } from "next";
import { NotFoundPageView } from "pages-sections/not-found";

export const metadata: Metadata = {
  title: "404 - Pow Flick",
  description: "Pow Flick Not Found Page View",
};

export default function NotFound() {
  return <NotFoundPageView />;
}
