import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { primary } from "theme/theme-colors";
import Link from "next/link";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

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
        p: 2,
        borderRadius: 2,
        maxWidth: "auto",
        marginBottom: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "black" }}>
          State:
        </Typography>
        <Typography variant="body1" sx={{ alignSelf: "center" }}>
          {state || "No status available"}
        </Typography>

        <Typography variant="h6" sx={{ color: "black" }}>
          Tracking Code:
        </Typography>
        <Typography variant="body1" sx={{ alignSelf: "center" }}>
          {trackingCode || "No tracking code available"}
        </Typography>
        {trackingCode && (
          <Link href={`/shipping?orderId=${orderId}`} passHref>
            <Button variant="contained" color="primary">
              Track Order
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default TrackingCode;
