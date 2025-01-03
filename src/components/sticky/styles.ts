import { keyframes, styled } from "@mui/material/styles";

// ==============================================================
interface Props {
  fixed?: boolean;
  fixedOn?: number;
  componentHeight?: number;
}
// ==============================================================

const slideDown = keyframes`
  from { transform: translateY(-200%); }
  to { transform: translateY(0); }
`;

export const StyledBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "componentHeight" && prop !== "fixed" && prop !== "fixedOn",
})<Props>(({ theme, componentHeight, fixedOn, fixed }) => ({
  paddingTop: fixed ? componentHeight : 0,

  "& .hold": {
    zIndex: 5,
    boxShadow: "none",
    position: "relative",
  },

  "& .fixed": {
    left: 0,
    right: 0,
    zIndex: 1500,
    position: "fixed",
    top: `${fixedOn}px`,
    boxShadow: theme.shadows[2],
    transition: "all 200ms ease-in-out", // Reducir duración de la transición
    animation: `${slideDown} 200ms ${theme.transitions.easing.easeInOut}`, // Reducir duración de la animación
  },
}));

