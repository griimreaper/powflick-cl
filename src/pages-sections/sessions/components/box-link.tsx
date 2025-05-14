import { Box, Link } from "@mui/material";

// ==============================================================
interface BoxLinkProps {
  title: string;
  href?: string;
  onClick?: () => void; // Hacer que onClick sea opcional
}
// ==============================================================

export default function BoxLink({ title, href, onClick }: BoxLinkProps) {
  return (
    <Box sx={{cursor: "pointer"}}>
      <Link href={href} onClick={onClick}>
        {title}
      </Link>
    </Box>
  );
}
