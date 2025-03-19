"use client";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab, useMediaQuery } from "@mui/material";

const FloatingWhatsApp = () => {
  const isMobile = useMediaQuery(("(max-width: 768px)"));
  const phoneNumber = "8613925961232";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: isMobile ? "80px" : "20px",
        right: isMobile ? "10px" : "20px",
        textDecoration: "none",
        zIndex: 10000,
      }}
    >
      <Fab
        color="success"
        aria-label="whatsapp"
        sx={{ bgcolor: "#25D366", "&:hover": { bgcolor: "#1ebe57" } }}
      >
        <WhatsAppIcon sx={{ fontSize: 32, color: "white" }} />
      </Fab>
    </a>
  );
};

export default FloatingWhatsApp;
