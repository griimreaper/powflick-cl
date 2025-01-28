import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENT
import SportZoneCard from "components/SportZoneCard";
import { primary } from "theme/theme-colors";

const Wrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  height: "100%",
  alignItems: "center",
  display: "flex",
  textAlign: "center",
  ":hover": {
    color: theme.palette.primary.main,
    "& .menu-list": { display: "block" },
  },
}));

const MenusContainer = styled("div")({
  left: 0,
  zIndex: 2,
  top: "68%",
  width: "100%",
  height: "100%",
  display: "none",
  minHeight: "500px",
  maxHeight: "500px",
  position: "absolute",
});

const StyledCard = styled(SportZoneCard)({
  marginTop: 12,
  height: "100%",
  display: "flex",
  borderRadius: 0,
  boxShadow: '0px 9px 20px -10px rgba(0, 0, 0, 0.66)',
  overflow: "hidden",
});

const CategoryList = styled(List)(({ theme }) => ({
  padding: 0,
  width: 300,
  height: "100%",
  background: primary.main,
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.66)',
}));

const CategoryListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: number }>(({ theme, active }) => ({
  padding: "1rem 1.5rem",
  transition: "all 0.3s",
  justifyContent: "space-between",
  ...(active && {
    color: "white",
    backgroundColor: '#5F0404',
  }),
}));

const SubCategoryList = styled(List)(({ theme }) => ({
  padding: 0,
  display: "flex",
  gap: 24,
  gridTemplateColumns: "repeat(6, 1fr)",
  [theme.breakpoints.down("xl")]: { gridTemplateColumns: "repeat(5, 1fr)" },
  [theme.breakpoints.down("lg")]: { gridTemplateColumns: "repeat(4, 1fr)" },
}));

const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
  gap: 12,
  fontSize: 13,
  padding: "0",
  alignItems: "center",
  marginBottom: "1.5rem",
  transition: "all 0.3s",
  ":hover": { color: theme.palette.primary.main },
}));

export {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
};
