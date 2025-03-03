import Clear from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.grey[900],
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

const CategoryWrapper = styled(Box)(({ theme }) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.grey[200],
}));

const StyledTableRow = styled(TableRow)({
  ":last-child .MuiTableCell-root": { border: 0 },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    ":hover": { backgroundColor: "transparent" },
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "& .MuiSvgIcon-root": { fontSize: 19 },
  ":hover": { color: '#CA0B0B' },
}));

type StatusType = {
  status:
    | "APPROVED"
    | "PAID"
    | "REJECTED"
    | "DISPATCHED"
    | "ONTHEWAY"
    | "PENDING"
    | "DELIVERED"
    | "CANCELLED"
    | "DESIGN CREATION"
    | "DESIGN APPROVAL"
    | "FABRIC SAMPLE CONFIRMATION"
    | "PRODUCTION QUEUE"
    | "PRINTING"
    | "TAILORING"
    | "SHIPPING & TRACKING";
};

const StatusWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})<StatusType>(({ theme, status }) => {
  let color = theme.palette.secondary.main;
  let backgroundColor = theme.palette.secondary['light'];

  if (status === "APPROVED" || status === "DELIVERED" || status === "PAID") {
    color = theme.palette.success.main;
    backgroundColor = theme.palette.success['light'];
  }

  if (status === "REJECTED" || status === "CANCELLED") {
    color = theme.palette.error.main;
    backgroundColor = theme.palette.error['light'];
  }

  if (status === "DISPATCHED") {
    color = theme.palette.warning.main;
    backgroundColor = theme.palette.warning['light'];
  }

  if (status === "PENDING" || status === 'ONTHEWAY') {
    color = theme.palette.info.main;
    backgroundColor = theme.palette.info['light'];
  }

  return {
    color,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex",
  };
});

const UploadImageBox = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.info.light, 0.1),
}));

const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  cursor: "pointer",
  position: "absolute",
});

export {
  CategoryWrapper,
  StyledIconButton,
  StyledTableRow,
  StyledTableCell,
  StatusWrapper,
  UploadImageBox,
  StyledClear,
};
