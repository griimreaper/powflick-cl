import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";
import { getLanding } from "services/Landing";
import { getServerSession } from "next-auth";
import { DataStructure } from "models/types";

export default async function Layout1({ children }: PropsWithChildren) {
  const data: DataStructure = await getLanding();

  // Obtener la sesión del lado del servidor
  const session = await getServerSession();

  return (
    <ShopLayout1 data={data} session={session}>
      {children}
    </ShopLayout1>
  );
}
