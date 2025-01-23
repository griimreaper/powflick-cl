"use client";
import { useCallback, useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// GLOBAL CUSTOM COMPONENTS
import Newsletter from "components/newsletter";
import Reviews from "components/Reviews/Reviews";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";
import { DataStructure } from "models/types";
import BannerTop from "components/BannerTop";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "store/dashboard";
import { getProfile } from "services/DashboardUser";
import { signOut, useSession } from "next-auth/react";
import { getLanding } from "services/Landing";
import Topbar from "components/topbar";
import Sticky from "components/sticky";
import Header from "components/header";
import { Navbar } from "components/navbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import { SearchInputWithCategory } from "components/search-box";
import { Footer1 } from "components/footer";

// const AnimatedSection = ({ children }: any) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     triggerOnce: true, // Añadir esta opción para que la animación se ejecute solo una vez
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   const variants = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     }, // Ajustar la duración y la curva de transición
//     hidden: {
//       opacity: 0,
//       y: 50,
//       transition: { duration: 0.6, ease: "easeIn" },
//     }, // Ajustar la duración y la curva de transición
//   };

//   return (
//     <motion.div
//       ref={ref}
//       animate={controls}
//       initial="hidden"
//       variants={variants}
//       style={{ willChange: "opacity, transform" }} // Añadir will-change para optimizar el rendimiento
//     >
//       {children}
//     </motion.div>
//   );
// };

// layout

export default function FashionTwoPageView() {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);
  const queryClient = useQueryClient();
  const [data, setData] = useState<DataStructure | null>(null);
  const { data: session } = useSession();

  const {
    profile,
    setData: setProfileData,
    removeProfile,
    setProfileUser,
  } = useDashboardStore();
  let token = session?.user?.name?.split("|")[0];
  let tokenExpiration = session?.user?.name?.split("|")[1];
  let rol = session?.user?.email;
  let image = session?.user?.image;

  const fetchData = useCallback(async () => {
    if (!data) {
      const landingData = await getLanding();
      setData(landingData);
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [data, fetchData]);

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
    <>
      <div
        className="banner-container"
        style={{
          position: "relative",
          backgroundImage:
            "url('assets/images/landing/POWFLICK_BANNER_SUPERIOR.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "auto",
          aspectRatio: "4000 / 4208",
        }}
      >
        {/* TOP BAR SECTION */}

        {/* <Topbar /> */}

        {/* HEADER */}
        {/* <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}> */}

        {data?.navbar && (
          <Header
            isFixed={isFixed}
            session={session}
            data={data.navbar}
            midSlot={<Navbar elevation={0} border={1} data={data.navbar} />}
          />
        )}

        {/* </Sticky> */}

        {/* NAVIGATION BAR */}

        {/* {data && <Navbar elevation={0} border={1} data={data.navbar} />} */}

        {/* SMALL DEVICE BOTTOM NAVIGATION */}
        {data && <MobileNavigationBar data={data.navbar} />}
        {/* <BannerTop props={""} textColor={""} /> */}

        {/* Navbar Section */}
        {/* Promotional Section */}
        <div
          style={{
            position: "absolute",
            width: "100%",
          }}
        >
          <Section2 className="section2" />
          <Section3 className="section3" />
          <style jsx>{`
            @media (max-width: 1920px) {
              div {
                bottom: 280px;
              }
            }
            @media (max-width: 1440px) {
              div {
                bottom: 80px;
              }
            }
            @media (max-width: 720px) {
              div {
                display: none;
              }
            }
          `}</style>
        </div>
      </div>
      {/* Secciones que deben respetar el espacio de la imagen de fondo */}
      {((window.innerWidth > 320 && window.innerWidth < 720) || !data) && (
        <>
          <Section2 className="section2" />
          <Section3 className="section3" />
        </>
      )}
      {/* Most Sold Products Section */}
      <Section4 products={data?.landing?.collections?.mostSoldProducts || []} />

      {/* New Arrivals Section */}
      {/* <Section5 /> */}

      {/* Banner */}
      <div style={{ position: "relative" }}>
        <img
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
        />
        <Section7 url={"POWFLICK-19.png"} />
      </div>

      {/* <AnimatedSection> */}
      {/* Trending Products Section */}
      {/* <Section8 />
      </AnimatedSection> */}
      {/* <AnimatedSection> */}
      {/* Customer Favorites Section */}
      {/* <Section9 /> */}
      {/* </AnimatedSection> */}

      {/* Discount Products Section */}
      <Section6 products={data?.landing?.collections?.discountProducts || []} />

      {/* Collections Section */}
      {/* {data && (
        <Section10
          products={
            data?.landing?.collections || {
              mostSoldProducts: [],
              featuredProducts: [],
              discountProducts: [],
              latestProducts: [],
              bestWeekProducts: [],
              popularProducts: [],
              saleProducts: [],
            }
          }
        />
      )} */}

      {/* Customer Reviews Section */}
      {data && <Reviews review={data?.landing?.reviews} />}

      <div style={{ position: "relative" }}>
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
        <Section7 url={"POWFLICK_BANNER-INFERIOR.png"} />
      </div>

      {/* Newsletter Subscription Section */}
      <Newsletter />

      {/* FOOTER */}
      {data && <Footer1 data={data.navbar} />}
    </>
  );
}
