"use client";

import {
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
// GLOBAL CUSTOM COMPONENTS
import Sticky from "components/sticky";
import Topbar from "components/topbar";
import { Navbar } from "components/navbar";
import { Footer1, Footer2, Footer3, Footer4 } from "components/footer";
import Header from "components/header/header";
import { SearchInputWithCategory } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
import { DataStructure } from "models/types";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getProfile } from "services/DashboardUser";
import { useDashboardStore } from "store/dashboard";
import { useNavbar } from "contexts/NavBarContext";
import { useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";

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
  const [isFixed, setIsFixed] = useState(false);

  const queryClient = useQueryClient();

  const data = JSON.parse(localStorage.getItem("navbarData") || '') || queryClient.getQueryData<DataStructure['navbar']>(["navbarData"]) || { categories: [], recent: [] };

  const { data: session } = useSession();
  const { profile, setData, removeProfile, setProfileUser } =
    useDashboardStore();
  let token = session?.user?.name?.split("|")[0];
  let tokenExpiration = session?.user?.name?.split("|")[1];
  let rol = session?.user?.email;
  let image = session?.user?.image;

  useEffect(() => {
    const fetchData = async () => {
      if (token && token !== undefined && !profile.token) {
        localStorage.setItem("termsAccepted", "true");
        const response = await getProfile(token);

        setData({ ...response, token, rol });
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
    <Fragment>
      {/* TOP BAR SECTION */}
      <Box position={landing ? 'absolute' : 'relative'} width={'100%'} top={0}>
        {/* <Topbar /> */}

        {/* HEADER */}
        {/* <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}> */}
        <Header
          landing={landing}
          isFixed={isFixed}
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
