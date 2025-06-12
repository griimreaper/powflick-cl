import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { PAGES } from "../data";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function Pages({ isDark }: Props) {
  return (
    <Fragment>
      <Heading style={{ color: "#CA0B0B", marginBottom: "24px" }}>Pages</Heading>

      {PAGES.map(([title, link], ind) => (
        <StyledLink isDark={isDark} href={`/${link}`} key={ind}>
          {title}
        </StyledLink>
      ))}
    </Fragment>
  );
}
