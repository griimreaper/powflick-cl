"use client";

import { Fragment, useEffect } from "react";
import Person from "@mui/icons-material/Person";
// Local CUSTOM COMPONENT
import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header";
import { useDashboardStore } from "store/dashboard";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

// ============================================================
type Props = { session: Session | null };
// ============================================================

export default function ProfilePageView({ session }: Props) {
  const { profile } = useDashboardStore();
  const { genericResponseUser } = profile;
  const router = useRouter();

  // Obtener la sesión del usuario en el lado del servidor
  useEffect(() => {
    const fetchSession = async () => {
      if (!session) {
        // Si no hay sesión, redirigir a la página de inicio de sesión
        router.push('/login');
      }
    };

    fetchSession();
  }, []);

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="My Profile"
        buttonText="Edit Profile"
        href={`/profile/${genericResponseUser.id}`}
      />

      {/* USER PROFILE INFO */}
      <UserAnalytics user={genericResponseUser} />

      {/* USER PROFILE INFO */}
      <UserInfo user={genericResponseUser} />
    </Fragment>
  );
}
