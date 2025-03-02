import { Fragment } from "react";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import styled from "@mui/material/styles/styled";
import Done from "@mui/icons-material/Done";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box";

// STYLED COMPONENTS
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap", // Mantiene los elementos en línea
  alignItems: "flex-start", // Alinea los elementos en la parte superior
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    alignSelf: "center", // Asegura que la línea esté alineada con los avatares
    [theme.breakpoints.down("sm")]: { flex: "unset", height: 50, minWidth: 4 },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  top: -5,
  right: -5,
  width: 22,
  height: 22,
  position: "absolute",
  bgcolor: theme.palette.grey[200],
  color: theme.palette.success.main,
}));

export default function OrderProgress({ status }: { status: string }) {
  const ORDER_STATUS = status;
  const STEP_ICONS = [
    "/shipping/icons/TIME_SHIPPING_ICONOS-12.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-13.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-14.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-15.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-16.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-17.png",
    "/shipping/icons/TIME_SHIPPING_ICONOS-18.png",
  ];
  const ORDER_STATUS_LIST = [
    "DESIGN CREATION",
    "DESIGN APPROVAL",
    "FABRIC SAMPLE CONFIRMATION",
    "PRODUCTION QUEUE",
    "PRINTING",
    "TAILORING",
    "SHIPPING & TRACKING",
    "ONTHEWAY",
    "APPROVED",
    "PAID",
    "REJECTED",
    "DELIVERED",
    "CANCELLED",
    "PENDING",
  ];

  const statusIndex = ORDER_STATUS_LIST.indexOf(ORDER_STATUS);

  return (
    <Card sx={{ p: "2rem 1.5rem", mb: 4 }}>
      <StyledFlexbox>
        {STEP_ICONS.map((Icon, ind) => (
          <Fragment key={ind}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box position="relative">
                <Avatar
                  alt="shipping"
                  sx={{
                    width: 64,
                    height: 64,
                    color: ind <= statusIndex ? "white" : "primary.main",
                    bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                    padding: "0.5rem",
                  }}
                >
                  <img
                    src={Icon}
                    alt={`step-icon-${ind}`}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Avatar>
                {ind <= statusIndex && (
                  <StyledAvatar alt="done">
                    <Done color="inherit" sx={{ fontSize: 16 }} />
                  </StyledAvatar>
                )}
              </Box>
              <Paragraph
                sx={{
                  fontSize: "0.75rem",
                  maxWidth: 80,
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                {ORDER_STATUS_LIST[ind]}
              </Paragraph>
            </Box>

            {ind < STEP_ICONS.length - 1 && (
              <Box
                className="line"
                bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
              />
            )}
          </Fragment>
        ))}
      </StyledFlexbox>
    </Card>
  );
}
 