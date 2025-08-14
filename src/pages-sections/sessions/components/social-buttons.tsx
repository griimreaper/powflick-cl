import { Fragment, useState } from "react";
import Image from "next/image";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// CUSTOM COMPONENTS
import { Span } from "components/Typography";
// IMPORT IMAGES
import googleLogo from "../../../../public/assets/images/icons/google-1.svg";
import facebookLogo from "../../../../public/assets/images/icons/facebook-filled-white.svg";
import { signIn } from 'next-auth/react';
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
// =======================================
interface Props {
  handleGoogle?: () => void;
  handleFacebook?: () => void;
  redirectUrl?: string;
}
// =======================================

export default function SocialButtons({ redirectUrl }: Props) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const t = useTranslations('Auth.social');

  return (
    <Fragment>
      {/* DIVIDER */}
      <Box my={3}>
        <Divider>
          <Span lineHeight={1} px={1}>
            {t('or')}
          </Span>
        </Divider>
      </Box>

      {/* FACEBOOK BUTTON */}
      {/* <Button
        fullWidth
        size="large"
        className="facebookButton"
        sx={{ fontSize: 12 }}
        startIcon={<Image alt="facebook" src={facebookLogo} />}
      >
        Continue with Facebook
      </Button> */}

  {/* GOOGLE BUTTON */}
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" sx={{ cursor: "default" }}>
    {t('iAccept')} {" "}
            <Link
              href="/terms-condition"
              style={{
                color: "#CA0B0B", textDecoration: "none",
                fontWeight: "bold",
              }}
            >
      {t('terms')}
            </Link>
          </Typography>
        }
      />
      <Button
        fullWidth
        size="large"
        className="googleButton"
        sx={{
          fontSize: 12,
          transition: "all 0.3s ease",
          backgroundColor: acceptedTerms ? "#4285F4" : "#BDBDBD", // Color distinto cuando está deshabilitado
          color: acceptedTerms ? "#FFF" : "#757575", // Texto más apagado cuando está deshabilitado
          cursor: acceptedTerms ? "pointer" : "not-allowed", // Cambio de cursor
          opacity: acceptedTerms ? 1 : 0.6, // Opacidad reducida cuando está inactivo
          "&:hover": {
            backgroundColor: acceptedTerms ? "#357ae8" : "#BDBDBD",
          },
        }}
        startIcon={<Image alt="google" src={googleLogo} />}
        onClick={() => signIn("google", { callbackUrl: redirectUrl || "/" })}
        disabled={!acceptedTerms} // 🔴 Bloquea el botón si no se aceptan los términos
      >
    {t('continueWithGoogle')}
      </Button>
    </Fragment>
  );
}
