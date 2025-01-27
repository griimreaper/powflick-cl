import MenuItem from "@mui/material/MenuItem";
// MUI ICON COMPONENTS
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "components/nav-link";
import { FlexBox } from "components/flex-box";
import SportZoneCard from "components/SportZoneCard";
// LOCAL CUSTOM COMPONENTS
import MegaMenu from "../mega-menu";
import NavItemChild from "./nav-item-child";
import CategoryBasedMenu from "../category-based-menu";
// STYLED COMPONENTS
import { StyledNavLink, NAV_LINK_STYLES, ChildNavListWrapper } from "../styles";
// DATA TYPES
import { NavList } from "../types";
import { DataStructure } from "models/types";

export default function NavigationList({
  data,
}: {
  data: DataStructure["navbar"];
}) {
  const renderNestedNav = (list: any[] = [], isRoot = false) => {
    return list.map((nav: NavList) => {
      if (isRoot) {
        // SHOW MEGA MENU
        if (nav.megaMenu) {
          return (
            <MegaMenu
              key={nav.title}
              title={nav.title}
              menuList={nav.child as any}
            />
          );
        }

        // SHOW MEGA MENU WITH SUB ITEMS
        if (nav.megaMenuWithSub) {
          return (
            <CategoryBasedMenu
              key={nav.title}
              title={nav.title}
              menuList={nav.child}
            />
          );
        }

        if (nav.url) {
          return (
            <StyledNavLink href={nav.url} key={nav.title}>
              {nav.title}
            </StyledNavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexBox
              key={nav.title}
              alignItems="center"
              position="relative"
              flexDirection="column"
              sx={{
                "&:hover": { "& > .child-nav-item": { display: "block" } },
              }}
            >
              <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
                {nav.title}{" "}
                <KeyboardArrowDown
                  sx={{ color: "grey.500", fontSize: "1.1rem" }}
                />
              </FlexBox>

              <ChildNavListWrapper className="child-nav-item">
                <SportZoneCard
                  elevation={3}
                  sx={{ mt: 2.5, py: 1, minWidth: 100 }}
                >
                  {renderNestedNav(nav.child)}
                </SportZoneCard>
              </ChildNavListWrapper>
            </FlexBox>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>{nav.title}</MenuItem>
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <NavItemChild nav={nav} key={nav.title}>
              {renderNestedNav(nav.child)}
            </NavItemChild>
          );
        }
      }
    });
  };

  const fullScreenMenu = {
    megaMenu: false,
    megaMenuWithSub: true,
    title: "Store",
    child: "categories" in data ? data.categories : [],
  };

  return (
    <FlexBox gap={4} height={'100%'} alignItems="center" >
      {fullScreenMenu && renderNestedNav([fullScreenMenu], true)}
      {/* <StyledNavLink href="/blog">Blog</StyledNavLink> */}
      <StyledNavLink href="/contact">Contact</StyledNavLink>
      <StyledNavLink href="/about-us">About Us</StyledNavLink>
      <StyledNavLink href="/help">Help</StyledNavLink>
    </FlexBox>
  );
}
