import { useRouter } from "next/navigation";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";
import { deleteCategory } from "services/Categories";

// ========================================================================
interface Category {
  id: string;
  name: string;
  products?: [];
}

type Props = { category: Category; selected?: string[], setActualize: Function };
// ========================================================================

export default function CategoryRow({ category, setActualize }: Props) {
  const { name, id, products } = category || {};
  const { profile } = useDashboardStore();
  const router = useRouter();

  // const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/categories/${id}`);

  const deleteCat = async (id: string) => {
    try {
      const response = await deleteCategory(id, profile.token as string);
      showSuccessAlert('Success', response.message)
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Product cannot be deleted,')
    }
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" >
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{products?.length}</StyledTableCell>
      {/*
      <StyledTableCell align="left">
        <Avatar alt={name} src={image} sx={{ borderRadius: 2 }} />
      </StyledTableCell> */}

      {/* <StyledTableCell align="left">{level}</StyledTableCell> */}

      {/* <StyledTableCell align="left">
        <SportZoneSwitch
          color="info"
          checked={featuredCategory}
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
            onClick={() => deleteCat(id)} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
