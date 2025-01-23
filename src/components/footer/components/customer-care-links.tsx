import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { CUSTOMER_CARE_LINKS } from "../data";

// ==============================================================
type Props = { isDark?: boolean };
// ==============================================================

export default function CustomerCareLinks({ isDark }: Props) {
  return (
    <Fragment>
      <Heading style={{ color: "#A30E0E" }}>Customer Care</Heading>

      {CUSTOMER_CARE_LINKS.map((item, ind) => (
        <StyledLink isDark={isDark} href={`/${item}`} key={ind}>
          {item}
        </StyledLink>
      ))}
    </Fragment>
  );
}
