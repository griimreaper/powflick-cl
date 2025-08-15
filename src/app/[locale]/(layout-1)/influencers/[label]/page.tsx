import { Metadata } from 'next';
import InfluencerStore from 'pages-sections/vendor-dashboard/influencers/InfluencerStore';
import { getInfluencerWithProducts } from 'services/Influencers';

interface Props {
    params: { label: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await getInfluencerWithProducts(params.label);
    const influencer = response.influencer;

    return {
        title: `${influencer.label} - Pow Flick`,
        description: influencer.description || 'Discover influencer products on Pow Flick.',
        keywords: [
            'sportswear',
            'influencer',
            'customizable uniforms',
            'Pow Flick',
            'e-commerce',
            influencer.label,
        ],
        authors: [{ name: 'devcodelab' }],
        openGraph: {
            title: `${influencer.label} - Pow Flick`,
            description: influencer.description,
            images: [influencer.banner], // Usa imagen del influencer como OG
        },
    };
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
                socialMedia: influencer.socialMedia,
            }}
            logoPreview={influencer.logo}
            profileImage={influencer.profileImage}
            bannerPreview={influencer.banner}
            products={influencer.products}
        />
    );
}
