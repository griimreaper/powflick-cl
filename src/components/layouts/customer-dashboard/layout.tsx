"use client";

import { PropsWithChildren, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS
import Navigation from "./navigation";
import { useDashboardStore } from "store/dashboard";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */

export default function CustomerDashboardLayout({
  children,
  session,
}: {
  children: PropsWithChildren["children"];
  session: Session | null;
}) {
  const { profile } = useDashboardStore();
  const router = useRouter();

  // Obtener la sesión del usuario en el lado del servidor
  useEffect(() => {
    const fetchSession = async () => {
      if (!session) {
        // Si no hay sesión, redirigir a la página de inicio de sesión
        router.push("/");
      }
    };

    fetchSession();
  }, []);

  return (
    <div
      className="pt-1 pb-1"
      style={{
        backgroundImage:
          "url(/assets/images/landing/dashboard/DASHBOARD_BACKGROUND.png)",
        backgroundSize: "contain",
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Navigation profile={profile} />
          </Grid>

          <Grid item lg={9} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
