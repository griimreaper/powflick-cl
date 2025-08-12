import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.powflick.com";
  const staticPages = [
    "",
    "products",
    "about-us",
    "privacy-policy",
    "terms-condition",
    "return-refund",
    "shipping",
    "your-design",
    "contact",
    "help",
    "blog",
    "customization-guide",
    // Si agregas nuevas rutas estáticas, añádelas aquí
    // No incluir rutas legacy sin /en o /es
    "cart",
    "checkout",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const slug of staticPages) {
    const enUrl = `${base}/en${slug ? `/${slug}` : ""}`;
    const esUrl = `${base}/es${slug ? `/${slug}` : ""}`;
    entries.push({
      url: enUrl,
      changeFrequency: "weekly",
      priority: slug ? 0.7 : 1,
      alternates: { languages: { en: enUrl, es: esUrl } },
    });
    entries.push({
      url: esUrl,
      changeFrequency: "weekly",
      priority: slug ? 0.7 : 1,
      alternates: { languages: { en: enUrl, es: esUrl } },
    });
  }

  return entries;
}
