import InfluencerStore from 'pages-sections/vendor-dashboard/influencers/InfluencerStore';
import { getInfluencerWithProducts } from 'services/Influencers';

interface Props {
    params: { label: string };
}

export default async function InfluencerPage({ params }: Props) {
    const response = await getInfluencerWithProducts(params.label);

    const influencer = response.influencer

    return (
        <InfluencerStore
            values={{
                label: influencer.label,
                title: influencer.title,
                description: influencer.description,
            }}
            logoPreview={influencer.logo}
            bannerPreview={influencer.banner}
            products={influencer.products}
            influencersLabel={response.influencersLabel}
        />
    );
}
