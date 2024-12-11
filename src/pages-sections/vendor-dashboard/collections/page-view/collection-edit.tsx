// LOCAL CUSTOM COMPONENT
import CollectionForm from "../collection-form";
import PageWrapper from "../../page-wrapper";
import { Collection } from "models/types";

export default function EditCollectionPageView({ collection, availableProducts }: { collection: Collection, availableProducts: string[] }) {
  return (
    <PageWrapper title="Edit Collection">
      <CollectionForm collection={collection} availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
