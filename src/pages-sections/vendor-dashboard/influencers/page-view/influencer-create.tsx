// CUSTOM DATA MODEL
import PageWrapper from "../../page-wrapper";
import InfluencersForm from "../influencer-form";

export default function CreateInfluencerPageView({ availableProducts }: { availableProducts: string[] }) {
  return (
    <PageWrapper title="Create New Influencer">
      <InfluencersForm availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
