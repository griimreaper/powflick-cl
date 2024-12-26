import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H6, Tiny } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";
import { ShoppingCartStoreType } from "store/interfaces/interface";
import useCounter from "hooks/useCounter";
import { useShoppingCartStore } from "store/shoppingCart";

// ==============================================================
interface Props {
  item: ShoppingCartStoreType["cart"][0];

}
// ==============================================================

export default function MiniCartItem({ item }: Props) {
  const [counter, setCounter, handleCounterChange] = useCounter(item.product.id);
  const { removeProductById } = useShoppingCartStore();

  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.product.id}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider">
      <FlexBox alignItems="center" flexDirection="column">
        {/* <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={() => { handleCounterChange(+1); }}
          sx={{ height: 28, width: 28, borderRadius: 50 }}>
          <Add fontSize="small" />
        </Button> */}

        <H6 my="3px">{item.customizations.length}</H6>

        {/* <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={item.customizations.length === 1}
          onClick={() => { handleCounterChange(-1); }}
          sx={{ height: 28, width: 28, borderRadius: 50 }}>
          <Remove fontSize="small" />
        </Button> */}
      </FlexBox>

      <Link href={`/products/${item.product.id}`}>
        <Avatar alt={item.product.title} src={item.product.image} sx={{ mx: 1, width: 75, height: 75 }} />
      </Link>

      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        <Link href={`/products/${item.product.slug}`}>
          <H6 ellipsis className="title">
            {item.product.title}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(item.product.price)} x {item.customizations.length}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(item.customizations.length * item.product.price)}
        </H6>
      </Box>

      <IconButton size="small" onClick={() => { removeProductById(item.product.id) }} sx={{ marginLeft: 2.5 }}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
