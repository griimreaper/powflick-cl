import { getStructuredData } from "./StructuredData";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const structuredData = getStructuredData();

    return (
        <html lang="en">
            <head>
                {structuredData && (
                    <script
                        type="application/ld+json"
                    >{structuredData}
                    </script>
                )}
            </head>
            <body>{children}</body>
        </html>
    );
}
