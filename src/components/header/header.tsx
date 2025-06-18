import Link from "next/link";
import { Fragment, ReactNode, useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
// LOCAL CUSTOM HOOKS
import useHeader from "./hooks/use-header";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";
import { Session } from "next-auth";
import { DataStructure } from "models/types";
import { primary } from "theme/theme-colors";
import Image from "next/image";
import DialogDrawer from "./components/dialog-drawer";
import LoginCartButtons from "./components/login-cart-buttons";
import MobileHeader from "./components/mobile-header";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "pages-sections/sessions/page-view/ResetPassword";
import LoadingPageComponent from "components/Loaders/LoaderPageComponent";
import { showErrorAlert } from "utils/alerts";
import { validateToken } from "services/Login";

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

function ResetPasswordContent() {

}

export default function Header({
  // isFixed,
  className,
  landing,
  midSlot,
  session,
  data,
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [openReset, setIsOpenReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams()!;
  const router = useRouter();

  useEffect(() => {
    // Verifica si estamos en el cliente
    if (typeof window !== 'undefined') {
      setIsClient(true);
      setToken(searchParams.get('token'));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isClient || !token) {
      setLoading(false);
      return;
    }

    const asyncFetch = async () => {
      const { isValid } = await validateToken(String(token));
      if (isValid) {
        // Save the token in sessionStorage
        sessionStorage.setItem('resetPasswordToken', String(token));
        // Remove the token from the URL without reloading the page
        const urlWithoutToken = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutToken);
        toggleDialog();
        setIsOpenReset(true)
        setLoading(false);
      } else {
        showErrorAlert("Error!", 'Change password time expired');
        setLoading(false);
      }
    };

    asyncFetch();
  }, [isClient, token, router]);

  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
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

      {openReset && (
        <ResetPasswordForm
          rendering={openReset}
          setIsRendering={setIsOpenReset}
        />
      )}
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
