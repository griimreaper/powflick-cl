import { Box, Typography } from "@mui/material";
import { detailProps } from "models/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { getAllProductSlugs, getProductsBySlug } from "services/Products";

export const revalidate = 86400; // 1 dia

export const dynamicParams = true;

// Genera los parámetros estáticos para las rutas
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs(); // Obtener todos los IDs de productos

  // Devuelve un array de objetos con los parámetros necesarios
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const id = params.id;

  if (!id) return;

  const { product } = await getProductsBySlug(id);

  if (!product.URL) return;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL as string),
    title: product.title + '- SportZone' || "SportZone",
    authors: [{ name: "devcodelab" }],
    description: product.short_description || "Default Description",
    keywords: [
      "e-commerce", "e-commerce template", "next.js", "react",
      ...product.title.split(" "),
    ],
    openGraph: {
      title: product.title || "Sport Zone",
      description: product.description || "Default Description",
      url: `${process.env.NEXT_PUBLIC_API_URL}/${product.id}`,
      images: [
        {
          url: product.Url,
          width: 800,
          height: 800,
          alt: product.title || "Sport Zone",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: product.title,
      description: product.description,
      images: product.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductDetails({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const detail: detailProps = await getProductsBySlug(slug);

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

    return (
      <ProductDetailsPageView
        detail={detail}
      />
    );
  } catch (error) {
    notFound();
  }
}
