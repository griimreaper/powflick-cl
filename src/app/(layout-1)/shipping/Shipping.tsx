"use client";

import {
  Typography,
  Container,
  Box,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  Button, // Importar Button
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { getOrder } from "services/ThanksForBuying";

const steps = [
  {
    label: "Design Creation",
    img: "/shipping/icons/TIME_SHIPPING_ICONOS-12.png",
  },
  {
    label: "Design Approval",
    img: "/shipping/icons/TIME_SHIPPING_ICONOS-13.png",
  },
  {
    label: "Fabric Sample Confirmation",
    img: "/shipping/icons/TIME_SHIPPING_ICONOS-14.png",
  },
  {
    label: "Production Queue",
    img: "/shipping/icons/TIME_SHIPPING_ICONOS-15.png",
  },
  { label: "Printing", img: "/shipping/icons/TIME_SHIPPING_ICONOS-16.png" },
  { label: "Tailoring", img: "/shipping/icons/TIME_SHIPPING_ICONOS-17.png" },
  {
    label: "Shipping & Tracking",
    img: "/shipping/icons/TIME_SHIPPING_ICONOS-18.png",
  },
];

const Shipping = () => {


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
            Time And Shipping
          </Typography>
          <Typography variant="body1" mt={1} sx={{ marginBottom: 3 }}>
            At Pow Flick, we strive to deliver your customized uniforms as
            quickly and efficiently as possible. <br />
            Here’s everything you need to know about our production and shipping
            timelines.
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
            Fast, Reliable Delivery for Your Custom Uniforms
          </Typography>
          <Typography textAlign="center" mt={2}>
            At Pow Flick, we know how important timely delivery is when it comes
            to your custom <br /> uniforms. That’s why we’ve streamlined our
            production and shipping processes to get <br /> your orders to you
            as quickly and efficiently as possible. Below, you’ll find
            everything you <br /> need to know about production times, shipping
            options, and how to track your order <br /> from start to finish.
          </Typography>
        </Container>
        <Box
          sx={{ width: { xs: "20%", md: "10%" } }}
          component="img"
          src="/shipping/forms/TIME_SHIPPING_FORMAS-6.png"
          alt="Banner Icon"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            zIndex: -1,
          }}
        />

        {/* Stepper con imágenes encima */}
        <Container sx={{ mt: 5 }}>
          <Stepper
          
            alternativeLabel
            sx={{
              display: "flex",
              flexWrap: "wrap", // Permite que los steps se ajusten
              justifyContent: "center", // Centra los steps
              gap: 2, // Espacio entre los elementos
            }}
            connector={
              <StepConnector
                sx={{ "& .MuiStepConnector-line": { borderWidth: 4 } }}
              />
            }
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                     
                      borderRadius: 1, // Añadir borde redondeado
                      transition: "background-color 0.3s ease", // Añadir transición para suavizar el cambio de color
                    }}
                  >
                    {/* Imagen arriba del Step */}
                    <Image
                      src={step.img}
                      alt={step.label}
                      width={60}
                      height={80}
                    />
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
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
              Prduction Time
            </Typography>
            <Typography textAlign="left" mt={2}>
              Production Time All our products are made-to-order, ensuring top
              quality and personalization. <br />
              <br />
              The production process typically takes 30 days, depending on the
              complexity of your order and seasonal demand.
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="left"
              sx={{ fontStyle: "italic", color: "red" }}
            >
              Shipping Times
            </Typography>
            <Typography textAlign="left" mt={2}>
              Once production is complete, your order will be shipped according
              to the following estimated delivery times: <br /> <br />
              <li>USA, European Union, Mexico: 10–20 business days</li>
              <li>
                Other destinations: Shipping times mayvary depending on the
                country
              </li>
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
            Express Shipping
          </Typography>
          <Typography textAlign="left" mt={2}>
            Need your order faster? We offer an Express Shipping option for an
            additional $20 USD, reducing delivery time to approximately 15 days.
            This service is available at checkout and uses trusted carriers like
            DHL and FedEx.
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            Tracking Your Order
          </Typography>
          <Typography textAlign="left" mt={2}>
            Once your order is shipped, you’ll receive a tracking number via
            email so you can monitor your delivery in real-time.
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="left"
            sx={{ fontStyle: "italic", color: "red" }}
          >
            Customs Duties and Taxes
          </Typography>
          <Typography textAlign="left" mt={2}>
            For international shipments, customs duties and taxes may apply
            depending on your country’s regulations. These charges are the
            responsibility of the customer, and the relevant customs authorities
            will contact you if needed.
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
            Questions?
          </Typography>
          <Typography variant="body1" mt={1} sx={{ marginBottom: 3 }}>
            If you have any questions about your order or delivery times, feel
            free to reach out to us at powflick@gmail.com.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
