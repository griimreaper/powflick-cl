"use client";
import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { PAGES } from "../data";
import { Category } from "models/types";
import { useTranslations } from "next-intl";

// ==============================================================
type Props = { isDark?: boolean, list?: Category[] };
// ==============================================================

export default function CategoriesLinks({ isDark, list }: Props) {
  const t = useTranslations("Footer");
  return (
    <Fragment>
      <Heading style={{ color: "#CA0B0B", marginBottom: "24px" }}>{t("headings.categories")}</Heading>

      {list?.map((item, ind) => (
        <StyledLink
          isDark={isDark}
          href={`/products?category=${item.title}`}
          key={ind}
        >
          {item.title}
        </StyledLink>
      ))}
    </Fragment>
  );
}
