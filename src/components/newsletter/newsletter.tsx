"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// MUI UTILS METHODS
import debounce from "@mui/material/utils/debounce";
// MUI ICON COMPONENTS
import Clear from "@mui/icons-material/Clear";

// GLOBAL CUSTOM COMPONENTS
import { H1, Paragraph, Span } from "../Typography";
// LOCAL CUSTOM COMPONENT
import SocialIcons from "./social-icons";
// STYLED COMPONENTS
import { Wrapper } from "./styles";
import { useSession } from "next-auth/react";
import useLoading from "hooks/useLoading";
import { useDashboardStore } from "store/dashboard";
import { createCoupon, createCouponUser } from "services/modals/discount";
import { getProfile } from "services/DashboardUser";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";

// ======================================================
type Props = { image?: string };
// ======================================================

export default function Newsletter({
  image = "/assets/images/newsletter/bg-1.png",
}: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, startLoading, stopLoading] = useLoading();
  const { profile, setData, removeProfile } = useDashboardStore();
  const { data: session } = useSession();
  let rol = session?.user?.email;
  const token = session?.user?.name?.split("|")[0];
  const { push } = useRouter();

  const coupon = {
    title: "30% off sale",
    content: "Get 30% off during our one-time sale",
    discount: 30,
  };

  useEffect(() => {
    if (!window) return;

    if (!window.sessionStorage.getItem("newsletter")) {
      debounce(() => {
        setOpen(true);
        window.sessionStorage.setItem("newsletter", "true");
      }, 2000)();
    }
  }, []);

  const handleButton = async () => {
    //create coupon
    const responseCoupon = await createCoupon({
      title: coupon.title,
      content: coupon.content,
      discount: coupon.discount,
    });

    const { id: uuid } = responseCoupon.coupon;

    if (token) {
      //create coupon user
      startLoading();
      const responseCouponUser = await createCouponUser(
        token,
        { couponId: uuid, active: true },
        coupon.title
      );
      //refetch profile
      const responseGet = await getProfile(token);
      setData({ ...responseGet, token, rol });
      stopLoading();
      //validations
      if (responseCouponUser.status === 201) {
        showSuccessAlert(
          "Success!",
          "The discount has been successfully applied to your account"
        );
      } else {
        showErrorAlert("Error!", responseCouponUser.data.message);
      }
    } else {
      showErrorAlert(
        "Log in!",
        "You must log in to enjoy the discount coupons"
      );
      push("/login");
    }
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 999999999 }}
      >
        <Wrapper img={image}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} display={{ md: "flex", xs: "none" }} />

            <Grid item lg={6} md={6} xs={12} alignItems="center">
              <div className="content">
                <Paragraph fontSize={22} fontWeight={700}>
                  UP TO <Span color="primary.main">30% OFF</Span>
                </Paragraph>

                <H1 fontSize={36} fontWeight={700} mb={2}>
                  Sign up to <Span color="primary.main">Pow Flick</Span>
                </H1>

                <Paragraph color="grey.600" mb={5}>
                  Subscribe to the Pow Flick eCommerce newsletter to receive timely
                  updates from your favorite products.
                </Paragraph>

                {/* <TextField
                  fullWidth
                  className="emailInput"
                  placeholder="Enter your email address"
                /> */}

                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ p: 1.5 }}
                  onClick={() => handleButton()}
                >
                  SUBMIT
                </Button>

                <SocialIcons />

                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="No, Thanks"
                />
              </div>
            </Grid>
          </Grid>

          <IconButton onClick={handleClose} className="clear-btn">
            <Clear color="inherit" />
          </IconButton>
        </Wrapper>
      </Modal>
    </ClickAwayListener>
  );
}
