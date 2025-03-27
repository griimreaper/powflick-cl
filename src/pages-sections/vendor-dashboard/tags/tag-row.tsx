import { useRouter } from "next/navigation";
import Delete from "@mui/icons-material/Delete";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Tags } from "models/types";
import { Edit } from "@mui/icons-material";
import { deleteTags } from "services/Tags";

// ========================================================================
type Props = { tag: Tags; selected?: string[], setActualize: Function };
// ========================================================================

export default function TagRow({ tag, setActualize }: Props) {
  const { name, id, products } = tag || {};

  const { profile } = useDashboardStore();
  const router = useRouter();

  const handleNavigate = () => router.push(`/admin/tags/${id}`);

  const deleteTag = async (id: string) => {
    try {
      const response = await deleteTags(id, profile.token as string);
      showSuccessAlert('Success', response.message)
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Product cannot be deleted,')
    }
  }


  return (
    <StyledTableRow tabIndex={-1} role="checkbox" >
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">{name}</StyledTableCell>
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
            onClick={() => deleteTag(id)} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
