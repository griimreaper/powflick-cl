import ChevronRight from "@mui/icons-material/ChevronRight";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import CategoryMenu from "components/categories/category-menu";
// CUSTOM ICON COMPONENT
import Category from "icons/Category";
// STYLED COMPONENT
import { CategoryMenuButton } from "./styles";
import { DataStructure } from "models/types";

export default function Categories({ data }: { data: DataStructure["navbar"] }) {
  return (
    <CategoryMenu data={data}
      render={(handler) => (
        <CategoryMenuButton variant="text" onClick={(e) => handler(e)}>
          <div className="prefix">
            <Category fontSize="small" />
            <Paragraph fontWeight={600}>Categories</Paragraph>
          </div>

          <ChevronRight className="dropdown-icon" fontSize="small" />
        </CategoryMenuButton>
      )}
    />
  );
}
