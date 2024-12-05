// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";

interface Props {
  collectionsList: string[],
  categoriesList: string[]
}

export default function ProductCreatePageView({ collectionsList, categoriesList }: Props) {
  return (
    <PageWrapper title="Add New Product">
      <ProductForm collectionsList={collectionsList} categoriesList={categoriesList} />
    </PageWrapper>
  );
}
