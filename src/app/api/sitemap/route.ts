import { NextRequest, NextResponse } from "next/server";
import { getAllCategories, getAllProductSlugs } from "services/Products";
import { getCollections } from "services/Collections";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET(req: NextRequest) {
  try {
    const ids = await getAllProductSlugs();
    // Genera URLs con locales y etiquetas hreflang
    const productLinksFromIds = ids.flatMap((id: string) => [
      {
        url: `/en/products/${id}`,
        changefreq: "daily",
        priority: 0.8,
        links: [
          { lang: "en", url: `https://www.powflick.com/en/products/${id}` },
          { lang: "es", url: `https://www.powflick.com/es/products/${id}` },
          {
            lang: "x-default",
            url: `https://www.powflick.com/en/products/${id}`,
          },
        ],
      },
      {
        url: `/es/products/${id}`,
        changefreq: "daily",
        priority: 0.8,
        links: [
          { lang: "en", url: `https://www.powflick.com/en/products/${id}` },
          { lang: "es", url: `https://www.powflick.com/es/products/${id}` },
          {
            lang: "x-default",
            url: `https://www.powflick.com/en/products/${id}`,
          },
        ],
      },
    ]);

    // Categorías públicas
    const categories = await getAllCategories();
    const categoryLinks = categories.flatMap((name: string) => {
      const enc = encodeURIComponent(name);
      return [
        {
          url: `/en/products?category=${enc}`,
          changefreq: "weekly",
          priority: 0.6,
          links: [
            {
              lang: "en",
              url: `https://www.powflick.com/en/products?category=${enc}`,
            },
            {
              lang: "es",
              url: `https://www.powflick.com/es/products?category=${enc}`,
            },
            {
              lang: "x-default",
              url: `https://www.powflick.com/en/products?category=${enc}`,
            },
          ],
        },
        {
          url: `/es/products?category=${enc}`,
          changefreq: "weekly",
          priority: 0.6,
          links: [
            {
              lang: "en",
              url: `https://www.powflick.com/en/products?category=${enc}`,
            },
            {
              lang: "es",
              url: `https://www.powflick.com/es/products?category=${enc}`,
            },
            {
              lang: "x-default",
              url: `https://www.powflick.com/en/products?category=${enc}`,
            },
          ],
        },
      ];
    });

    // Colecciones públicas (si existen)
    let collectionLinks: any[] = [];
    try {
      const collections = await getCollections();
      if (Array.isArray(collections)) {
        collectionLinks = collections.flatMap((c: any) => {
          const slug = encodeURIComponent(c?.name || c?.slug || "collection");
          return [
            {
              url: `/en/products?collection=${slug}`,
              changefreq: "weekly",
              priority: 0.6,
              links: [
                {
                  lang: "en",
                  url: `https://www.powflick.com/en/products?collection=${slug}`,
                },
                {
                  lang: "es",
                  url: `https://www.powflick.com/es/products?collection=${slug}`,
                },
                {
                  lang: "x-default",
                  url: `https://www.powflick.com/en/products?collection=${slug}`,
                },
              ],
            },
            {
              url: `/es/products?collection=${slug}`,
              changefreq: "weekly",
              priority: 0.6,
              links: [
                {
                  lang: "en",
                  url: `https://www.powflick.com/en/products?collection=${slug}`,
                },
                {
                  lang: "es",
                  url: `https://www.powflick.com/es/products?collection=${slug}`,
                },
                {
                  lang: "x-default",
                  url: `https://www.powflick.com/en/products?collection=${slug}`,
                },
              ],
            },
          ];
        });
      }
    } catch {}

    // Productos + categorías + colecciones
    const links = [
      ...productLinksFromIds,
      ...categoryLinks,
      ...collectionLinks,
    ];

    // Crea un stream de Sitemap
    const stream = new SitemapStream({ hostname: "https://www.powflick.com" });

    // Convierte el stream a una promesa y obtiene el XML
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: any) => data.toString());

    // Devuelve la respuesta con el XML del sitemap
    return new NextResponse(xmlString, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
