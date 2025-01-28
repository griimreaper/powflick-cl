"use client";

import React, { useState, useEffect } from "react";
import { color, styled } from "@mui/system";

interface BannerContainerProps {
  aspectRatio?: string;
  imageUrl: string;
}

const BannerContainer = styled("div")<BannerContainerProps>(
  ({ aspectRatio, imageUrl }) => ({
    position: "relative",
    width: "100%",
    height: "auto",
    aspectRatio: aspectRatio,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
  })
);

interface TextOverlayProps {
  isMobile: boolean;
  top?: string;
}

const TextOverlay = styled("div")<TextOverlayProps>(({ isMobile, top }) => ({
  position: "absolute",
  width: "100%",
  top: top,
  transform: "translateY(-50%)",
  textAlign: "center",
  color: "white",
  fontSize: isMobile ? "1rem" : "1.5rem",
  fontWeight: "normal",
  display: "flex",
  flexDirection: "column", // Cambiado a columna
  justifyContent: "center",
  alignItems: "center",
  padding: "0 10%",
  boxSizing: "border-box",
}));

const AboutUs: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    // Llama la función al cargar la página y al redimensionar
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <BannerContainer
        aspectRatio={isMobile ? "1600 / 2167" : "4000 / 2806"}
        imageUrl={
          isMobile
            ? "assets/images/landing/about/mobile/ABOUT-US-08.png"
            : "assets/images/landing/about/ABOUT-US-PARTES_BANNER-SUPERIOR.png"
        }
      >
        <TextOverlay isMobile={isMobile} top={isMobile ? "60%" : "75%"}>
          {isMobile && (
            <>
              <h2>Unlock Your Ptential with</h2>
              <h1 style={{ fontFamily: "GYMER" }}>CUSTOM GEAR</h1>
              <p style={{ marginBottom: "3rem" }}>About Us</p>
            </>
          )}
          <p>
            {isMobile ? (
              `At PowFlick, we are passionate about designing and creating sportswear
              that combines technology, style, and performance. Our mission is to
              empower athletes and sports enthusiasts by offering the freedom to
              express their identity through fully customized sportswear.`
            ) : (
              <>
                At PowFlick, we are passionate about designing and creating
                sportswear
                <br />
                that combines technology, style, and performance. Our mission is
                to
                <br />
                empower athletes and sports enthusiasts by offering the freedom
                to
                <br />
                express their identity through fully customized sportswear.
              </>
            )}
          </p>
        </TextOverlay>
      </BannerContainer>
      <BannerContainer
        aspectRatio={isMobile ? "1600 / 3048" : "4000 / 1816"}
        imageUrl={
          isMobile
            ? "assets/images/landing/about/mobile/ABOUT-US-09.png"
            : "assets/images/landing/about/ABOUT-US-PARTES_FONDO.png"
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-start",
            width: "100%",
            height: "100%",
            padding: "5% 10%",
            fontSize: isMobile ? "1rem" : "1.2rem",
            gap: "2rem",
          }}
        >
          {/* Texto abajo y centrado en mobile */}
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              textAlign: isMobile ? "center" : "left",
              color: "white",
              order: isMobile ? 2 : 1,
            }}
          >
            <h2 style={{ marginBottom: "3rem" }}>What Makes Us Unique</h2>
            <p>
              <span style={{ color: "red" }}>Advanced fabric technology: </span>{" "}
              We use specialized materials that maximize comfort, durability,
              and performance, tailored to the demands of every sport.
              <br />
              <span style={{ color: "red" }}>Total customization: </span>
              Take full control of your design, from colors and patterns to
              logos and specific styles.
              <br />
              <span style={{ color: "red" }}>
                Innovation with Artificial Intelligence:{" "}
              </span>
              Our AI Customization tool simplifies and revolutionizes the design
              process, allowing you to create unique garments in just minutes.
              <br />
              <span style={{ color: "red" }}>
                Commitment to creative freedom:{" "}
              </span>
              We believe your clothing should reflect who you are, offering
              endless possibilities to bring your ideas to life.
            </p>
          </div>

          {/* Imagen arriba en mobile */}
          <div
            style={{
              width: isMobile ? "100%" : "50%",
              textAlign: "center",
              order: isMobile ? 1 : 2,
            }}
          >
            <img
              src="assets/images/landing/about/ABOUT-US.png"
              alt="image"
              style={{
                width: isMobile ? "70%" : "70%",
                margin: isMobile ? "0 auto" : undefined,
              }}
            />
          </div>
        </div>
      </BannerContainer>
      <img
        src={
          isMobile
            ? "assets/images/landing/about/mobile/ABOUT-US-10.png"
            : "assets/images/landing/about/ABOUT-US-PARTES_PROMESA.png"
        }
        alt="Promesa"
        width="100%"
      />
      {isMobile && (
        <img
          src={"assets/images/landing/about/mobile/ABOUT-US-11.png"}
          alt="Promesa2"
          width="100%"
        />
      )}
      <BannerContainer
        aspectRatio={isMobile ? "1600 / 2282" : "4000 / 1139"}
        imageUrl={
          isMobile
            ? "assets/images/landing/about/mobile/ABOUT-US-12.png"
            : "assets/images/landing/about/ABOUT-US-PARTES_INFERIOR.png"
        }
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "5% 10%",
            fontSize: isMobile ? "1rem" : "1.2rem",
          }}
        >
          <h1 style={{ fontFamily: "GYMER" }}>OUR PRMISE</h1>
          <p>
            Every PowFlick garment is a testament to quality, innovation, and
            attention to detail, designed to support you in every step of your
            sports journey.{" "}
          </p>
        </div>
      </BannerContainer>
      ;
    </>
  );
};

export default AboutUs;
