import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Clear from "@mui/icons-material/Clear";
import Scrollbar from "components/scrollbar";
import { StyledNavLink } from "components/navbar/styles";
import { renderLevels } from "./render-levels";
import { DataStructure } from "models/types";
import { themeColors } from "theme/theme-colors";

export default function MobileMenu({data}: {data: DataStructure['navbar']}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClose = () => setOpenDrawer(false);

  const storeMenu = { title: 'Collections', child: data?.categories }

  return (
    <Fragment>
      <IconButton
        onClick={() => setOpenDrawer(true)}
        sx={{ flexShrink: 0, color: "#FFFFFF" }}
      >
        <Menu />
      </IconButton>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleClose}
        sx={{ zIndex: 15001 }}
      >
        <Box width="100vw" height="100%" position="relative" sx={{ backgroundColor: "#1A1A1A" }}>
          <Scrollbar autoHide={false} sx={{ height: "100vh" }}>
            <Box
              px={5}
              py={8}
              maxWidth={500}
              margin="auto"
              position="relative"
              height="100%"
            >
              {/* CLOSE BUTTON */}
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", right: 30, top: 15, color: themeColors.text.secondary }}
              >
                <Clear fontSize="small" />
              </IconButton>

              {/* MULTI LEVEL MENU RENDER */}
              {storeMenu && renderLevels([storeMenu], handleClose)}

              {/* OTHER LINKS */}
              <Box display="flex" flexDirection="column" gap={2}>
                <StyledNavLink href="/products">Store</StyledNavLink>
                <StyledNavLink href="/your-design">Super Design</StyledNavLink>
                <StyledNavLink href="/blog">Blog</StyledNavLink>
                <StyledNavLink href="/contact">Contact</StyledNavLink>
                <StyledNavLink href="/about-us">About Us</StyledNavLink>
                <StyledNavLink href="/help">Help</StyledNavLink>
              </Box>
            </Box>
          </Scrollbar>
        </Box>
      </Drawer>
    </Fragment>
  );
}
