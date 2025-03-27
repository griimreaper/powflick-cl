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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useShoppingCartStore } from "store/shoppingCart";
import { SearchInputWithCategory } from "components/search-box";
import { useDashboardStore } from "store/dashboard";

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
  const state = useDashboardStore();
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const router = useRouter();
  const ICON_COLOR = { color: "#FEFCFC" };

  const { data: session } = useSession();
  const rol = session?.user?.email;
  const firstName = state.profile?.genericResponseUser?.firstName;
  const lastName = state.profile?.genericResponseUser?.lastName;
  const image = state.profile?.genericResponseUser?.image;

  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  return (
    <div>
      <IconButton
        sx={{ borderRadius: "8px" }}
        onClick={() => {
          session
            ? rol === "admin"
              ? router.push("/admin/dashboard")
              : router.push("/dashboard/profile")
            : toggleDialog();
        }}
      >
        {session ? (
          <span
            style={{
              color: "#FEFCFC",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* {image && (
              <img
                src={image}
                alt={`${firstName} ${lastName}`}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
            )} */}
            <PersonOutline sx={ICON_COLOR} />
            {`Welcome ${firstName} ${lastName}`}
          </span>
        ) : (
          <PersonOutline sx={ICON_COLOR} />
        )}
      </IconButton>
      <IconButton sx={{ borderRadius: "8px" }} onClick={toggleSearchBar}>
        <SearchIcon sx={ICON_COLOR} /> {/* Agregar el icono de lupa */}
      </IconButton>

      <Badge
        badgeContent={cart?.length}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#FEFCFC", // Cambia el color de fondo
            color: "primary.main", // Cambia el color del número
          },
        }}
      >
        <IconButton sx={{ borderRadius: "8px" }} onClick={toggleSidenav}>
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
            borderRadius: "16px",
          }}
        >
          <SearchInputWithCategory onClose={toggleSearchBar} />
        </Box>
      </Modal>
    </div>
  );
}
