// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS - Dynamic import
import dynamic from "next/dynamic";
// DATA TYPES
import { NavList } from "../types";
import { DataStructure } from "models/types";
import CategoryBasedMenu from "../category-based-menu";
import { StyledNavLink } from "../styles";


export default function NavigationList({
  data,
}: {
  data: DataStructure["navbar"];
}) {
  const renderNestedNav = (list: any[] = [], isRoot = false) => {
    return list.map((nav: NavList) => {
      if (isRoot) {
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
      <StyledNavLink href="/your-design">Get a Free Design</StyledNavLink>
      <StyledNavLink href="/contact">Contact</StyledNavLink>
      <StyledNavLink href="/about-us">About Us</StyledNavLink>
      <StyledNavLink href="/help">FAQ</StyledNavLink>
    </FlexBox>
  );
}
