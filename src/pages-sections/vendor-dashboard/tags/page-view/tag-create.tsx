// CUSTOM DATA MODEL
import PageWrapper from "../../page-wrapper";
import TagsForm from "../tag-form";

export default function CreateTagsPageView({ availableProducts }: { availableProducts: string[] }) {
  return (
    <PageWrapper title="Create New Tag">
      <TagsForm availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
