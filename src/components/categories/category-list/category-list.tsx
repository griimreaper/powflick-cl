// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "../mega-menu/mega-menu-1";
import MegaMenu2 from "../mega-menu/mega-menu-2";
import CategoryListItem from "../category-list-item";
// NAVIGATION DATA
import { categoryMenus } from "data/navigations";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
// PROPS TYPE
import { Props } from "./types";
import { ContactMail, Help, Info, Public, Store } from "@mui/icons-material";
import { CategoryItem } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { DataStructure } from "app/types";

export default function CategoryList({ open, position = "absolute", data }: Props) {
  const queryClient = useQueryClient();

  // const data = queryClient.getQueryData<DataStructure["navbar"]>(["navbarData"]);

  const categoryMenus: CategoryItem[] = [
    {
      icon: Store,
      title: "Store",
      component: MegaMenu1.name,
      href: "/products/",
      // offer: { url: "/assets/images/promotion/offer-5.png", href: "/", position: "bottom" },
      child: data?.categories
    },
    // { icon: Public, title: "Blog", href: "/blog" },
    { icon: ContactMail, title: "Contact", href: "/contact" },
    { icon: Info, title: "About Us", href: "/about-us" },
    { icon: Help, title: "Help", href: "/help" },
  ];

return (
    <StyledRoot open={open} position={position} >
      {categoryMenus.map((item) => {
        const { href, title, child, component, icon, offer } = item;
        const MegaMenu = MegaMenu2;

        return (
          <CategoryListItem
            key={title}
            href={href}
            icon={icon}
            title={title}
            caret={!!child}
            render={component ? <MegaMenu data={child!} /> : null}
          />
        );
      })}
    </StyledRoot>
  );
}
