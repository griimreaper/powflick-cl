import * as React from "react";
import { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import MainContent from "./components/MainContent";
import Latest from "./components/Latest";

export const metadata: Metadata = {
  title: "Blog - Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/en/blog",
    languages: {
      en: "https://www.powflick.com/en/blog",
      es: "https://www.powflick.com/es/blog",
      "x-default": "https://www.powflick.com/en/blog",
    },
  },
};

export default function Blog() {
  return (
    <>
      <CssBaseline enableColorScheme />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
    </>
  );
}
