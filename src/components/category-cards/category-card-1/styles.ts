"use client";

import styled from "@mui/material/styles/styled";

// STYLED COMPONENTS
export const Wrapper = styled("div")(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  borderRadius: "4px",
  position: "relative",
  transition: "all 0.3s",
  overflow: "visible",
  alignItems: 'end',
  display: 'flex',
  zIndex: 1,
  img: {
    height: "100%",
    objectFit: "cover",
    transition: "all 0.3s",
    willChange: "transform",
    imageRendering: "auto"
  },
  ":hover": {
    transform: "translateY(-8px) scale(1.07)", // Elevar el componente
    img: {
      objectPosition: "center "
    }
  }
}));

export const CategoryTitle = styled("div")({
  left: 10,
  right: 10,
  bottom: 10,
  padding: 8,
  textAlign: "center",
  borderRadius: "2px",
  position: "absolute",
  transition: "all 0.3s",
  backgroundColor: "rgba(255,255,255, .67)"
});
