"use client";

import { memo, useMemo, useState } from "react";
import { DataStructure } from "models/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import MainSection from "./MainSection";
// GLOBAL CUSTOM COMPONENTS
const Newsletter = dynamic(() => import("components/newsletter"), {
  ssr: false,
  loading: () => <div>Cargando...</div>, // Placeholder de carga
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

const FashionTwoPageView = ({ data }: { data: DataStructure }) => {
  const memoizedData = useMemo(() => data?.landing || {}, [data]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <MainSection />
      {/* Most Sold Products Section */}
      <Section4 products={memoizedData?.collections?.mostSoldProducts || []} />

      {/* Banner */}
      <div style={{ position: "relative" }}>
        {/* <img
          src="/assets/images/landing/POWFLICK_ELEMENTO-1.png"
          alt="Overlay"
          style={{
            position: "absolute",
            right: 0,
            top: window.innerWidth <= 768 ? "-200px" : "-300px",
            zIndex: 2,
            width: window.innerWidth <= 768 ? "125px" : "250px",
            height: "auto",
          }}
        /> */}
        <Section7 />
      </div>

      {/* Discount Products Section */}
      <Section6 products={memoizedData?.collections?.discountProducts || []} />

      {/* Customer Reviews Section */}
      {data && <Reviews review={memoizedData?.reviews} />}

      <div style={{ position: "relative" }}>
        <Image
          src="/assets/images/landing/POWFLICK_ELEMENTO-2.png"
          alt="Overlay"
          width={250} // Tamaño en escritorio
          height={200} // Se ajusta automáticamente con style={{ height: "auto" }}
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
        <Section8 />
      </div>

      {/* Newsletter Subscription Section */}
      <Newsletter />

    </div>
  );
}

export default memo(FashionTwoPageView);