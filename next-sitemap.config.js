/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.powflick.com/",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  exclude: [
    "/en/dashboard/*",
    "/es/dashboard/*",
    "/dashboard/*",
    "/dashboard",
    "/admin",
    "/admin/*",
    "/vendor",
    "/vendor/*",
    "/en/api/*",
    "/es/api/*",
    "/api/*",
    "/api",
    "/cart",
    "/cart/*",
    "/checkout",
    "/checkout/*",
    "/thanks-for-buying",
    "/thanks-for-buying/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/en/dashboard/*",
          "/es/dashboard/*",
          "/dashboard/*",
          "/dashboard",
          "/admin",
          "/admin/*",
          "/vendor",
          "/vendor/*",
          "/en/api/*",
          "/es/api/*",
          "/api/*",
          "/api",
        ],
      },
    ],
    // Sitemap adicional dinámico con productos y hreflang
    additionalSitemaps: ["https://www.powflick.com/api/sitemap"],
  },
  transform: async (config, path) => {
    // Evita duplicados sin prefijo cuando usamos locales obligatorios en middleware
    if (path === "/") return { loc: "/en" };
    return { loc: path };
  },
};
