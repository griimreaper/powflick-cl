"use client";

import { useLocale, useTranslations } from "next-intl";

export default function ClientLocaleProbe() {
    const locale = useLocale();
    const t = useTranslations("Home");
    return (
        <div
            role="status"
            aria-label="ClientLocaleProbe"
            style={{
                padding: "8px 10px",
                marginTop: 6,
                background: "#222",
                color: "#fff",
                border: "1px solid #333",
                borderRadius: 6,
                fontSize: 12,
            }}
        >
            <strong style={{ marginRight: 8 }}>ClientLocaleProbe</strong>
            <span style={{ opacity: 0.8, marginRight: 8 }}>locale: {locale}</span>
            <span>{t("testTranslation")}</span>
        </div>
    );
}
