// LOCAL CUSTOM COMPONENT
import PageWrapper from "../../page-wrapper";
import { Influencer } from "models/types";
import InfluencersForm from "../influencer-form";

export default function EditInfluencerPageView({ influencer, availableProducts }: { influencer: Influencer, availableProducts: { title: string, image: string, price: string }[] }) {
  return (
    <PageWrapper title="Edit Influencer">
      <InfluencersForm influencer={influencer} availableProducts={availableProducts} />
    </PageWrapper>
  );
}
