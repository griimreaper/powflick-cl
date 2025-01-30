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
// =======================================
interface Props {
  handleGoogle?: () => void;
  handleFacebook?: () => void;
}
// =======================================

export default function SocialButtons(props: Props) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <Fragment>
      {/* DIVIDER */}
      <Box my={3}>
        <Divider>
          <Span lineHeight={1} px={1}>
            or
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
            I accept the{" "}
            <Link
              href="/terms-condition"
              style={{
                color: "#CA0B0B", textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              terms and conditions
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
        onClick={() => signIn("google", { callbackUrl: "/" })}
        disabled={!acceptedTerms} // 🔴 Bloquea el botón si no se aceptan los términos
      >
        Continue with Google
      </Button>
    </Fragment>
  );
}
