import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/dashboard/*",
        "/admin",
        "/admin/*",
        "/vendor",
        "/vendor/*",
        "/api",
        "/api/*",
      ],
    },
    sitemap: "https://www.powflick.com/sitemap.xml",
  };
}
