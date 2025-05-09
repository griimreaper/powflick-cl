import ChevronRight from "@mui/icons-material/ChevronRight";
// GLOBAL CUSTOM HOOK
import useSettings from "hooks/useSettings";
// STYLED COMPONENTS
import { CategoryList, CategoryListItem } from "../styles";
import Link from "next/link";

// ==============================================================
interface Props {
  categories: any[];
  openList: number;
  handleOpen: (item: number) => void;
}
// ==============================================================

export default function Categories({ categories, openList, handleOpen }: Props) {
  const { settings } = useSettings();

  return (
    <CategoryList>
      {categories.map((item, index) => (
        <Link key={item} href={'/products?category=' + item}>
          <CategoryListItem
            key={item}
            active={openList === index ? 1 : 0}
            onMouseEnter={() => handleOpen(index)}>
            {item}

            <ChevronRight
              fontSize="small"
              sx={{ transform: `rotate(${settings.direction === "rtl" ? "180deg" : "0"})` }}
            />
          </CategoryListItem>
        </Link>
      ))}
    </CategoryList>
  );
}
