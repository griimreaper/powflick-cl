import { useRouter } from "next/navigation";
import { format } from "date-fns";
// MUI ICON COMPONENTS
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { FreeDesign } from "models/types";

// ========================================================================
type Props = { fdesign: FreeDesign };
// ========================================================================

export default function FreeDesignRow({ fdesign }: Props) {
  const { email, teamName, createdAt, id } = fdesign || {};

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1}>
      <StyledTableCell align="left">{email}</StyledTableCell>
      <StyledTableCell align="left">{teamName}</StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {format(new Date(createdAt), "dd MMM yyyy")}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/free-design/${id}`)}>
          <RemoveRedEye />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
