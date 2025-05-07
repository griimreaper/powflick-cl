"use client";

import { Fragment, useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Clear from "@mui/icons-material/Clear";
import { StyledNavLink } from "components/navbar/styles";
import { renderLevels } from "./render-levels";
import { DataStructure } from "models/types";
import { themeColors } from "theme/theme-colors";
import { Drawer } from "@mui/material";

export default function MobileMenu({ data }: { data: DataStructure["navbar"] }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  // Memorizar la función para evitar recreaciones en cada render
  const handleClose = useCallback(() => setOpenDrawer(false), []);

  // Memorizar los datos del menú para evitar cálculos innecesarios
  const storeMenu = useMemo(() => ({ title: "Collections", child: data?.categories }), [data]);

  return (
    <Fragment>
      <IconButton
        onClick={() => setOpenDrawer(true)}
        sx={{ flexShrink: 0, color: "#FFFFFF" }}
      >
        <Menu />
      </IconButton>

      {openDrawer && (
        <Drawer anchor="left" open={openDrawer} onClose={handleClose} sx={{ zIndex: 15001 }}>
          <Box width="100vw" position="relative" sx={{ backgroundColor: "#1A1A1A" }}>
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
                <Clear fontSize="small" color="primary" />
              </IconButton>

              {/* MULTI LEVEL MENU RENDER */}
              {storeMenu && renderLevels([storeMenu], handleClose)}

              {/* OTHER LINKS */}
              <Box display="flex" flexDirection="column" gap={2}>
                <StyledNavLink href="/products">Store</StyledNavLink>
                <StyledNavLink href="/your-design">Get a Free Design</StyledNavLink>
                <StyledNavLink href="/contact">Contact</StyledNavLink>
                <StyledNavLink href="/about-us">About Us</StyledNavLink>
                <StyledNavLink href="/help">FAQ</StyledNavLink>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </Fragment>
  );
}
