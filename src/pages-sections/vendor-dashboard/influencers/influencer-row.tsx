import { useRouter } from "next/navigation";
import Delete from "@mui/icons-material/Delete";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Influencer } from "models/types";
import { Edit } from "@mui/icons-material";
import { deleteInfluencer } from "services/Influencers";
import { MouseEvent } from "react";

// ========================================================================
type Props = { influencer: Influencer; selected?: string[], setActualize: Function };
// ========================================================================

export default function InfluencerRow({ influencer, setActualize }: Props) {
  const { id, label, logo, products } = influencer || {};
  const { profile } = useDashboardStore();
  const router = useRouter();

  const handleNavigate = () => router.push(`/influencers/${label}`);

  const deleteInfl = async (id: string) => {
    try {
      const response = await deleteInfluencer(id, profile.token as string);
      showSuccessAlert('Success', response.message);
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Influencer cannot be deleted');
    }
  };

  // Evitar que el click en el botón dispare la navegación
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <StyledTableRow
      tabIndex={-1}
      role="checkbox"
      onClick={handleNavigate}
      sx={{
        cursor: "pointer",
        '&:hover': {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <StyledTableCell align="left">{label}</StyledTableCell>

      <StyledTableCell align="left">
        <img
          src={logo}
          alt={`${label} logo`}
          style={{ height: 40, objectFit: 'contain' }}
        />
      </StyledTableCell>

      <StyledTableCell align="left">{products?.length}</StyledTableCell>

      <StyledTableCell align="right">
        <StyledIconButton onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/influencers/${id}`);
        }}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton
          onClick={(e) => {
            e.stopPropagation();
            deleteInfl(id);
          }}
        >
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
