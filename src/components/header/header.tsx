import Link from "next/link";
import { Fragment, ReactNode } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
// LOCAL CUSTOM HOOKS
import useHeader from "./hooks/use-header";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENTS
import MobileHeader from "./components/mobile-header";
// STYLED COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";
import { Session } from "next-auth";
import { DataStructure } from "models/types";
import { primary } from "theme/theme-colors";
import Image from "next/image";
import dynamic from "next/dynamic";
import LoginCartButtons from "./components/login-cart-buttons";

// ==============================================================
interface Props {
  isFixed?: boolean;
  className?: string;
  midSlot: ReactNode;
  session: Session | null;
  data: DataStructure["navbar"];
  landing: boolean;
}
// ==============================================================

const DialogDrawer = dynamic(() => import("./components/dialog-drawer"), { ssr: false });

export default function Header({
  // isFixed,
  className,
  landing,
  midSlot,
  session,
  data,
}: Props) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(768));
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = useHeader();

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      {/* LEFT CONTENT - LOGO AND CATEGORY */}
      <FlexBox minWidth={100} alignItems="center" paddingTop={2}>
        <Link href="/">
          <Image
            draggable={false}
            width={50}
            height={50}
            quality={80}
            priority
            src="/assets/images/logo/POWFLICK_LOGO-HEADER.png"
            alt="logo"
          />
        </Link>

        {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
        {/* {isFixed ? <CategoriesMenu data={data} /> : null} */}
      </FlexBox>

      {/* SEARCH FORM | NAVIGATION */}
      {midSlot}

      {/* LOGIN AND CART BUTTON */}
      <LoginCartButtons
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
        session={!!session}
      />

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

  return (
    <HeaderWrapper className={clsx(className)} sx={{ background: landing ? "transparent" : primary.main }}>
      <StyledContainer>
        {downMd ? <MobileHeader data={data} /> : CONTENT_FOR_LARGE_DEVICE}
      </StyledContainer>
    </HeaderWrapper>
  );
}
