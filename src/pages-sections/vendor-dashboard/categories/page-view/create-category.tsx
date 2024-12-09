// LOCAL CUSTOM COMPONENT
import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";

export default function CreateCategoryPageView({ availableProducts }: { availableProducts: string[] }) {
  return (
    <PageWrapper title="Create Category">
      <CategoryForm availableProducts={availableProducts} />
    </PageWrapper>
  );
}
