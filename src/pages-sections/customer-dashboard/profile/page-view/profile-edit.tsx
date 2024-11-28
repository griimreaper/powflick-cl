"use client";

import { Fragment } from "react";
import Card from "@mui/material/Card";
import Person from "@mui/icons-material/Person";
// Local CUSTOM COMPONENT
import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import User from "models/User.model";
import { useDashboardStore } from "store/dashboard";

export default function ProfileEditPageView() {
  const { profile } = useDashboardStore();
  const { genericResponseUser: user } = profile;

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        href="/profile"
        title="Edit Profile"
        buttonText="Back to Profile"
      />

      <Card sx={{ p: 3 }}>
        {/* USER PROFILE PIC */}
        <ProfilePicUpload image={user.image} />

        {/* PROFILE EDITOR FORM */}
        <ProfileEditForm user={user} />
      </Card>
    </Fragment>
  );
}
