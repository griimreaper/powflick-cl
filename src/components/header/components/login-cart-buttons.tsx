import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// MUI ICON COMPONENT
import PersonOutline from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search"; // Importar el icono de lupa
// CUSTOM ICON COMPONENT
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useShoppingCartStore } from "store/shoppingCart";
import SearchInput from "components/search-box/search-input";
import { SearchInputWithCategory } from "components/search-box";

// ==============================================================
interface Props {
  toggleDialog: () => void;
  toggleSidenav: () => void;
  session: boolean;
}
// ==============================================================

export default function LoginCartButtons({
  toggleDialog,
  toggleSidenav,
}: Props) {
  // const { state } = useCart();
  const { cart } = useShoppingCartStore();
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const router = useRouter();
  const ICON_COLOR = { color: "#FEFCFC" };

  const { data: session } = useSession();
  const rol = session?.user?.email;

  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  return (
    <div>
      <IconButton onClick={toggleSearchBar}>
        <SearchIcon sx={ICON_COLOR} /> {/* Agregar el icono de lupa */}
      </IconButton>
      <IconButton
        onClick={() => {
          session
            ? rol === "admin"
              ? router.push("/vendor/dashboard")
              : router.push("/dashboard/profile")
            : toggleDialog();
        }}
      >
        <PersonOutline sx={ICON_COLOR} />
      </IconButton>

      <Badge badgeContent={cart?.length} color="primary" sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#FEFCFC", // Cambia el color de fondo
          color: "primary.main", // Cambia el color del número
        }
      }}>
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>

      <Modal
        open={searchBarOpen}
        onClose={toggleSearchBar}
        aria-labelledby="search-bar-modal"
        aria-describedby="search-bar-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "16px"
          }}
        >
          <SearchInputWithCategory />
        </Box>
      </Modal>
    </div>
  );
}
