import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
import { DataStructure } from "models/types";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default function Section1({ data }: { data: DataStructure["navbar"] }) {
  const carouselData = [
    {
      title: "¡Descubre el poder del estilo!",
      buttonLik: "/producto-1",
      buttonText: "Comprar ahora",
      description:
        "Luce increíble con nuestras zapatillas Nike negras. ¡No te las pierdas!",
      imageUrl: "assets/images/products/nike-black.png",
    },
    {
      title: "¡Mantente conectado con estilo!",
      buttonLik: "/producto-2",
      buttonText: "Comprar ahora",
      description:
        "El Apple Watch que combina tecnología y elegancia. ¡Consíguelo ya!",
      imageUrl: "assets/images/products/apple-watch-1.png",
    },
    {
      title: "¡Corre con confianza!",
      buttonLik: "/producto-3",
      buttonText: "Comprar ahora",
      description:
        "Las zapatillas Nike rojas que te llevarán más lejos. ¡Compra ahora!",
      imageUrl: "assets/images/products/Fashion/Shoes/1.NikeRed.png",
    },
  ];

  return (
    <Box bgcolor="grey.100" mb={7.5}>
      <Container className="pt-2 pb-2">
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
      </Container>
    </Box>
  );
}
