"use client";

import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
// GLOBAL CUSTOM COMPONENTS
import { Navbar } from "components/navbar";
import Header from "components/header/header";
import { DataStructure } from "models/types";
import { signOut, useSession } from "next-auth/react";
import { getProfile } from "services/DashboardUser";
import { useDashboardStore } from "store/dashboard";
import { useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { MobileNavigationBar } from "components/mobile-navigation";

// Carga dinámica de componentes
const Footer1 = dynamic(() => import("components/footer/footer-1"), {
  ssr: false
});

/**
 *  USED IN:
 *  1. MARKET-1, MARKET-2, GADGET, FASHION-1, FASHION-2, FASHION-3, FURNITURE, GROCERY-3, GIFT
 *  2. PRODUCT DETAILS, PRODUCT-SEARCH, ORDER-CONFIRMATION
 *  5. SHOPS, SHOP-DETAILS
 */

interface ShopLayout1Props extends PropsWithChildren {
  landing?: boolean;
}

export default function ShopLayout1({
  children,
  landing = false
}: ShopLayout1Props) {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<DataStructure['navbar']>(["navbarData"]) || { categories: [], collection: [], recent: [] };

  const { data: session } = useSession();
  const { profile, setData, removeProfile, setProfileUser } =
    useDashboardStore();

  const token = useMemo(() => session?.user?.name?.split("|")[0], [session]);
  const tokenExpiration = useMemo(() => session?.user?.name?.split("|")[1], [session]);
  let rol = session?.user?.email;
  let image = session?.user?.image;

  useEffect(() => {
    if (token && !profile.token) {
      localStorage.setItem("termsAccepted", "true");
      getProfile(token).then((response) => {
        setData({ ...response, token, rol });
        if (image) setProfileUser({ image });
      });
    }
  }, [token, profile.token, setData, setProfileUser, image]);

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
    <Fragment>
      {/* TOP BAR SECTION */}
      <Box position={landing ? 'absolute' : 'relative'} width={'100%'} top={0}>
        {/* <Topbar /> */}

        {/* HEADER */}
        {/* <Sticky fixedOn={0} onSticky={setIsFixed} scrollDistance={300}> */}
        <Header
          landing={landing}
          session={session}
          data={data}
          midSlot={<Navbar elevation={0} border={1} data={data} />}
        />
        {/* </Sticky> */}

        {/* NAVIGATION BAR */}

      </Box>

      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar data={data} />

      {/* FOOTER */}
      <Footer1 data={data} />
    </Fragment>
  );
}
