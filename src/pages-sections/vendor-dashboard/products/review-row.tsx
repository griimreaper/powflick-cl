import { useState } from "react";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENT
import Delete from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import SportZoneSwitch from "components/SportZoneSwitch";
import { Paragraph, Small } from "components/Typography";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Review, ShowType } from "models/types";
import { deleteReview, updateReview } from "services/dashboardAdmin/reviews";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Dialog, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ClosedCaption, CloseFullscreen } from "@mui/icons-material";

// ========================================================================
type Props = { rev: Review, setActualize: Function };
// ========================================================================

export default function ReviewRow({ rev, setActualize }: Props) {
  const { review, isActive, image, user, id, rating, show } = rev || {};
  const { profile } = useDashboardStore();
  const { token } = profile;

  const [reviewPublish, setReviewPublish] = useState<boolean | undefined>(isActive);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(""); // Estado para el selector

  const handlePublish = async () => {
    try {
      const newStatus = !reviewPublish; // Alternar estado
      setReviewPublish(newStatus); // Actualizar estado local primero para una mejor experiencia del usuario
      // Enviar el nuevo estado al backend
      await updateReview({ isActive: newStatus, reviewId: id }, token as string);
      showSuccessAlert("Success", `Review has ${newStatus ? 'active' : 'inactive'}`)
    } catch (error) {
      showErrorAlert("Error", "Error to handle publish review")
      // Si falla, revertir el estado local
      setReviewPublish((prevState) => !prevState);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const response = await deleteReview(reviewId, token as string)
      showSuccessAlert("Success", response.message);
      setActualize();
    } catch (error) {
      showErrorAlert("Error", "An error occurred while deleting the review");
    }
  };

  const handleSelectChange = async (event: SelectChangeEvent) => {
    try {
      const newShow = event.target.value as ShowType;
      setSelectedOption(newShow);
      // Enviar el nuevo estado al backend
      await updateReview({ show: newShow, reviewId: id }, token as string);
      showSuccessAlert("Success", `The review is showing it ${newShow}`)
    } catch (error) {
      showErrorAlert("Error", "Error to handle publish review")
      // Si falla, revertir el estado local
      setReviewPublish((prevState) => !prevState);
    }
  };


  return (
    <>
      <StyledTableRow tabIndex={-1} role="checkbox">
        <StyledTableCell align="left">
          <FlexBox alignItems="center" gap={1.5}>
            <Avatar
              alt="product"
              src={image}
              sx={{ borderRadius: 2, cursor: "pointer" }}
              onClick={() => setIsPreviewOpen(true)} // Abrir diálogo
            />
          </FlexBox>
        </StyledTableCell>

        <StyledTableCell align="left">{user?.email}</StyledTableCell>
        <StyledTableCell align="center">{rating}</StyledTableCell>

        <StyledTableCell align="left" >
          <Small>{review}</Small>
        </StyledTableCell>

        <StyledTableCell align="left">
          <SportZoneSwitch
            color="info"
            checked={reviewPublish}
            onChange={handlePublish}
          />
        </StyledTableCell>

        {/* Nueva columna con el selector */}
        <StyledTableCell align="left">
          <FormControl fullWidth sx={{ width: 100 }}>
            <InputLabel>{show}</InputLabel>
            <Select
              value={selectedOption}
              onChange={(e) => handleSelectChange(e)}
            >
              {Object.values(ShowType).map(o => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCell>

        <StyledTableCell align="center" sx={{ width: 120 }}>
          <StyledIconButton>
            <Delete
              onClick={() => handleDelete(id)} />
          </StyledIconButton>
        </StyledTableCell>
      </StyledTableRow>
      <Dialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {/* Botón de cierre */}
        <IconButton
          onClick={() => setIsPreviewOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1,
          }}
        >
          <CloseFullscreen />
        </IconButton>

        {/* Imagen ampliada */}
        <img
          src={image}
          alt="Preview"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Dialog>
    </>
  );
}
