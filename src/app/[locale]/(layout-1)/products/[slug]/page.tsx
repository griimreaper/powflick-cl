import { Box, Typography } from "@mui/material";
import { detailProps } from "models/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { getAllProductSlugs, getProductsBySlug } from "services/Products";
import { cache } from "react";
import ProductSeo from "./ProductSeo";
import ProductPasswordForm from "./passwordForm";
import { setStructuredData } from "@/app/[locale]/StructuredData";

export const revalidate = 360;
export const dynamic = "force-dynamic"; // Permite cargar productos nuevos dinámicamente

const cacheMap = new Map<string, { data: detailProps | null; expiry: number }>();
const CACHE_DURATION = 5 * 60; // 300000ms (5 minutos)

const getProductsBySlugCached = cache(async (slug: string): Promise<detailProps | null> => {
  const cached = cacheMap.get(slug);
  const now = Date.now();

  if (cached && cached.expiry > now) {
    return cached.data; // Devuelve desde caché si no ha expirado
  }

  const result = await getProductsBySlug(slug);
  cacheMap.set(slug, { data: result, expiry: now + CACHE_DURATION }); // Guarda en caché con tiempo de expiración

  return result;
});


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

    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product?.title,
      "description": product?.short_description || "Default Description",
      "image": product?.images.map((img: string) => img), // Array de imágenes
      "brand": {
        "@type": "Brand",
        "name": "Pow Flick"
      },
      "sku": product?.slug || "",
      "offers": {
        "@type": "Offer",
        "url": `https://www.powflick.com/products/${params.slug}`,
        "priceCurrency": "USD",
        "price": product?.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };

    const baseKeywords = [
      "buy pow flick jerseys",
      "custom jerseys usa store",
      "basketball uniforms with logos",
      "football shirts for youth teams",
      "design custom sports shirts",
      "fan gear personalized",
      "pow flick sportswear shop",
      "jerseys with team colors",
      "jerseys for amateur sports teams",
      "pow flick custom apparel",
      "add your name to jersey",
      "bulk order custom jerseys",
      "custom soccer kits fast delivery",
      "best quality sports jerseys online",
      "team merchandise personalized",
      "custom made fan jerseys",
      "jerseys for local teams",
      "sports jersey designer",
      "pow flick e-commerce store",
      "jerseys with numbers and logos",
      "where to buy custom basketball jerseys online",
      "cheap personalized football jerseys for team",
      "buy custom baseball jerseys with name and number",
      "high quality sports uniforms for amateur teams",
      "design your own custom soccer jersey online",
      "custom hockey jerseys with fast shipping USA",
      "custom training gear for sports teams",
      "order personalized sportswear for school teams",
      "custom jersey store with fast delivery",
      "custom sports apparel with logo printing",
      "personalized jerseys for fans and players",
      "buy team jerseys with custom embroidery",
      "create your own sports uniform for tournaments",
      "team name and number printed jerseys online",
      "high quality jersey printing for clubs",
      "fully customizable sports apparel shop",
      "premium jersey material for custom orders",
      "online jersey customization service USA",
      "team kits with bulk discount custom logos",
      "custom sports clothing for athletes and fans",
      "custom basketball jersey",
      "football jersey online",
      "buy custom soccer kit",
      "high quality sportswear",
      "personalized team jersey",
      "sports jersey shop",
      "customized baseball jersey",
      "basketball team uniform",
      "custom team sportswear",
      "buy sports jersey",
      "custom hockey jersey",
      "team shirts with name",
      "soccer shirt with number",
      "cheap custom jerseys",
      "high performance jersey",
      "training apparel for teams",
      "online jersey printing",
      "personalized fan apparel",
      "custom made sports gear",
      "premium sports jerseys",
      "jersey",
      "custom jersey",
      "sportswear",
      "team uniform",
      "athletic gear",
      "pow flick",
      "buy jersey",
      "custom gear",
      "sports gear",
      "sports jersey",
      "jersey online",
      "teamwear",
      "custom apparel",
      "sport shirt",
      "fan jersey",
      "game jersey",
      "training jersey",
      "match gear",
      "pro jersey",
      "player jersey",
    ];

    const dinamycKeywords: any = [
      ...product.title.split(" "),
      ...product.tags,
      ...product.categories,
      ...product.collections,
    ]

    return {
      metadataBase: new URL(process.env.NEXTAUTH_URL as string),
      title: `${product.title} - Pow Flick`,
      authors: [{ name: "devcodelab" }],
      alternates: {
        canonical: "https://www.powflick.com/products/" + params.slug, // 🔹 URL CANÓNICA DETAIL
      },
      description: product.short_description || "Default Description",
      keywords: [
        ...baseKeywords,
        ...dinamycKeywords,
      ],
      openGraph: {
        title: product.title,
        description: product.short_description || "Default Description",
        url: `${process.env.NEXTAUTH_URL}/${product.slug}`,
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
      other: {
        "structured-data": JSON.stringify(structuredData),
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
  searchParams,
}: {
  params: { slug: string };
  searchParams: { password?: string };
}) {
  try {
    const detail = await fetchProductDetails(params.slug);

    const product = detail?.product;

    console.log("product details:", product);


    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product?.title,
      "description": product?.short_description || "Default Description",
      "image": product?.images.map((img: string) => img),
      "brand": {
        "@type": "Brand",
        "name": "Pow Flick"
      },
      "sku": product?.slug || "",
      "productID": product?.id?.toString() || product?.slug || "",
      "category": product?.categories[0]?.name || "Sportswear",
      "offers": {
        "@type": "Offer",
        "url": `https://www.powflick.com/products/${params.slug}`,
        "priceCurrency": "USD",
        "price": product?.price?.toString() || "0.00",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
    };

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

    const hasPassword = !!detail.product.password;

    // 🔐 Si tiene contraseña y la query no coincide, mostrar formulario
    if (hasPassword && searchParams.password !== detail.product.password) {
      return (
        <ProductPasswordForm
          slug={params.slug}
          productPassword={detail.product.password}
        />
      );
    }

    setStructuredData([structuredData]);

    // ✅ Contraseña válida o no se requiere
    return (
      <>
        <ProductSeo product={detail.product} />
        <ProductDetailsPageView detail={detail} />
      </>
    );
  } catch (error) {
    console.error("Error rendering product details:", error);
    notFound();
  }
}
