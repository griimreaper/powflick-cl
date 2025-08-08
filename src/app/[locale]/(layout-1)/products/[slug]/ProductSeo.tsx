"use client";
import { ProductDB } from "models/types";
import { ProductJsonLd } from "next-seo";

const ProductSeo = ({ product }: { product: ProductDB }) => {
    return (
        <ProductJsonLd
            productName={product.title}
            description={product.short_description}
            brand="Pow Flick"
            images={product.images}
            sku={product.slug}
            offers={[
                {
                    price: product.price.toString(),
                    priceCurrency: "USD",
                    url: `https://www.powflick.com/products/${product.slug}`,
                    availability: "https://schema.org/InStock",
                    itemCondition: "https://schema.org/NewCondition"
                }
            ]}
        />
    );
};

export default ProductSeo;
