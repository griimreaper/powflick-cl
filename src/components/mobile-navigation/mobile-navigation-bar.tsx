"use client";

import Badge from "@mui/material/Badge";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// CUSTOM ICON COMPONENTS
import Home from "icons/Home";
import User2 from "icons/User2";
import CategoryOutlined from "icons/CategoryOutline";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// STYLED COMPONENTS
import { iconStyle, StyledNavLink, Wrapper } from "./styles";
import { DataStructure } from "models/types";
import { useShoppingCartStore } from "store/shoppingCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useHeader from "components/header/hooks/use-header";
import DialogDrawer from "components/header/components/dialog-drawer";

export default function MobileNavigationBar() {
  const { cart } = useShoppingCartStore();
  const DOWN_768 = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const router = useRouter()
  const { data: session } = useSession();
  const rol = session?.user?.email;
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav,
  } = useHeader();

  const list = [
    { title: "Home", Icon: Home, href: "/" },
    // { title: "Category", Icon: CategoryOutlined, href: "/mobile-category-nav" },
    { title: "Cart", Icon: ShoppingBagOutlined, href: "/cart" },
    { title: "Account", Icon: User2, href: rol === 'admin' ? '/admin/dashboard' : '/dashboard/profile' }
  ];

  if (DOWN_768) {
    return (
      <>
        <Wrapper>
          {list.map(({ Icon, href, title }) => (
            title !== 'Account' ?
              <StyledNavLink href={href} key={title}>
                {title === "Cart" ? (
                  <Badge badgeContent={cart.length} color="primary">
                    <Icon fontSize="small" sx={iconStyle} />
                  </Badge>
                ) : (
                  <Icon sx={iconStyle} fontSize="small" />
                )}

                {title}
              </StyledNavLink> :
              <StyledNavLink
                onClick={() => session ? null : toggleDialog()}
                href={session ? href : ''} key={title}>
                <Icon
                  sx={iconStyle} key={title} fontSize="small" />
                {title}
              </StyledNavLink>

          ))}
        </Wrapper>
        <DialogDrawer
          dialogOpen={dialogOpen}
          sidenavOpen={sidenavOpen}
          toggleDialog={toggleDialog}
          toggleSidenav={toggleSidenav}
          session={!!session}
        />
      </>
    );
  }

  return null;
}
