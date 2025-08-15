import { getTranslations } from "next-intl/server";
import ClientLocaleProbe from "./ClientLocaleProbe";

export default async function ServerI18nProbe({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "Home" });
    return (
        <section
            role="status"
            aria-label="ServerI18nProbe"
            style={{
                padding: "10px 12px",
                margin: "8px 0 12px",
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                borderRadius: 6,
                fontSize: 12,
            }}
        >
            <strong style={{ marginRight: 8 }}>ServerI18nProbe</strong>
            <span style={{ opacity: 0.8, marginRight: 8 }}>locale: {locale}</span>
            <h1>{t("testTranslation")}</h1>
            <ClientLocaleProbe />
        </section>
    );
}
