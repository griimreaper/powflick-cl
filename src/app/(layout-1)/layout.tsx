import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";
import { getLanding } from "services/Landing";
import { getServerSession } from "next-auth";
import { DataStructure } from "models/types";

export default async function Layout1({ children }: PropsWithChildren) {
  // Obtener la sesión del lado del servidor
  const session = await getServerSession();

  return (
    <ShopLayout1 session={session}>
      {children}
    </ShopLayout1>
  );
}
