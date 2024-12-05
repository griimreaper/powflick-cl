import { SvgIconComponent } from "@mui/icons-material";
import { ProductDB } from "models/types";

export type NavLink = {
  url: string;
  img?: string;
  title: string;
  Icon?: SvgIconComponent;
};

export type MenuItem = {
  title: string;
  products: ProductDB[];
};

export type MenuList = {
  title: string;
  child: MenuItem[];
};
