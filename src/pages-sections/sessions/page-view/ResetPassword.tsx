import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, CircularProgress, useMediaQuery, Theme, Dialog } from "@mui/material";
import { resetPassword } from "services/Login";
import { useTranslations } from "next-intl";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import useLoading from "hooks/useLoading";
import { H3 } from "components/Typography";
import { Wrapper } from "../styles";

interface ResetPasswordPageViewProps {
  rendering?: boolean;
  setIsRendering?: (value: boolean) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordPageViewProps> = ({ rendering, setIsRendering }) => {
  const t = useTranslations("Auth.reset");
  const [loading, startLoading, stopLoading] = useLoading();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange", shouldUnregister: true });
  const password = watch("password");
  const token = sessionStorage.getItem("resetPasswordToken");

  const validatePassword = (value: string) => {
    if (value.length < 8 || value.length > 20) {
      return t("errors.minMax");
    }
    if (!/[A-Z]/.test(value)) {
      return t("errors.uppercase");
    }
    if (!/[a-z]/.test(value)) {
      return t("errors.lowercase");
    }
    if (!/\d/.test(value)) {
      return t("errors.number");
    }
    if (!/[@$!%._.,;:+#|*?&]/.test(value)) {
      return t("errors.special");
    }
    return true;
  };

  const onSubmit = handleSubmit(async (data) => {
    startLoading();
    const response = await resetPassword(data.password, String(token));
    stopLoading();

    if (response.status === 201) {
      showSuccessAlert("Success!", response.data.message);
    } else {
      showErrorAlert("Error!", response.data.message);
    }

    setIsSubmited(true);

    setTimeout(() => {
      setIsRendering && setIsRendering(false);
    }, 1000);
  });

  const handleClose = () => {
    if (isSubmited) {
      setIsRendering && setIsRendering(false);
    }
  }

  return (
    <Dialog
      scroll="body"
      open={rendering || false}
      fullWidth={isMobile}
      onClose={() => handleClose()}
      sx={{ zIndex: 900 }}
    >
      <Wrapper>
        <Fragment>
          <H3 mb={3} textAlign={"center"}>
            {t("title")}
          </H3>
          <Box component="form" onSubmit={onSubmit} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={-4} minWidth={300} maxWidth={300}>
              <TextField
                fullWidth
                label={t("newPassword")}
                type="password"
                autoComplete="new-password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                {...register("password", { required: t("errors.passwordRequired"), validate: validatePassword })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.password ? 'red' : isValid ? 'green' : undefined,
                    },
                    '&:hover fieldset': {
                      borderColor: errors.password ? 'red' : isValid ? 'green' : undefined,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: errors.password ? 'red' : 'green',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: errors.password ? 'red' : isValid ? 'green' : undefined,
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("confirmPassword")}
                type="password"
                autoComplete="new-password"
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message?.toString()}
                {...register("confirmPassword", {
                  required: t("errors.confirmPasswordRequired"),
                  validate: (value) => value === password || t("errors.passwordsDoNotMatch"),
                })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.confirmPassword ? 'red' : isValid ? 'green' : undefined,
                    },
                    '&:hover fieldset': {
                      borderColor: errors.confirmPassword ? 'red' : isValid ? 'green' : undefined,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: errors.confirmPassword ? 'red' : 'green',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: errors.confirmPassword ? 'red' : isValid ? 'green' : undefined,
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!isValid || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t("submit")}
            </Button>
          </Box>
        </Fragment>
      </Wrapper>
    </Dialog>
  );
};
