import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENT
import SportZoneSwitch from "components/SportZoneSwitch";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { deleteCollection } from "services/Collections";
import { Collection } from "models/types";
import { Edit } from "@mui/icons-material";

// ========================================================================
type Props = { collection: Collection; selected?: string[], setActualize: Function };
// ========================================================================

export default function CollectionRow({ collection, setActualize }: Props) {
  const { order, title, type, id, products } = collection || {};
  const { profile } = useDashboardStore();
  const router = useRouter();


  const handleNavigate = () => router.push(`/admin/collections/${id}`);

  const deleteCat = async (id: string) => {
    try {
      const response = await deleteCollection(id, profile.token as string);
      showSuccessAlert('Success', response.message)
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Product cannot be deleted,')
    }
  }


  return (
    <StyledTableRow tabIndex={-1} role="checkbox" >
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">{title}</StyledTableCell>
      <StyledTableCell align="left">{order}</StyledTableCell>
      <StyledTableCell align="left">{products?.length}</StyledTableCell>
      <StyledTableCell align="left">{type}</StyledTableCell>

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
            onClick={() => deleteCat(id)} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
