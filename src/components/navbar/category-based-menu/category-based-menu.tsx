import { useEffect, useState } from "react";
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
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

// ===============================================================
type Props = { menuList: MenuList[]; title: string };
// ===============================================================

export default function CategoryBasedMenu({ title, menuList }: Props) {
  const [openList, setOpenList] = useState(menuList[0]?.title || "");
  const categories = menuList.reduce<string[]>((prev, curr) => [...prev, curr.title], []);
  const subCategories = menuList.find((item) => item.title === openList) || { title: "", child: [] };

  return (
    <Wrapper>
      <FlexRowCenter
        alignItems="center"
        display={"flex"}
        flexDirection={"row"}
        gap={"0.3rem"}
        height={"100%"}
        sx={{ fontWeight: 600, color: "#FEFCFC", '&:hover': { color: "#1A1A1A" } }}
      >
        <Link href={"/products"} >
            <Typography sx={{ fontWeight: 'bold' }}>
            {title}
            </Typography>
        </Link>
        <KeyboardArrowDown
          sx={{ color: "#FEFCFC", fontSize: "1.1rem", display: "absolute" }}
        />
      </FlexRowCenter>

      <MenusContainer className="menu-list">
        <Box sx={{ background:'transparent', position: 'relative', top: 14, height: '100%' }}>
          <StyledCard >
            {/* MAIN CATEGORIES SECTION */}
            <Categories
              openList={openList}
              categories={categories}
              handleOpen={(item) => setOpenList(item)}
            />

            {/* SUB / CHILD CATEGORIES SECTION */}
            <ChildCategories categories={subCategories} />
          </StyledCard>
        </Box>
      </MenusContainer>
    </Wrapper>
  );
}
