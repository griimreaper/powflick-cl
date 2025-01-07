import Button from "@mui/material/Button";
// MUI ICON COMPONENT
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// CUSTOM ICON COMPONENTS
import Category from "icons/Category";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import CategoryMenu from "components/categories/category-menu";
import { DataStructure } from "models/types";

export default function CategoriesMenu({ data }: { data: DataStructure["navbar"] }) {
  return (
    <CategoryMenu data={data}
      render={(handler) => (
        <FlexBox color="grey.600" alignItems="center" ml={2}>
          <Button color="inherit" onClick={(e) => handler(e)}>
            <Category fontSize="small" color="inherit" />
            <KeyboardArrowDown fontSize="small" color="inherit" />
          </Button>
        </FlexBox>
      )}
    />
  );
}
