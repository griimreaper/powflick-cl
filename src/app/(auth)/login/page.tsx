import type { Metadata } from "next";
import { LoginPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Login - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function Login() {
  return <LoginPageView />;
}
