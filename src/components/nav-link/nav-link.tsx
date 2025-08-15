"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AnchorHTMLAttributes, CSSProperties, useMemo } from "react";
import styled from "@mui/material/styles/styled";
import clsx from "clsx";

// STYLED COMPONENT
const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: number }>(({ theme, active }) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active ? theme.palette.common.black : "inherit",
  "&:hover": { color: `${'#1A1A1A'} !important` },
}));

// ==============================================================
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  style?: CSSProperties;
  className?: string;
}
// ==============================================================

export default function NavLink({
  href,
  children,
  style,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname() || "";
  const locale = (useLocale?.() as string) || "en";

  // Ensure internal links keep the current locale prefix
  const localizedHref = useMemo(() => {
    // External or hash links untouched
    if (/^https?:\/\//.test(href) || href.startsWith("#")) return href;
    const path = href.startsWith("/") ? href : `/${href}`;
    const alreadyLocalized = /^\/(en|es)(\/|$)/.test(path);
    return alreadyLocalized ? path : `/${locale}${path}`;
  }, [href, locale]);

  // CHECK CURRENT ROUTE
  const checkRouteMatch = () => {
    // Compare without locale prefix
    const current = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
    const target = (href.startsWith("/") ? href : `/${href}`).replace(
      /^\/(en|es)(?=\/|$)/,
      ""
    );
    if (target === "/") return current === target;
    return current.includes(target);
  };

  return (
    <StyledLink
      href={localizedHref}
      style={style}
      className={clsx(className)}
      active={checkRouteMatch() ? 1 : 0}
      {...props}
    >
      {children}
    </StyledLink>
  );
}
