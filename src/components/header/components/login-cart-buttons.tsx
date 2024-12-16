import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import PersonOutline from "@mui/icons-material/PersonOutline";
// CUSTOM ICON COMPONENT
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// ==============================================================
interface Props {
  toggleDialog: () => void;
  toggleSidenav: () => void;
  session: boolean;
}
// ==============================================================

export default function LoginCartButtons({ toggleDialog, toggleSidenav }: Props) {
  const { state } = useCart();
  const router = useRouter();
  const ICON_COLOR = { color: "grey.600" };

  const { data: session } = useSession();
  const rol = session?.user?.email
  return (
    <div>
      <IconButton onClick={() => { session ? rol === 'admin' ? router.push('/vendor/dashboard') : router.push('/dashboard/profile') : toggleDialog() }}>
        <PersonOutline sx={ICON_COLOR} />
      </IconButton>

      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>
    </div>
  );
}
