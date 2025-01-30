import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab } from "@mui/material";

const FloatingWhatsApp = () => {
  const phoneNumber = "8613925961232";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
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
