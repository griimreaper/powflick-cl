// LOCAL CUSTOM COMPONENT
import PageWrapper from "../../page-wrapper";
import { Tags } from "models/types";
import TagsForm from "../tag-form";

export default function EditTagPageView({ tag, availableProducts }: { tag: Tags, availableProducts: string[] }) {
  return (
    <PageWrapper title="Edit Tag">
      <TagsForm tag={tag} availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
