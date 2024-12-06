// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { ProductDB } from "models/types";

interface Props {
  product: ProductDB,
  collectionsList: string[],
  categoriesList: string[]
}

export default function EditProductPageView({ product, collectionsList, categoriesList }: Props) {
  return (
    <PageWrapper title="Edit Product">
      <ProductForm product={product} collectionsList={collectionsList} categoriesList={categoriesList} />
    </PageWrapper>
  );
}
