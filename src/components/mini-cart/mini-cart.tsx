import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM COMPONENTS
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
import BottomActions from "./components/bottom-actions";
// GLOBAL CUSTOM COMPONENT
import Scrollbar from "components/scrollbar";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";
import { useShoppingCartStore } from "store/shoppingCart";

// =========================================================
type Props = { toggleSidenav: () => void };
// =========================================================

export default function MiniCart({ toggleSidenav }: Props) {
  const { push } = useRouter();
  const { cart, total, setCoupon, coupon } = useShoppingCartStore();
  const cartList = cart;

  const handleNavigate = (path: string) => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" minWidth={380} sx={{ zIndex: 10 }}>
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={cartList.length} />

      <Divider />

      <Box overflow={'hidden'} height={`calc(100vh - ${cartList.length ? "207px" : "75px"})`}>
        {/* CART ITEM LIST */}
        {cartList.length > 0 ? (
          <Scrollbar>
            {cartList.map((item: any) => (
              <MiniCartItem item={item} key={item.id} />
            ))}
          </Scrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {cartList.length > 0 ? (
        <BottomActions total={total} handleNavigate={handleNavigate} />
      ) : null}
    </Box>
  );
}
