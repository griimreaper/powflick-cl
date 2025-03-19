import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// LOGIN FORM
import { LoginPageView } from "pages-sections/sessions/page-view";
// GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "components/mini-cart";
// LOGIN PAGE SECTIONS
import { Wrapper } from "pages-sections/sessions/styles";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
import LoginBottom from "pages-sections/sessions/components/login-bottom";
import SocialButtons from "pages-sections/sessions/components/social-buttons";

// ==============================================================
interface Props {
  dialogOpen: boolean;
  sidenavOpen?: boolean;
  redirectUrl?: string;
  toggleDialog: () => void;
  toggleSidenav?: () => void;
  session?: boolean;
}
// ==============================================================

export default function DialogDrawer(props: Props) {
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav, session, redirectUrl } =
    props;
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  return (
    <Fragment>
      {!session ? (
        <Dialog
          scroll="body"
          open={dialogOpen}
          fullWidth={isMobile}
          onClose={toggleDialog}
          sx={{ zIndex: 900 }}
        >
          <Wrapper>
            <LogoWithTitle />
            <LoginPageView closeDialog={toggleDialog} redirectUrl={redirectUrl} />
            <SocialButtons redirectUrl={redirectUrl} />
            <LoginBottom />
          </Wrapper>
        </Dialog>
      ) : (
        <></>
      )}

      <Drawer
        open={sidenavOpen}
        anchor="right"
        onClose={toggleSidenav}
        sx={{ zIndex: 1000 }}
      >
        <MiniCart toggleSidenav={toggleSidenav!} />
      </Drawer>
    </Fragment>
  );
}
