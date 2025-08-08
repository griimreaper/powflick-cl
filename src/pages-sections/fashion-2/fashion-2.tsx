"use client";

import { memo, useEffect, useMemo } from "react";
import { DataStructure } from "models/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import MainSection from "./MainSection";
import { LazyLoadSection } from "./LazyLoadSection";
import * as fbq from '../../../fpixel';

// GLOBAL CUSTOM COMPONENTS
const Newsletter = dynamic(() => import("components/newsletter"), { ssr: false });
const Reviews = dynamic(() => import("components/Reviews/Reviews").then(r => r.Reviews), { ssr: false });

// LOCAL CUSTOM COMPONENTS
const DesignYourGameSection = dynamic(() => import("./DesignYourGameSection"));
const Section4 = dynamic(() => import("./section-4"));
const Section6 = dynamic(() => import("./section-6"));
const Section7 = dynamic(() => import("./section-7"));
const Section8 = dynamic(() => import("./section-8"));
const Box = dynamic(() => import("@mui/material/Box"));

const FashionTwoPageView = ({ data }: { data: DataStructure }) => {
  const t = useTranslations("Home");
  const memoizedData = useMemo(() => data?.landing || {}, [data]);
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });

  console.log(memoizedData);


  useEffect(() => {
    fbq.init();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <MainSection isMobile={isMobile} />

      {/* Most Sold Products Section */}
      <LazyLoadSection id="section4">
        {/* <Section4 products={memoizedData?.collections?.mostSoldProducts || []} isMobile={isMobile} /> */}
        <DesignYourGameSection collections={memoizedData?.collections?.designYourGameSection || []} isMobile={isMobile} />
      </LazyLoadSection>
      {/* prueba de traduccion */}
      <div>
        <p>  {t("testTranslation")}</p>

      </div>

      {/* Banner */}
      <LazyLoadSection id="section7">
        <Section7 isMobile={isMobile} />
      </LazyLoadSection>

      {/* Discount Products Section */}
      <LazyLoadSection id="section6">
        <Section6 products={memoizedData?.collections?.discountProducts || []} isMobile={isMobile} />
      </LazyLoadSection>

      {/* Customer Reviews Section */}
      <LazyLoadSection id="reviews">
        {data && <Reviews review={memoizedData?.reviews} isMobile={isMobile} />}
      </LazyLoadSection>

      {/* Imagen y Sección 8 */}
      <LazyLoadSection id="section8">
        <Box style={{ position: "relative" }}>
          <Image
            src="/assets/images/landing/POWFLICK_ELEMENTO-2.png"
            alt={t("overlayAlt")}
            width={250}
            height={200}
            priority
            draggable={false}
            style={{
              position: "absolute",
              left: 0,
              top: isMobile ? "-50px" : "-200px",
              zIndex: 1,
              width: isMobile ? "125px" : "250px",
              height: "auto",
            }}
          />
          <Section8 isMobile={isMobile} />
        </Box>
      </LazyLoadSection>


    </div>
  );
};

export default memo(FashionTwoPageView);
