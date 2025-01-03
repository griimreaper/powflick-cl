import { SvgIconComponent } from "@mui/icons-material";
import { MenuItem } from "./category-based-menu/types";

export type Nav = {
  url?: string;
  Icon?: SvgIconComponent;
  title: string;
  child: MenuItem[];
};

export type NavList = {
  url: string;
  title: string;
  child: Nav[];
  megaMenu: boolean;
  megaMenuWithSub: boolean;
};
