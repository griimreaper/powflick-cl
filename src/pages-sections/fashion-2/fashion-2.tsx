"use client";

import { memo } from "react";
import { Box } from "@mui/material";
import { DataStructure } from "models/types";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { getProfile } from "services/DashboardUser";
import { useDashboardStore } from "store/dashboard";
import MainSection from "./MainSection";
// GLOBAL CUSTOM COMPONENTS
const Newsletter = dynamic(() => import("components/newsletter"));
const Reviews = dynamic(() => import("components/Reviews/Reviews"), { ssr: false });

// LOCAL CUSTOM COMPONENTS
const Section4 = dynamic(() => import("./section-4"));
const Section6 = dynamic(() => import("./section-6"));
const Section7 = dynamic(() => import("./section-7"));
const Section8 = dynamic(() => import("./section-8"));

const FashionTwoPageView = ({ data }: { data: DataStructure }) => {
  const {
    profile,
    setData: setProfileData,
    removeProfile,
    setProfileUser,
  } = useDashboardStore();

  const { data: session } = useSession();
  let token = session?.user?.name?.split("|")[0];
  let tokenExpiration = session?.user?.name?.split("|")[1];
  let rol = session?.user?.email;
  let image = session?.user?.image;

  useEffect(() => {
    const fetchData = async () => {
      if (token && token !== undefined && !profile.token) {
        localStorage.setItem("termsAccepted", "true");
        const response = await getProfile(token);

        setProfileData({ ...response, token, rol });
        if (image) setProfileUser({ image: image });
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;

    if (tokenExpiration) {
      const now = new Date();
      const tokenExpDate = new Date(String(tokenExpiration));
      const timeUntilExpiration = tokenExpDate.getTime() - now.getTime();

      if (timeUntilExpiration > 0) {
        logoutTimer = setTimeout(() => {
          console.log("El token ha caducado. Deslogueando al usuario...");
          signOut();
          removeProfile();
        }, timeUntilExpiration);
      } else {
        signOut();
        removeProfile();
      }
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [tokenExpiration]);

  return (
    <Box sx={{ width: '100%' }}>
      <MainSection />
      {/* Most Sold Products Section */}
      <Section4 products={data?.landing?.collections?.mostSoldProducts || []} />

      {/* Banner */}
      <Box style={{ position: "relative" }}>
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
      </Box>

      {/* Discount Products Section */}
      <Section6 products={data?.landing?.collections?.discountProducts || []} />

      {/* Customer Reviews Section */}
      {data && <Reviews review={data?.landing?.reviews} />}

      <Box style={{ position: "relative" }}>
        <Image
          src="/assets/images/landing/POWFLICK_ELEMENTO-2.png"
          alt="Overlay"
          width={250} // Tamaño en escritorio
          height={0} // Se ajusta automáticamente con style={{ height: "auto" }}
          quality={80}
          loading="lazy"
          style={{
            position: "absolute",
            left: 0,
            top: typeof window !== "undefined" && window.innerWidth <= 768 ? "-50px" : "-200px",
            zIndex: 2,
            width: typeof window !== "undefined" && window.innerWidth <= 768 ? "125px" : "250px",
            height: "auto",
          }}
        />
        <Section8 />
      </Box>

      {/* Newsletter Subscription Section */}
      <Newsletter />

    </Box>
  );
}

export default memo(FashionTwoPageView);