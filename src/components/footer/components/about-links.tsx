import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { ABOUT_LINKS } from "../data";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function AboutLinks({ isDark }: Props) {
  return (
    <Fragment>
      <Heading style={{ color: "#A30E0E" }}>About Us</Heading>

      <div>
        {ABOUT_LINKS.map((item, ind) => (
          <StyledLink isDark={isDark} href={`/${item.link}`} key={ind}>
            {item.title}
          </StyledLink>
        ))}
      </div>
    </Fragment>
  );
}
