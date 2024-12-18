// LOCAL CUSTOM COMPONENTS

import CategoryMenuItem from "../category-list-item";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
// DATA TYPE
import { CategoryItem } from "../types";
import { Box } from "@mui/material";
import ProductCard8 from "components/product-cards/product-card-8";

// =======================================================================
interface Props {
  data: CategoryItem[];
}
// =======================================================================

export default function MegaMenu2({ data }: Props) {
  return (
    <StyledRoot elevation={2}>
      {data.map((item) =>
        item.child ? (
          <CategoryMenuItem
            href={"/products?category=" + item.title}
            icon={item.icon}
            key={item.title}
            title={item.title}
            caret={!!item.child}
            render={
              item.child?.length ? (
                <MegaMenu2 data={item.child}></MegaMenu2>
              ) : null
            }
          />
        ) : item.products ? (
          <CategoryMenuItem
            href={""}
            icon={item.icon}
            key={item.title}
            title={item.title}
            caret={!!item.products}
            render={
              item.products?.length ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "white",
                    marginLeft: 2,
                    boxShadow: "2",
                    borderRadius: 2,
                    padding: 2,
                    maxHeight: 350,
                    overflowY: "scroll",
                  }}
                >
                  {item?.products?.map((sub: any) => (
                    <Box key={sub.id} width={200}>
                      <ProductCard8 key={sub.id} product={sub}></ProductCard8>
                    </Box>
                  ))}
                </Box>
              ) : null
            }
          />
        ) : null
      )}
    </StyledRoot>
  );
}
