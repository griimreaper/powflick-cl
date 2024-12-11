import { forwardRef } from "react";
import Box from "@mui/material/Box";
// CUSTOM ICON COMPONENT
import appIcons from "icons";
// CUSTOM GLOBAL COMPONENTS
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/flex-box";
// STYLED COMPONENTS
import { CategoryBoxWrapper, StyledChip } from "./styles";
// CATEGORY INTERFACE MODEL
import Category from "models/Category.model";

// ==============================================================
interface Props {
  categories: Category[];
  selectedCategory: string;
  handleCategoryChange: (category: string) => () => void;
}
// ==============================================================

const CategoryList = forwardRef<HTMLDivElement, Props>(
  ({ categories, selectedCategory, handleCategoryChange }, ref) => (
    <Box mb={4} overflow="hidden" ref={ref}>
      <FlexBox m={-1.5} flexWrap="wrap">
        {categories.map((item: any) => {
          const selectedItem = item.name === selectedCategory ? 1 : 0;
          const Icon = appIcons[item.icon as keyof typeof appIcons];

          return (
            <CategoryBoxWrapper
              key={item.name}
              selected={selectedItem}
              onClick={handleCategoryChange(item.name)}>
              <Icon
                fontSize="inherit"
                sx={{ fontSize: 44 }}
                color={selectedItem ? "primary" : "secondary"}
              />

              <H5 color={selectedItem ? "primary.main" : "inherit"}>{item.name}</H5>

              <StyledChip
                size="small"
                color="primary"
                label="Upto 40% off"
                selected={selectedItem}
              />
            </CategoryBoxWrapper>
          );
        })}
      </FlexBox>
    </Box>
  )
);

export default CategoryList;
