import { PropsWithChildren } from "react";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { getServerSession } from "next-auth";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  return <VendorDashboardLayout session={session}>{children}</VendorDashboardLayout>;
};

export default Layout;
