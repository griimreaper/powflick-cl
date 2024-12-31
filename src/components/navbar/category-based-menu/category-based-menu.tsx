import { useState } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENT
import FlexRowCenter from "components/flex-box/flex-row-center";
// LOCAL CUSTOM COMPONENTS
import Categories from "./components/categories";
import ChildCategories from "./components/child-categories";
// STYLED COMPONENTS
import { Wrapper, StyledCard, MenusContainer } from "./styles";
// DATA TYPES
import { MenuList } from "./types";
import Link from "next/link";
import { Typography } from "@mui/material";

// ===============================================================
type Props = { menuList: MenuList[]; title: string };
// ===============================================================

export default function CategoryBasedMenu({ title, menuList }: Props) {
  const [openList, setOpenList] = useState(menuList[0].title);
  const categories = menuList.reduce<string[]>((prev, curr) => [...prev, curr.title], []);
  const subCategories = menuList.find((item) => item.title === openList);

  return (
    <Wrapper>
      <FlexRowCenter alignItems="center" display={"flex"} flexDirection={"row"} width={"100%"} gap={"0.3rem"}>
        <Link href={'/products'}>
          <Typography sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Link>
        <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem", display: "absolute" }} />
      </FlexRowCenter>

      <MenusContainer className="menu-list">
        <StyledCard>
          {/* MAIN CATEGORIES SECTION */}
          <Categories
            openList={openList}
            categories={categories}
            handleOpen={(item) => setOpenList(item)}
          />

          {/* SUB / CHILD CATEGORIES SECTION */}
          <ChildCategories categories={subCategories!} />
        </StyledCard>
      </MenusContainer>
    </Wrapper>
  );
}
