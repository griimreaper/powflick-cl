"use client";
import { useCallback, useEffect, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import Newsletter from "components/newsletter";
import Reviews from "components/Reviews/Reviews";
// LOCAL CUSTOM COMPONENTS
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section6 from "../section-6";
import Section7 from "../section-7";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "store/dashboard";
import { getProfile } from "services/DashboardUser";
import { signOut, useSession } from "next-auth/react";
import Header from "components/header";
import { Navbar } from "components/navbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import { Footer1 } from "components/footer";
import { DataStructure } from "models/types";
import { Session } from "next-auth";
import { Box, Button, Typography } from "@mui/material";
import { primary } from "theme/theme-colors";
import { Paragraph } from "components/Typography";
import Section8 from "../section-8";

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

export default function FashionTwoPageView({ data, session }: { data: DataStructure, session: Session | null }) {
  const [backgroundImage, setBackgroundImage] = useState(
    "assets/images/landing/POWFLICK_BANNER_SUPERIOR.png"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setBackgroundImage("assets/images/landing/mobile/POWFLICK-_BANNER-SUPERIOR.png");
      } else if (width <= 1200) {
        setBackgroundImage("assets/images/landing/POWFLICK_BANNER_SUPERIOR.png");
      } else {
        setBackgroundImage("assets/images/landing/POWFLICK_BANNER_SUPERIOR.png");
      }
    };

    // Llama la función al cargar la página y al redimensionar
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          width: "100%",
          height: "auto",
          aspectRatio: "4000 / 4208",
        }}
      >
        <img
          src={backgroundImage}
          alt="Banner"
          style={{
            width: "100%",
            height: "auto",
            position: 'absolute',
            objectFit: "cover", // Asegura que la imagen mantenga proporciones
            objectPosition: "top", // Ajusta la posición de la imagen
            zIndex: 0
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "100%",

          }}
        >
          <Box sx={{
            position: "absolute",
            top: { xs: "-25%", sm: "-15%", md: "-7%", lg: "-25%", xl: "-38%" }, // Posición según pantallas
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            textAlign: "center",
          }}>
            <Button
              color="primary"
              variant="contained"
              href="/products"
              sx={{
                background: (theme) => theme.palette.primary.main,
                height: "4rem",
                width: "15rem",
                borderRadius: 1,
                "&:hover": { background: (theme) => theme.palette.primary.dark },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                Shop Now
              </Typography>
            </Button>
          </Box>

          <Section2 className="section2" />
          <Section3 className="section3" />
          <style jsx>{`
            @media (max-width: 1920px) {
              div {
                bottom: 30px;
              }
            }
            @media (max-width: 1440px) {
              div {
                bottom: 0px;
              }
            }
            @media (max-width: 768px) {
              div {
                display: none;
              }
            }
          `}</style>
        </div>
      </div >
      {/* Secciones que deben respetar el espacio de la imagen de fondo */}
      {
        ((window.innerWidth > 320 && window.innerWidth < 768) || !data) && (
          <div style={{
            position: 'relative',
            zIndex: 10,
            marginTop: "130px",
          }}>
            <style jsx>{`
            @media (max-width: 768px) {
              div {
                top: 80px;
              }
            }
            @media (max-width: 600px) {
              div {
                top: 40px;
              }
            }
            @media (max-width: 500px) {
              div {
                top: 0px;
              }
            }
            @media (max-width: 320px) {
              div {
                top: -40px;
              }
            }
          `}</style>
            <Box sx={{
              position: "absolute",
              top: { xs: "-18%", sm: "-18%", md: "-7%", lg: "-25%", xl: "-38%" }, // Posición según pantallas
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              textAlign: "center",
            }}>
              <Button
                color="primary"
                variant="contained"
                href="/products"
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  height: "3rem",
                  width: "12rem",
                  borderRadius: 1,
                  "&:hover": { background: (theme) => theme.palette.primary.dark },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  Shop Now
                </Typography>
              </Button>
            </Box>
            <Section2 className="section2" />
            <Section3 className="section3" />
          </div>
        )
      }
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
        <Section7 />
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
        <Section8 />
      </div>

      {/* Newsletter Subscription Section */}
      <Newsletter />

    </>
  );
}
