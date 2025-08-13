import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function DynamicButton({ href }: { href: string }) {
    const t = useTranslations("Home");
    return (
        <Button
            color="primary"
            variant="contained"
            href={href}
            style={{
                width: "clamp(140px, 17vw, 500px)",
                borderRadius: 1,
                color: "white",
                whiteSpace: "nowrap",
                fontWeight: 400,
                fontSize: "clamp(12px, 2.5vw, 120px)",
                fontStyle: "italic",
            }}
        >
            {t("shopNow")}
        </Button>
    );
}
