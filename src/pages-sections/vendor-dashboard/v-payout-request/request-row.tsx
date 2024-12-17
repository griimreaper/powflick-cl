// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StatusWrapper, StyledTableCell, StyledTableRow } from "../styles";
// DATA TYPES
import { Request } from "./types";

// ==============================================================
type Props = { row: Request };
// ==============================================================

export default function RequestRow({ row }: Props) {
  const { no, date, status, message, amount } = row || {};

  return (
    <StyledTableRow role="checkbox">
      <StyledTableCell align="left">{no}</StyledTableCell>
      <StyledTableCell align="left">{date}</StyledTableCell>
      <StyledTableCell align="center">{currency(amount)}</StyledTableCell>
      <StyledTableCell align="center">
        <StatusWrapper status={status as "APPROVED" | "PAID" | "REJECTED" | "DISPATCHED" | "ONTHEWAY" | "PENDING" | "DELIVERED" | "CANCELLED"}>
          {status}
        </StatusWrapper>
      </StyledTableCell>
      <StyledTableCell align="center">{message}</StyledTableCell>
    </StyledTableRow>
  );
}
