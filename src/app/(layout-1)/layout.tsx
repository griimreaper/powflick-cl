import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";
import { getLanding } from "services/Landing";
import { getServerSession } from "next-auth";
import { DataStructure } from "models/types";

export const revalidate = 86400; // 1 dia

export default async function Layout1({ children }: PropsWithChildren) {
  // Obtener la sesión del lado del servidor
  const data: DataStructure = await getLanding();
  const session = await getServerSession();

  return (
    <ShopLayout1 session={session} data={data.navbar}>
      {children}
    </ShopLayout1>
  );
}
