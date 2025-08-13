"use client";
import { Container, Typography, Box } from "@mui/material";
import { themeColors } from "theme/theme-colors";
import { useTranslations, useMessages } from "next-intl";

// Componente extremadamente simple: pinta cada sección explícitamente.
const TermsPage = () => {
  const t = useTranslations("Terms");
  const messages = useMessages() as any; // Acceso directo a los textos por si falla t()

  const Section = ({ n }: { n: number }) => {
    const title = t(`section${n}.title` as any);
    const keyPath = `Terms.section${n}.content`;
    let content = t(`section${n}.content` as any);
    // Si t() devuelve la key cruda (falta o no se resolvió), buscamos en messages.
    if (content === keyPath && messages?.Terms?.[`section${n}`]?.content) {
      content = messages.Terms[`section${n}`].content;
    }
    return (
      <Box component="section" mb={4}>
        <Typography variant="h4" component="h2" fontWeight={600} mb={2}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          mb={2}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ color: themeColors.grey[200], py: 4 }}>
      <Box component="header" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          mb={4}
          textAlign="center"
        >
          {t("title")}
        </Typography>
        {/* Si quieres una intro corta, asegura la key introShort en messages */}
        {t.has?.("introShort" as any) && (
          <Typography variant="body2" mb={2}>
            {t("introShort" as any)}
          </Typography>
        )}
      </Box>

      {/* Secciones (enumeradas manualmente para máxima simplicidad) */}
      <Section n={1} />
      <Section n={2} />
      <Section n={3} />
      <Section n={4} />
      <Section n={5} />
      <Section n={6} />
      <Section n={7} />
      <Section n={8} />
      <Section n={9} />
      <Section n={10} />
      <Section n={11} />
      <Section n={12} />
      <Section n={13} />


    </Container>
  );
};

export default TermsPage;