import { useRouter } from "next/navigation";
import { format } from "date-fns";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Message } from "models/types";
import { Small } from "components/Typography";
import { Announcement, CheckCircleOutline, Pending } from "@mui/icons-material";
import { Icon } from "@mui/material";

// ========================================================================
type Props = { mess: Message };
// ========================================================================

export default function MessageRow({ mess }: Props) {
  const { id, consultedAt, email, name, status, message, type, title } = mess || {};

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1}>
      <StyledTableCell align="left">{email}</StyledTableCell>
      <StyledTableCell align="left">{title}</StyledTableCell>
      <StyledTableCell align="left" >
        <Small>{message}</Small>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {format(new Date(consultedAt), "dd MMM yyyy")}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}
      >{type}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ fontWeight: 400 }}
      >{
        status ? 
        <CheckCircleOutline/>
        :
        <Announcement/>
         }
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
