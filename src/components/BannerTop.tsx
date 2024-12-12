"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface Props {
  props: string;
  textColor: string;
}

const BannerTop: React.FC<Props> = ({ props, textColor }) => {
  return (
    <Box
      className={`banner-top style-four w-full ${props}`}
      sx={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        height: "37px",
        display: "flex",
        alignItems: "center", // Centra el contenido verticalmente
      }}
    >
      <Container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ width: { sm: "66.67%", xs: "100%" }, height: "100%" }}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            className="h-full relative flex items-center justify-center "
            autoplay={{
              delay: 2000,
            }}
          >
            <SwiperSlide>
              <Typography
                className={`text-button-uppercase px-8 text-center ${textColor}`}
                sx={{ fontWeight: "bold" }}
              >
                Get 10% off on selected items
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              <Typography
                className={`text-button-uppercase px-8 text-center ${textColor}`}
                sx={{ fontWeight: "bold" }}
              >
                Free shipping on all orders over $50
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              <Typography
                className={`text-button-uppercase px-8 text-center ${textColor}`}
                sx={{ fontWeight: "bold" }}
              >
                10% off on all summer essentials!
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              <Typography
                className={`text-button-uppercase px-8 text-center ${textColor}`}
                sx={{ fontWeight: "bold" }}
              >
                Get summer-ready: 10% off swim suits
              </Typography>
            </SwiperSlide>
            <SwiperSlide>
              <Typography
                className={`text-button-uppercase px-8 text-center ${textColor}`}
                sx={{ fontWeight: "bold" }}
              >
                10% off on all product on shop
              </Typography>
            </SwiperSlide>
            <div
              className="swiper-button-next"
              style={{ color: "white", top: "50%" }} // Centra la flecha verticalmente
            ></div>
            <div
              className="swiper-button-prev"
              style={{ color: "white", top: "50%" }} // Centra la flecha verticalmente
            ></div>
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default BannerTop;
