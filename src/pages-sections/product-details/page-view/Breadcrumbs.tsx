import Link from "next/link";
import { Breadcrumbs as MuiBreadcrumbs, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Breadcrumb {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" style={{ color: "text.secundary" }} />}
            sx={{
                "& a": {
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "text.secundary",
                    "&:hover": {
                        color: "primary.main",
                    },
                },
                "& .MuiTypography-root": {
                    fontWeight: "medium",
                },
            }}
        >
            {items.map((item, index) => (
                item.href ? (
                    <Link key={index} href={item.href} >
                        <Typography key={index}>{item.label}</Typography>
                    </Link>
                ) : (
                    <Typography key={index}>{item.label}</Typography>
                )
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
