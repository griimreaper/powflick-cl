import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { CUSTOMER_CARE_LINKS } from "../data";
import { Category } from "models/types";

// ==============================================================
type Props = { isDark?: boolean, list?: Category[] };
// ==============================================================

export default function CategoriesLinks({ isDark, list }: Props) {
  return (
    <Fragment>
      <Heading>Categories</Heading>

      {list?.map((item, ind) => (
        <StyledLink isDark={isDark} href={`/products?category=${item.name}`} key={ind}>
          {item.name}
        </StyledLink>
      ))}
    </Fragment>
  );
}
