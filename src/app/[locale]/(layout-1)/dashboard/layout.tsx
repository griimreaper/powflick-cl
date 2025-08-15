import { PropsWithChildren } from "react";
import { CustomerDashboardLayout } from "components/layouts/customer-dashboard";
import { getServerSession } from "next-auth";

export default async function Layout({ children }: PropsWithChildren) {
  // Obtener la sesión del lado del servidor
  const session = await getServerSession();

  return <CustomerDashboardLayout session={session} >{children}</CustomerDashboardLayout>;
}
