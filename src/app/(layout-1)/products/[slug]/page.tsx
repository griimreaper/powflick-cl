import { Box, Typography } from "@mui/material";
import { detailProps } from "models/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { getAllProductSlugs, getProductsBySlug } from "services/Products";
import { getCache, setCache } from "utils/cache";

export const revalidate = 86400; // 1 dia

// Genera los parámetros estáticos para las rutas
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs(); // Obtener todos los IDs de productos

  // Devuelve un array de objetos con los parámetros necesarios
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const id = params.slug;

  if (!id) return;

  // Intentar obtener datos del caché
  let detail = getCache<detailProps>(id);

  if (!detail) {
    // Si no están en caché, obtenerlos y almacenarlos
    detail = await getProductsBySlug(id);
    if (!detail) return; // Si no se pueden obtener detalles, no generar metadata
    setCache(id, detail);
  }

  const { product } = detail;

  if (product.status === 'draft' || !product.images) return;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL as string),
    title: product.title + "- SportZone" || "SportZone",
    authors: [{ name: "devcodelab" }],
    description: product.short_description || "Default Description",
    keywords: [
      "e-commerce",
      "e-commerce template",
      "next.js",
      "react",
      ...product.title.split(" "),
    ],
    openGraph: {
      title: product.title || "Sport Zone",
      description: product.short_description || "Default Description",
      url: `${process.env.NEXT_PUBLIC_API_URL}/${product.id}`,
      images: [
        {
          url: product.URL,
          width: 800,
          height: 800,
          alt: product.title || "Sport Zone",
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
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = params;

    // Obtener detalles del producto del caché
    let detail: detailProps | null = getCache<detailProps>(slug);

    if (!detail) {
      // Si no están en caché, obtenerlos y almacenarlos
      detail = await getProductsBySlug(slug);
      if (!detail) {
        throw new Error("Product details could not be fetched");
      }
      setCache(slug, detail);
    }

    if (detail.product.status === 'draft' || !detail.product.images) {
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
    notFound();
  }
}
