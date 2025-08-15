"use client";
import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { PAGES } from "../data";
import { useTranslations } from "next-intl";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function Pages({ isDark }: Props) {
  const t = useTranslations("Footer");
  const pageKey: Record<string, string> = {
    products: "links.store",
    "your-design": "links.freeDesign",
    contact: "links.contact",
    "about-us": "links.about",
    help: "links.faq",
    influencers: "links.creatorKits",
    "customization-guide": "links.customizationGuide"
  };
  return (
    <Fragment>
      <Heading style={{ color: "#CA0B0B", marginBottom: "24px" }}>{t("headings.pages")}</Heading>

      {PAGES.map(([title, link], ind) => {
        const key = pageKey[link as keyof typeof pageKey];
        return (
          <StyledLink isDark={isDark} href={`/${link}`} key={ind}>
            {key ? t(key) : title}
          </StyledLink>
        );
      })}
    </Fragment>
  );
}
