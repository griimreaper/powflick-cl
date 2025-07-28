import { useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// ==============================================================
interface Props extends BoxProps {
  src: string;
  alt: string;
}
// ==============================================================

export default function SportZoneImage(props: Props) {
  const { src, alt, sx, ...rest } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box sx={{ position: "relative", ...sx }}>
      {!isLoaded && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}

      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        {...rest}
      />
    </Box>
  );
}
