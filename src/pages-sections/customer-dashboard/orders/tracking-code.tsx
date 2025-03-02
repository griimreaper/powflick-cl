import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  trackingCode?: string;
  orderId: number;
  state: string;
};

const TrackingCode: React.FC<Props> = ({ trackingCode, orderId, state }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 4,
        borderRadius: 2,
        width: "100%",
        marginBottom: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2, // Se reduce el espacio entre elementos
        }}
      >
        {/* Estado del pedido */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }}>
            State:
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {state || "No status available"}
          </Typography>
        </Box>

        {/* Código de rastreo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }}>
            Tracking Code:
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {trackingCode || "No tracking code available"}
          </Typography>
        </Box>
      </Box>

      {/* Botón de seguimiento */}
      {trackingCode && (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link
            href={`https://www.17track.net/es?nums=${trackingCode}`}
            passHref
          >
            <Button variant="contained" color="primary">
              Track Order
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default TrackingCode;
