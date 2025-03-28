// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { ProductDB } from "models/types";

interface Props {
  product: ProductDB,
  collectionsList: string[],
  categoriesList: string[]
  tagList: string[]
}

export default function EditProductPageView({ product, collectionsList, categoriesList, tagList }: Props) {
  return (
    <PageWrapper title="Edit Product">
      <ProductForm product={product} collectionsList={collectionsList} categoriesList={categoriesList} tagList={tagList} />
    </PageWrapper>
  );
}
