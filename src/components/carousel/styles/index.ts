"use client";

import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

export const COMMON_DOT_STYLES = {
  left: 0,
  right: 0,
  bottom: 25,
  position: "absolute"
};

export const RootStyle = styled("div", {
  shouldForwardProp: (prop) => prop !== "space"
})<{ space: number }>(({ space }) => ({
  ".slick-list": { marginInline: -space },
  ".slick-slide": { paddingInline: space },

}));

export const DotList = styled(Box)(({ theme }) => ({
  gap: 6,
  zIndex: 1,
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  "& li": {
    width: 15,
    height: 15,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    "&.slick-active span::after": { scale: "1" }
  }
}));

export const Dot = styled("span", {
  shouldForwardProp: (prop) => prop !== "dotColor"
})<{ dotColor?: string }>(({ dotColor, theme }) => ({
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: "50%",
  position: "relative",
  border: `1px solid ${dotColor || theme.palette.secondary.main}`,
  "&:after": {
    scale: 0,
    inset: 0,
    width: 9,
    height: 9,
    content: '""',
    margin: "auto",
    borderRadius: "50%",
    position: "absolute",
    transition: "scale 500ms ease-in-out",
    backgroundColor: dotColor || theme.palette.secondary.main
  }
}));

export const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "left" && prop !== "right",
})<{ left?: number; right?: number }>(({ theme, left, right }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  backgroundColor: "#fff", // Fondo blanco
  color: "#ff0000", // Flecha roja
  borderRadius: "50%", // Redondeado
  width: 20,
  height: 20,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para dar efecto
  "&:hover": {
    backgroundColor: "#fff", // Mantener el fondo blanco al hover
    color: "#cc0000", // Oscurecer ligeramente el rojo
  },
  ...(left !== undefined && {
    left: left,
  }),
  ...(right !== undefined && {
    right: right,
  }),
}));