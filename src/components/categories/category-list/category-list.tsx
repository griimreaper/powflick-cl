// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "../mega-menu/mega-menu-1";
import MegaMenu2 from "../mega-menu/mega-menu-2";
import CategoryListItem from "../category-list-item";
// NAVIGATION DATA
import { StyledRoot } from "./styles";
// PROPS TYPE
import { Props } from "./types";
import { ContactMail, Help, Info, Store } from "@mui/icons-material";
import { CategoryItem } from "../types";

export default function CategoryList({ open, position = "absolute", data }: Props) {
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
    { icon: Help, title: "FAQ", href: "/help" },
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
