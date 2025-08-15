"use client";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS - Dynamic import
import { NavList } from "../types";
import { DataStructure } from "models/types";
import CategoryBasedMenu from "../category-based-menu";
import { StyledNavLink } from "../styles";
import { useTranslations } from "next-intl";


export default function NavigationList({
  data,
}: {
  data: DataStructure["navbar"];
}) {
  const t = useTranslations("Navigation");
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
    title: t("store"),
    child: "categories" in data ? data.categories : [],
  };

  return (
    <FlexBox gap={4} height={'100%'} alignItems="center" >
      {fullScreenMenu && renderNestedNav([fullScreenMenu], true)}
      {/* <StyledNavLink href="/blog">Blog</StyledNavLink> */}
      <StyledNavLink href="/your-design">{t("getFreeDesign")}</StyledNavLink>
      <StyledNavLink href="/contact">{t("contact")}</StyledNavLink>
      <StyledNavLink href="/about-us">{t("about")}</StyledNavLink>
      <StyledNavLink href="/help">{t("faq")}</StyledNavLink>
      <StyledNavLink href="/influencers">{t("creatorKits")}</StyledNavLink>
    </FlexBox>
  );
}
