"use client";

import { memo, useMemo } from "react";
import { DataStructure } from "models/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import MainSection from "./MainSection";

// GLOBAL CUSTOM COMPONENTS
const Newsletter = dynamic(() => import("components/newsletter"), {
  ssr: false,
  loading: () => <div>Cargando...</div>,
});
const Reviews = dynamic(() => import("components/Reviews/Reviews"), {
  ssr: false,
  loading: () => <div>Loading reviews...</div>,
});

// LOCAL CUSTOM COMPONENTS
const Section4 = dynamic(() => import("./section-4"));
const Section6 = dynamic(() => import("./section-6"));
const Section7 = dynamic(() => import("./section-7"));
const Section8 = dynamic(() => import("./section-8"));
const Box = dynamic(() => import("@mui/material/Box"));

const FashionTwoPageView = ({ data }: { data: DataStructure }) => {
  const memoizedData = useMemo(() => data?.landing || {}, [data]);
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });

  return (
    <div style={{ width: "100%" }}>
      <MainSection isMobile={isMobile} />

      {/* Most Sold Products Section */}
      <Section4 products={memoizedData?.collections?.mostSoldProducts || []} isMobile={isMobile} />

      {/* Banner */}
      <div style={{ position: "relative" }}>
        <Section7 isMobile={isMobile} />
      </div>

      {/* Discount Products Section */}
      <Section6 products={memoizedData?.collections?.discountProducts || []} isMobile={isMobile} />

      {/* Customer Reviews Section */}
      {data && <Reviews review={memoizedData?.reviews} isMobile={isMobile} />}

      <Box style={{ position: "relative" }}>
        <Image
          src="/assets/images/landing/POWFLICK_ELEMENTO-2.png"
          alt="Overlay"
          width={250}
          height={200}
          priority
          draggable={false}
          style={{
            position: "absolute",
            left: 0,
            top: isMobile ? "-50px" : "-200px",
            zIndex: 2,
            width: isMobile ? "125px" : "250px",
            height: "auto",
          }}
        />
        <Section8 isMobile={isMobile} />
      </Box>

      {/* Newsletter Subscription Section */}
      <Newsletter />
    </div>
  );
};

export default memo(FashionTwoPageView);
