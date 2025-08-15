// GLOBAL CUSTOM COMPONENTS
const Carousel = dynamic(() => import("components/carousel").then(m => m.Carousel), {
  ssr: false,
  loading: () => <p>Loading...</p> // Placeholder mientras carga
});

import CarouselCard1 from "components/carousel-cards/carousel-card-1";
import { DataStructure } from "models/types";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

export default function Section1({ data }: { data: DataStructure["navbar"] }) {
  const t = useTranslations("Home");
  const carouselData = [
    {
      title: t("carouselSlide1Title"),
      buttonLik: "/producto-1",
      buttonText: t("buyNow"),
      description: t("carouselSlide1Description"),
      imageUrl: "assets/images/banners/new/banner-web1.png",
    },
    {
      title: t("carouselSlide2Title"),
      buttonLik: "/producto-2",
      buttonText: t("buyNow"),
      description: t("carouselSlide2Description"),
      imageUrl: "assets/images/banners/new/banner-web2.png",
    },
    {
      title: t("carouselSlide3Title"),
      buttonLik: "/producto-3",
      buttonText: t("buyNow"),
      description: t("carouselSlide3Description"),
      imageUrl: "assets/images/banners/new/banner-web3.png",
    },
  ];

  return (
    <div>
      <Carousel
        dots
        spaceBetween={0}
        slidesToShow={1}
        arrows={false}
        autoplay={true}
        autoplaySpeed={3000}
        infinite={true}
      >
        {carouselData.map((item, ind) => (
          <CarouselCard1
            key={ind}
            buttonColor="dark"
            title={item.title}
            imgUrl={item.imageUrl}
            buttonLik={item.buttonLik}
            buttonText={item.buttonText}
            description={item.description}
          />
        ))}
      </Carousel>
    </div>
  );
}
