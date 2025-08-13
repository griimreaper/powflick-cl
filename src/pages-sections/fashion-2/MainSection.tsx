import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Section2 from "./section-2";
import Section3 from "./section-3";

export default function MainSection({ isMobile }: { isMobile: boolean }) {
  const t = useTranslations("Home");
  const backgroundImage = isMobile
    ? "/assets/images/landing/mobile/POWFLICK-_BANNER-SUPERIOR.png"
    : "/assets/images/landing/POWFLICK_BANNER_SUPERIOR.png";

  return (
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          height: "100%",
          gap: isMobile ? "1vw" : 3,
          position: "absolute",
          zIndex: 2,
          fontFamily: "GYMER",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          href="/products"
          sx={{
            width: "clamp(140px, 17vw, 500px)",
            borderRadius: 1,
            color: "white",
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: "clamp(12px, 2.5vw, 120px)",
            fontStyle: "italic",
          }}
        >
          {t("shopNow")}
        </Button>

        <Box
          style={{
            position: "relative",
            width: "100%",
            height: "50%",
            flexDirection: "column",
            alignItems: "center",
            top: isMobile ? "clamp(0px,5%,200px)" : "clamp(0px,8%,200px)",
            display: "flex",
            gap: 5,
          }}
        >
          <Section2 className="section2" isMobile={isMobile} />
          <Section3 className="section3" isMobile={isMobile} />
        </Box>
      </Box>
    </Box>
  );
}
