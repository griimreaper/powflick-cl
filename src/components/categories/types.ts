import { SvgIconComponent } from "@mui/icons-material";
import { ProductDB } from "app/types";

export interface CategoryItemOffer {
  url: string;
  href: string;
  position: "right" | "bottom";
}

export interface CategoryItem {
  href: string;
  title: string;
  component?: string;
  icon?: SvgIconComponent;
  child?: CategoryItem[] | any[];
  products?: ProductDB[];
  offer?: CategoryItemOffer;
}
