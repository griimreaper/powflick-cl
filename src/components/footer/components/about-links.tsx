"use client";
import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { ABOUT_LINKS } from "../data";
import { useTranslations } from "next-intl";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function AboutLinks({ isDark }: Props) {
  const t = useTranslations("Footer");
  const linkKey: Record<string, string> = {
    "terms-condition": "links.terms",
    "privacy-policy": "links.privacy",
    "shipping": "links.shipping",
    "return-refund": "links.return"
  };
  return (
    <Fragment>
      <Heading style={{ color: "#CA0B0B", marginBottom: "24px" }}>{t("headings.about")}</Heading>

      <div>
        {ABOUT_LINKS.map((item, ind) => {
          const key = linkKey[item.link];
          return (
            <StyledLink isDark={isDark} href={`/${item.link}`} key={ind}>
              {key ? t(key) : item.title}
            </StyledLink>
          );
        })}
      </div>
    </Fragment>
  );
}
