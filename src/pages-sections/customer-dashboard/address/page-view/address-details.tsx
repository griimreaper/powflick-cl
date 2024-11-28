"use client";

import { Fragment } from "react";
import Card from "@mui/material/Card";
import Place from "@mui/icons-material/Place";
// Local CUSTOM COMPONENT
import AddressForm from "../address-form";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { Direction } from "models/types";
import { useDashboardStore } from "store/dashboard";

// =============================================================
type Props = { id: string };
// =============================================================

export default function AddressDetailsPageView({ id }: Props) {
  const { profile } = useDashboardStore();
  const { genericResponseUser } = profile;
  const { directions } = genericResponseUser;
  const direction = directions?.find((d) => d.id === id) || null;
  const token = profile.token;

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        href="/address"
        title="Edit Address"
        buttonText="Back to Address"
      />

      {/* FORM AREA */}
      <Card sx={{ p: 3, pt: 4 }}>
        <AddressForm direction={direction} token={token as string} />
      </Card>
    </Fragment>
  );
}
