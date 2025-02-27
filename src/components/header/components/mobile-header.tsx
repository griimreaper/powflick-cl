import Link from "next/link";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
// CUSTOM ICON COMPONENTS
import Icon from "icons";
// LOCAL CUSTOM COMPONENTS
import DialogDrawer from "./dialog-drawer";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { SearchInput, SearchInputWithCategory } from "components/search-box";
import { MobileMenu } from "components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "components/flex-box";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM HOOK
import useHeader from "../hooks/use-header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useShoppingCartStore } from "store/shoppingCart";
import { DataStructure } from "models/types";
import Image from "next/image";

export default function MobileHeader({ data }: { data: DataStructure['navbar'] }) {
  const { cart } = useShoppingCartStore();
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav,
  } = useHeader();

  const ICON_STYLE = { color: "#FFFFFF", fontSize: 20 };
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Fragment>
      <FlexBetween width="100%">
        {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
        <Box flex={1}>
          <MobileMenu data={data} />
        </Box>

        {/* MIDDLE CONTENT - LOGO */}
        <Link href="/">
          <Image
            height={44}
            width={44}
            loading="lazy"
            quality={80}
            src="/assets/images/logo/POWFLICK_LOGO-HEADER.png"
            alt="logo"
          />
        </Link>

        {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
        <FlexBox justifyContent="end" flex={1}>
          <IconButton onClick={toggleSearchBar}>
            <Icon.Search sx={ICON_STYLE} />
          </IconButton>

          <IconButton onClick={() => { session ? router.push('/dashboard/profile') : toggleDialog() }}>
            <Icon.User sx={ICON_STYLE} />
          </IconButton>

          <Badge badgeContent={cart?.length} color="primary">
            <IconButton onClick={toggleSidenav}>
              <Icon.CartBag sx={ICON_STYLE} />
            </IconButton>
          </Badge>
        </FlexBox>
      </FlexBetween>

      {/* SEARCH FORM DRAWER */}
      <Drawer
        open={searchBarOpen}
        anchor="top"
        onClose={toggleSearchBar}
        sx={{ zIndex: 9999 }}
      >
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <Paragraph>Search to Pow Flick</Paragraph>

            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {/* CATEGORY BASED SEARCH FORM */}
          <SearchInputWithCategory onClose={toggleSearchBar}/>
        </Box>
      </Drawer>

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
        session={!!session}
      />
    </Fragment>
  );
}
