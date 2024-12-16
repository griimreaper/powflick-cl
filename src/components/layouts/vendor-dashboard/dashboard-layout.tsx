"use client";

import { PropsWithChildren, useEffect } from "react";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import BodyWrapper from "./dashboard-body-wrapper";
import DashboardNavbar from "./dashboard-navbar/dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar";
// LOCAL LAYOUT CONTEXT PROVIDER
import { LayoutProvider } from "./dashboard-layout-context";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function VendorDashboardLayout({ children, session }: { session: Session | null, children: any }) {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      if (!session) {
        // Si no hay sesión, redirigir a la página de inicio de sesión
        router.push('/');
      }
    };

    fetchSession();
  }, []);

  return (
    <LayoutProvider>
      {/* DASHBOARD SIDEBAR NAVIGATION */}
      <DashboardSidebar />

      <BodyWrapper>
        {/* DASHBOARD HEADER / TOP BAR AREA */}
        <DashboardNavbar />

        {/* MAIN CONTENT AREA */}
        <Container maxWidth="lg">{children}</Container>
      </BodyWrapper>
    </LayoutProvider>
  );
}
