"use client";
import { useEffect } from "react";
// GLOBAL CUSTOM COMPONENTS
import Newsletter from "components/newsletter";
import Reviews from "components/Reviews/Reviews";
// LOCAL CUSTOM COMPONENTS
import Section4 from "./section-4";
import Section6 from "./section-6";
import Section7 from "./section-7";
import { useDashboardStore } from "store/dashboard";
import { getProfile } from "services/DashboardUser";
import { signOut, useSession } from "next-auth/react";
import { DataStructure } from "models/types";
import Section8 from "./section-8";
import MainSection from "./MainSection";
import { Box } from "@mui/material";

export default function FashionTwoPageView({ data }: { data: DataStructure }) {
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
    <Box sx={{ width:'100%' }}>
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
        <img
          src="/assets/images/landing/POWFLICK_ELEMENTO-2.png"
          alt="Overlay"
          style={{
            position: "absolute",
            left: 0,
            top: window.innerWidth <= 768 ? "-50px" : "-200px",
            zIndex: 2,
            width: window.innerWidth <= 768 ? "125px" : "250px",
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
