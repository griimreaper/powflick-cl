import { useRouter } from "next/navigation";
import Delete from "@mui/icons-material/Delete";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Influencer } from "models/types";
import { Edit } from "@mui/icons-material";
import { deleteInfluencer } from "services/Influencers";

// ========================================================================
type Props = { influencer: Influencer; selected?: string[], setActualize: Function };
// ========================================================================

export default function InfluencerRow({ influencer, setActualize }: Props) {
  const { id, label, logo, products } = influencer || {};

  const { profile } = useDashboardStore();
  const router = useRouter();

  const handleNavigate = () => router.push(`/admin/influencers/${id}`);

  const deleteInfl = async (id: string) => {
    try {
      const response = await deleteInfluencer(id, profile.token as string);
      showSuccessAlert('Success', response.message)
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Product cannot be deleted,')
    }
  }


  return (
    <StyledTableRow tabIndex={-1} role="checkbox" >
      <StyledTableCell align="left">{label}</StyledTableCell>

      <StyledTableCell align="left">
        <img
          src={logo}
          alt={`${label} logo`}
          style={{ height: 40, objectFit: 'contain' }}
        />
      </StyledTableCell>

      <StyledTableCell align="left">{products?.length}</StyledTableCell>

      {/* <StyledTableCell align="center">
        <Avatar
          alt={name}
          src={logo}
          sx={{
            width: 55,
            height: "auto",
            margin: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}

      {/* <StyledTableCell align="center">
        <SportZoneSwitch
          color="info"
          checked={featuredC}
          onChange={() => setFeaturedCategory((state: boolean) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="right">
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        {/* <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton>
          <Delete
            onClick={() => deleteInfl(id)} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
