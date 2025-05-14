"use client";

import { Fragment } from "react";
import Card from "@mui/material/Card";
import Place from "@mui/icons-material/Place";
// Local CUSTOM COMPONENT
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { Direction } from "models/types";
import DirectionForm from "pages-sections/checkout/checkout-form/direction-form";
import { useQueryClient } from "@tanstack/react-query";

// =============================================================
type Props = { id: string };
// =============================================================

export default function AddressDetailsPageView({ id }: Props) {
  const queryClient = useQueryClient();
  const directions = queryClient.getQueryData<Direction[]>(["user-address"]);

  const direction = directions?.find((d) => d.id === id) || null;

  return (
    <Fragment>
      <DashboardHeader
        Icon={Place}
        href="/dashboard/address"
        title="Edit Address"
        buttonText="Back to Address"
      />

      <Card sx={{ p: 3, pt: 4 }}>
        <DirectionForm address={direction} toggleForm={() => {}} fromDashboard={true}/>
      </Card>
    </Fragment>
  );
}
