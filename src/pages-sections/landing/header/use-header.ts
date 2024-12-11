import { useState, useEffect } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import debounce from "lodash/debounce";

export default function useHeader() {
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = () => setOpen((open) => !open);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollListener = debounce(() => {
      if (window.scrollY >= 72) setFixed(true);
      else setFixed(false);
    }, 50);

    window.addEventListener("scroll", scrollListener);

    // Cleanup function (función que se ejecuta cuando el componente se desmonta)
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return { open, isFixed, downSM, toggleSidenav };
}
