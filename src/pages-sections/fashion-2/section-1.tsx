// GLOBAL CUSTOM COMPONENTS
const Carousel = dynamic(() => import("components/carousel").then(m => m.Carousel), {
  ssr: false,
  loading: () => <p>Loading...</p> // Placeholder mientras carga
});

import CarouselCard1 from "components/carousel-cards/carousel-card-1";
import { DataStructure } from "models/types";
import dynamic from "next/dynamic";

export default function Section1({ data }: { data: DataStructure["navbar"] }) {
  const carouselData = [
    {
      title: "¡Descubre el poder del estilo!",
      buttonLik: "/producto-1",
      buttonText: "Comprar ahora",
      description:
        "Luce increíble con nuestras zapatillas Nike negras. ¡No te las pierdas!",
      imageUrl: "assets/images/banners/new/banner-web1.png",
    },
    {
      title: "¡Mantente conectado con estilo!",
      buttonLik: "/producto-2",
      buttonText: "Comprar ahora",
      description:
        "El Apple Watch que combina tecnología y elegancia. ¡Consíguelo ya!",
      imageUrl: "assets/images/banners/new/banner-web2.png",
    },
    {
      title: "¡Corre con confianza!",
      buttonLik: "/producto-3",
      buttonText: "Comprar ahora",
      description:
        "Las zapatillas Nike rojas que te llevarán más lejos. ¡Compra ahora!",
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
