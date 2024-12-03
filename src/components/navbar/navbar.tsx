// LOCAL CUSTOM COMPONENTS
import { DataStructure } from "models/types";
import Categories from "./categories";
import NavigationList from "./nav-list";
// STYLED COMPONENTS
import { NavBarWrapper, InnerContainer } from "./styles";
// DATA TYPES

// ==========================================================
interface Props {
  border?: number;
  elevation?: number;
  hideCategories?: boolean;
  data: DataStructure["navbar"];
}
// ==========================================================

export default function Navbar({ border, elevation = 2, hideCategories = true, data }: Props) {
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border ?? 0}>
      {hideCategories ? (
        <InnerContainer sx={{ justifyContent: "center" }}>
          <NavigationList data={data} />
        </InnerContainer>
      ) : (
        <InnerContainer>
          {/* CATEGORY MEGA MENU */}
          <Categories />

          {/* HORIZONTAL MENU */}
          <NavigationList data={data} />
        </InnerContainer>
      )}
    </NavBarWrapper>
  );
}
