"use client";

import React, { PropsWithChildren, forwardRef, useState } from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import SlickCarousel, { Settings } from "react-slick";
import Slider from "react-slick";
// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./components/carousel-dots";
import CarouselArrows from "./components/carousel-arrows";
// SLICK CAROUSEL CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// STYLED COMPONENT
import { RootStyle } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren, Settings {
  dotColor?: string;
  spaceBetween?: number;
  dotStyles?: SxProps<Theme>;
  arrowStyles?: SxProps<Theme>;
}
// ==============================================================

const Carousel = forwardRef<Slider, Props>((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = { mt: 4, color: "primary.main" },
    autoplay = false,
    autoplaySpeed = 3000,
    infinite = true,
    ...others
  } = props;

  const theme = useTheme();

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToScroll = props.slidesToScroll ?? slidesToShow; // por defecto

  const totalSlides = React.Children.count(children);
  const hidePrevArrow = !infinite && currentSlide === 0;
  const hideNextArrow = !infinite && currentSlide + slidesToScroll >= totalSlides;

  const settings: Settings = {
    dots,
    arrows,
    slidesToShow,
    autoplay,
    autoplaySpeed,
    infinite,
    rtl: theme.direction === "rtl",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    prevArrow: hidePrevArrow ? <></> : CarouselArrows(arrowStyles).prevArrow,
    nextArrow: hideNextArrow ? <></> : CarouselArrows(arrowStyles).nextArrow,
    ...CarouselDots({ dotColor, sx: dotStyles }),
    ...others,
  };

  return (
    <RootStyle space={spaceBetween} >
      <SlickCarousel ref={ref} {...settings} lazyLoad="anticipated">
        {children}
      </SlickCarousel>
    </RootStyle>
  );
});

export default Carousel;
