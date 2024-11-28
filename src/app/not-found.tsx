import { Metadata } from "next";
import { NotFoundPageView } from "pages-sections/not-found";

export const metadata: Metadata = {
  title: "404 - ",
  description: "Sport Zone Not Found Page View",
};

export default function NotFound() {
  return <NotFoundPageView />;
}
