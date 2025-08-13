"use client";

import React from "react";
import { styled } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { LazyLoadSection } from "pages-sections/fashion-2/LazyLoadSection";

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
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });
  const t = useTranslations("About");
  const backgroundImage = isMobile
    ? "/assets/images/landing/about/mobile/ABOUT-US-08.png"
    : "/assets/images/landing/about/ABOUT-US-PARTES_BANNER-SUPERIOR.png"

  return (
    <>
      <Box
        className="banner-container"
        style={{
          display: "flex",
          position: "relative",
          marginBottom: 90,
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
      >

        <Image
          src={backgroundImage}
          alt={t("bannerAlt")}
          priority
          quality={80}
          fetchPriority="high"
          loading="eager"
          layout="responsive"
          width={isMobile ? 313 : 1217} // Ajustar a un valor numérico adecuado
          height={isMobile ? 755 : 1291} // Ajustar a un valor numérico adecuado
          sizes="
          (max-width: 768px) 100vw,
          (max-width: 1024px) 80vw,
          1217px"
          style={{
            width: "100%",
            height: "auto",
            position: "relative",
            objectFit: "cover",
            objectPosition: "top",
            zIndex: 0,
          }}
        />
        <TextOverlay isMobile={isMobile} top={isMobile ? "60%" : "75%"}>
          {isMobile && (
            <div style={{ fontSize: isMobile ? "3vw" : "2vw", marginTop: isMobile ? "40vw" : 0 }}>
              <h2>{t("unlockYourPotential")}</h2>
              <h1 style={{ fontFamily: "GYMER" }}>{t("customGear")}</h1>
              <p style={{ marginBottom: "3rem" }}>{t("aboutUs")}</p>
            </div>
          )}
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              zIndex: 5,
              fontSize: isMobile ? "4vw" : "2vw",
              display: "-webkit-box",
              WebkitLineClamp: isMobile ? 12 : 12,
              WebkitBoxOrient: "vertical",
            }}
          >
            {isMobile ? (
              t("introMobile")
            ) : (
              <>
                {t("introDesktopLine1")}<br />
                {t("introDesktopLine2")}<br />
                {t("introDesktopLine3")}<br />
                {t("introDesktopLine4")}
              </>
            )}
          </p>
        </TextOverlay>
      </Box>
      <LazyLoadSection id="section.-2">
        <Box
          className="banner-container"
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Image
            src={isMobile
              ? "/assets/images/landing/about/mobile/ABOUT-US-09.png"
              : "/assets/images/landing/about/ABOUT-US-PARTES_FONDO.png"}
            alt="Banner"
            priority
            quality={80}
            fetchPriority="high"
            layout="responsive"
            width={isMobile ? 313 : 1417} // Ajustar a un valor numérico adecuado
            height={isMobile ? 755 : 1491} // Ajustar a un valor numérico adecuado
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              objectFit: "cover",
              objectPosition: "top",
              zIndex: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: isMobile ? "center" : "flex-start",
              width: "100%",
              height: "100%",
              padding: "5% 10%",
              zIndex: 3,
              fontSize: isMobile ? "1rem" : "1.2rem",
              // gap: "2rem",
            }}
          >
            {/* Texto abajo y centrado en mobile */}
            <div
              style={{
                width: isMobile ? "100%" : "50%",
                textAlign: isMobile ? "center" : "left",
                color: "white",
                order: isMobile ? 2 : 1,
                fontSize: isMobile ? "3.2vw" : "1.2vw",
                display: "-webkit-box",
                WebkitLineClamp: isMobile ? 12 : 12,
                WebkitBoxOrient: "vertical",
              }}
            >
              <h2 style={{ marginBottom: "3rem" }}>{t("whatMakesUsUnique")}</h2>
              <p>
                <span style={{ color: "red" }}>{t("advancedFabricTitle")} </span>
                {t("advancedFabricText")}
                <br />
                <span style={{ color: "red" }}>{t("totalCustomizationTitle")} </span>
                {t("totalCustomizationText")}
                <br />
                <span style={{ color: "red" }}>{t("aiInnovationTitle")} </span>
                {t("aiInnovationText")}
                <br />
                <span style={{ color: "red" }}>{t("creativeFreedomTitle")} </span>
                {t("creativeFreedomText")}
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
              <Image
                src="/assets/images/landing/about/ABOUT-US.png"
                alt="image"
                loading="lazy"
                layout="intrinsic"
                quality={80}
                width={600}
                height={600}
                style={{
                  width: isMobile ? "70%" : "70%",
                  margin: isMobile ? "0 auto" : undefined,
                }}
              />
            </div>
          </div>
        </Box>
      </LazyLoadSection>
      <LazyLoadSection id="section.-3">
        <Image
          src={
            isMobile
              ? "/assets/images/landing/about/mobile/ABOUT-US-10.png"
              : "/assets/images/landing/about/ABOUT-US-PARTES_PROMESA.png"
          }
          alt="Promesa"
          loading="lazy"
          layout="responsive"
          quality={80}
          width="100"
          height={100}
        />
        {isMobile && (
          <Image
            src={"/assets/images/landing/about/mobile/ABOUT-US-11.png"}
            alt="Promesa2"
            loading="lazy"
            layout="responsive"
            quality={80}
            width="100"
            height={100}
          />
        )}
        <Box
          className="banner-container"
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Image
            src={isMobile
              ? "/assets/images/landing/about/mobile/ABOUT-US-12.png"
              : "/assets/images/landing/about/ABOUT-US-PARTES_INFERIOR.png"}
            alt="Banner"
            loading="lazy"
            quality={80}
            fetchPriority="high"
            layout="responsive"
            width={isMobile ? 313 : 1417} // Ajustar a un valor numérico adecuado
            height={isMobile ? 755 : 1491} // Ajustar a un valor numérico adecuado
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              objectFit: "cover",
              objectPosition: "top",
              zIndex: 0,
            }}
          />
          <div
            style={{
              color: "white",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: 'absolute',
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "5% 10%",
              fontSize: isMobile ? "4.2vw" : "1.6vw",
            }}
          >
            <h1 style={{ fontFamily: "GYMER" }}>{t("ourPromise")}</h1>
            <p>{t("promiseText")}</p>
          </div>
        </Box>
      </LazyLoadSection>
    </>
  );
};

export default AboutUs;
