import { useRouter } from "next/navigation";
import { format } from "date-fns";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Order } from "models/types";

// ========================================================================
type Props = { order: Order };
// ========================================================================

export default function OrderRow({ order }: Props) {
  const { id, total, createdAt, state, customizations, direction } = order || {};

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">#{id}</StyledTableCell>
      <StyledTableCell align="left">{customizations.length}</StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {format(new Date(createdAt), "dd MMM yyyy")}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {`${direction.city}, ${direction.country}, ${direction.address}`}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(total)}</StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper status={state}>{state}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/orders/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
