"use client";

import { Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Shipping = () => {
  const t = useTranslations("Shipping");
  return (
    <Box sx={{ backgroundColor: "white" }}>
      {/* Banner */}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Image
          src={"/shipping/TIME_SHIPPING_BACKGROUND.png"}
          alt="Banner Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          style={{ zIndex: 1 }}
        />
        <Box sx={{ position: "relative", zIndex: 1, px: 2 }}>
          <Image
            src={"/shipping/TIME_SHIPPING_FORMAS-4.png"}
            alt="Banner Icon"
            width={60}
            height={60}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "primary.main",
              textTransform: "uppercase",
              fontFamily: "GYMER",
            }}
          >
            {t("title")}
          </Typography>
          <Typography variant="body1" mt={1} sx={{ marginBottom: 3 }}>
            {t("bannerIntro")} <br />
            {t("bannerLead")}
          </Typography>
          <Image
            src={"/shipping/TIME_SHIPPING_FORMAS-9.png"}
            alt="Banner Icon"
            width={90}
            height={40}
          />
        </Box>
      </Box>

      {/* Descripción */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{ width: { xs: "20%", md: "10%" } }}
          component="img"
          src="/shipping/forms/TIME_SHIPPING_FORMAS-5.png"
          alt="Banner Icon"
          style={{
            position: "absolute",
            top: -50,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container
          sx={{
            mt: 4,
            p: 5,
            backgroundColor: "#f8f8f8",
            borderRadius: 2,
            width: "80%",
            mb: 10,
            boxShadow: "8px 8px 13px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            {t("fastReliable")}
          </Typography>
          <Typography textAlign="center" mt={2}>
            {t("fastReliableBody")}
          </Typography>
        </Container>
        <Box
          sx={{
            width: { xs: "20%", md: "15%" },
            position: "absolute",
            top: { xs: "55%", md: "15%" },
            left: 0,
            zIndex: -1,
          }}
          component="img"
          src="/shipping/forms/TIME_SHIPPING_FORMAS-6.png"
          alt="Banner Icon"
        />

        {/* Stepper con imágenes encima */}
        <Image
          src={"/shipping/TIME_SHIPPING_STEPS.png"}
          alt="Banner Background"
          layout="responsive"
          width={200}
          height={200}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/*times */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          mt: 4,
          p: 10,
          backgroundColor: "#f8f8f8",
          borderRadius: 2,
          width: "100%",
          mb: 10,
          boxShadow: "8px 8px 13px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "50%" },
            margin: "0 auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="left"
              sx={{ fontStyle: "italic", color: "red" }}
            >
              {t("productionTimeTitle")}
            </Typography>
            <Typography textAlign="left" mt={2}>
              {t("productionTimeBody")}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="left"
              sx={{ fontStyle: "italic", color: "red" }}
            >
              {t("shippingTimesTitle")}
            </Typography>
            <Typography textAlign="left" mt={2}>
              {t("shippingTimesBody")} <br /> <br />
              <li>{t("shippingTimesList1")}</li>
              <li>{t("shippingTimesList2")}</li>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/*express shipping */}

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          mt: 4,
          p: 10,

          borderRadius: 2,
          width: "100%",
          mb: 10,

          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{ width: { xs: "20%", md: "10%" } }}
          component="img"
          src="/shipping/forms/TIME_SHIPPING_FORMAS-7.png"
          alt="Banner Icon"
          style={{
            position: "absolute",
            top: -150,
            right: 0,
            zIndex: -1,
          }}
        />
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            {t('expressShippingTitle')}
          </Typography>
          <Typography textAlign="left" mt={2}>
            {t('expressShippingBody')}
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            {t('trackingTitle')}
          </Typography>
          <Typography textAlign="left" mt={2}>
            {t('trackingBody')}
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            {t('customsTitle')}
          </Typography>
          <Typography textAlign="left" mt={2}>
            {t('customsBody')}
          </Typography>
        </Box>

        <Box
          sx={{ width: { xs: "20%", md: "10%" } }}
          component="img"
          src="/shipping/forms/TIME_SHIPPING_FORMAS-8.png"
          alt="Banner Icon"
          style={{
            position: "absolute",
            bottom: -80,
            left: 0,
            zIndex: -1,
          }}
        />
      </Container>

      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "auto", md: 300 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          overflow: "hidden",
          zIndex: 2,
          bgcolor: "maroon",
        }}
      >
        <Image
          src={"/shipping/forms/TIME_SHIPPING_FORMAS-11.png"}
          alt="Banner Background"
          width={200}
          height={300}
          style={{ zIndex: 1 }}
        />
        <Box sx={{ position: "relative", zIndex: 1, px: 2 }}>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Image
              src={"/shipping/TIME_SHIPPING_FORMAS-4.png"}
              alt="Banner Icon"
              width={60}
              height={60}
            />
          </Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "white",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {t('questionsTitle')}
          </Typography>
          <Typography variant="body1" mt={1} sx={{ marginBottom: 3 }}>
            {t('questionsBody')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
