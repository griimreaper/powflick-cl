import { useCallback, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import useCart from "hooks/useCart";
import { useDashboardStore } from "store/dashboard";  // Asegúrate de importar esto
import { favProduct } from "services/Products";
import { showErrorAlert, showSuccessAlert } from "utils/alerts"; // Si tienes funciones para mostrar alertas
import { CartItem } from "contexts/CartContext";
import { useSession } from "next-auth/react";

export default function useProduct(id: string) {
  const { state, dispatch } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { profile, setFavorites } = useDashboardStore();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();
  let token = session?.user?.name?.split("|")[0];

  const cartItem = state.cart.find((item) => item.id === id)!;

  const toggleFavorite = useCallback(() => {
    handleFavoriteChange(id)
  }, []);

  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);

  // Agregar o quitar producto de favoritos
  const handleFavoriteChange = async (productId: string) => {
    if (token) {
      const fetchfavProduct = await favProduct(token, productId, isFavorite);
      setFavorites(fetchfavProduct.list);
      if (fetchfavProduct.error) {
        showErrorAlert("Error!", fetchfavProduct.message);
      } else {
        showSuccessAlert("Success!", fetchfavProduct.message);
        setIsFavorite((fav) => !fav);
      }
    } else {
      showErrorAlert("Error!", "Must be logged in.");
    }
  };

  useEffect(() => {
    setIsFavorite(profile.favorites?.some((each) => each.product.id === id));
  }, [profile, id]);

  const handleCartAmountChange = (product: typeof cartItem, type?: "remove") => {
    dispatch({ type: "CHANGE_CART_AMOUNT", payload: product as CartItem });
    // SHOW ALERT PRODUCT ADDED OR REMOVE
    if (type === "remove") enqueueSnackbar("Remove from Cart", { variant: "error" });
    else enqueueSnackbar("Added to Cart", { variant: "success" });
  };

  return {
    cartItem,
    openModal,
    isFavorite,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange,
    handleFavoriteChange, // Aquí está la nueva función
  };
}
