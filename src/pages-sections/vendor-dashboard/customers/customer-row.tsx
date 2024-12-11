import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import Cancel from "@mui/icons-material/Cancel";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { updateUser } from "services/dashboardAdmin/users/index";
import { useDashboardStore } from "store/dashboard";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";

// ========================================================================
type Props = { customer: any };
// ========================================================================

export default function CustomerRow({ customer }: Props) {
  const { email, name, phone, avatar, rol, firstName, isActive } =
    customer || {};

  const STYLE = { fontWeight: 400 };

  const { profile } = useDashboardStore();
  const token = profile.token;

  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(rol);
  const [editedActive, setEditedActive] = useState(isActive);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    if (token) {
      try {
        await updateUser(customer.id, { rol: editedRole, isActive: editedActive }, token);
        showSuccessAlert("Success", "User updated successfully");
        // Aquí puedes agregar la lógica para actualizar el estado local o mostrar una notificación
      } catch (error) {
        showErrorAlert("Error", "Failed to update user");
        console.error("Error updating user:", error);
      }
    } else {
      showErrorAlert("Error", "Token is null");
      console.error("Token is null");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedRole(rol);
    setEditedActive(isActive);
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={avatar} />
          <Paragraph fontWeight={600}>{firstName}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {email}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {phone}
      </StyledTableCell>


      <StyledTableCell align="left" sx={STYLE}>
        {isEditing ? (
          <Select
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            {/* Agrega más roles según sea necesario */}
          </Select>
        ) : (
          rol
        )}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {isEditing ? (
          <Select
            value={editedActive}
            onChange={(e) => setEditedActive(e.target.value)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        ) : (
          isActive ? "yes" : "no"
        )}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? <Save /> : <Edit />}
        </StyledIconButton>
        {isEditing && (
          <StyledIconButton onClick={handleCancelClick}>
            <Cancel />
          </StyledIconButton>
        )}
        {/* <StyledIconButton>
          <Delete />
        </StyledIconButton> */}
      </StyledTableCell>
    </StyledTableRow>
  );
}
