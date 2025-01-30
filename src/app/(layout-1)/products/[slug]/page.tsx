import { Box, Typography } from "@mui/material";
import { detailProps } from "models/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { getAllProductSlugs, getProductsBySlug } from "services/Products";
import { cache } from "react";

const cacheMap = new Map<string, detailProps | null>(); // Capa de caché local

const getProductsBySlugCached = cache(async (slug: string): Promise<detailProps | null> => {
  if (cacheMap.has(slug)) {
    return cacheMap.get(slug)!; // Devuelve desde la caché si existe
  }

  const result = await getProductsBySlug(slug);
  cacheMap.set(slug, result); // Almacena en caché
  return result;
});

export const fetchCache = "force-cache"; // Forzar caché para evitar fetch adicionales
export const dynamic = "force-static"; // Fuerza el comportamiento estático
export const revalidate = 3600; // Revalidar cada 1 hora
export const dynamicParams = true;

// Helper: Maneja el caché de manera centralizada
async function fetchProductDetails(slug: string): Promise<detailProps | null> {
  return await getProductsBySlugCached(slug);
}

// Genera los parámetros estáticos para las rutas
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

// Genera metadatos dinámicos
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  try {
    const detail = await fetchProductDetails(params.slug);
    if (!detail || detail.product.status === "draft" || !detail.product.images) return;

    const { product } = detail;

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL as string),
      title: `${product.title} - Pow Flick`,
      authors: [{ name: "devcodelab" }],
      alternates: {
        canonical: "https://www.powflick.com/products/" + params.slug, // 🔹 URL CANÓNICA DETAIL
      },
      description: product.short_description || "Default Description",
      keywords: [
        "e-commerce",
        "e-commerce template",
        "next.js",
        "react",
        ...product.title.split(" "),
      ],
      openGraph: {
        title: product.title,
        description: product.short_description || "Default Description",
        url: `${process.env.NEXT_PUBLIC_API_URL}/${product.id}`,
        images: [
          {
            url: product.URL,
            width: 800,
            height: 800,
            alt: product.title || "Pow Flick",
          },
        ],
      },
      twitter: {
        card: "summary",
        title: product.title,
        description: product.short_description,
        images: product.URL,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return;
  }
}

// Página principal de detalles del producto
export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const detail = await fetchProductDetails(params.slug);

    if (!detail || detail.product.status === "draft" || !detail.product.images) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          py={5}
          textAlign="center"
        >
          <Typography variant="h5" color="textSecondary">
            Sorry, this product is not available.
          </Typography>
        </Box>
      );
    }

    return <ProductDetailsPageView detail={detail} />;
  } catch (error) {
    console.error("Error rendering product details:", error);
    notFound();
  }
}
