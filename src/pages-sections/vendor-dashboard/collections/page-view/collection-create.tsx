// CUSTOM DATA MODEL
import CollectionForm from "../collection-form";
import PageWrapper from "../../page-wrapper";

export default function CreateCollectionPageView({ availableProducts }: { availableProducts: string[] }) {
  return (
    <PageWrapper title="Create New Collection">
      <CollectionForm availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
