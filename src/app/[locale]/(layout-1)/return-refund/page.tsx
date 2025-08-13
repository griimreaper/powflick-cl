import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ReturnRefund' });
  const title = `${t('title')} - Pow Flick`;
  return {
    title,
    description: t('intro1'),
    alternates: {
      canonical: `https://www.powflick.com/${locale}/return-refund`,
      languages: {
        en: 'https://www.powflick.com/en/return-refund',
        es: 'https://www.powflick.com/es/return-refund',
        'x-default': 'https://www.powflick.com/en/return-refund'
      }
    },
    openGraph: {
      title,
      description: t('intro1'),
      url: `https://www.powflick.com/${locale}/return-refund`,
      type: 'website'
    }
  };
}

const ReturnRefundPage = async ({ params: { locale } }: { params: { locale: (typeof locales)[number] } }) => {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ReturnRefund' });
  return (
    <Container maxWidth="xl" sx={{ color: "white", py: 4 }}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography paragraph>{t("intro1")}</Typography>
        <Typography paragraph>{t("intro2")}</Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          {t("cancellationsTitle")}
        </Typography>
        <Typography paragraph>{t("cancellationsIntro")}</Typography>
        <List>
          <ListItem><ListItemText primary={`• ${t("cancellationFree")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("cancellationFee")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("cancellationNot")}`} /></ListItem>
        </List>
        <Typography paragraph>
          <strong>{t("cancellationHowTitle")}</strong><br />{t("cancellationHowBody")}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          {t("returnsTitle")}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("returnsGeneralTitle")}
        </Typography>
        <Typography paragraph>{t("returnsGeneralBody")}</Typography>
        <Typography paragraph>
          <strong>{t("returnsConditionsTitle")}</strong><br />{t("returnsConditionsIntro")}
        </Typography>
        <List>
          <ListItem><ListItemText primary={`• ${t("returnsCond1")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("returnsCond2")}`} /></ListItem>
        </List>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("exclusionsTitle")}
        </Typography>
        <Typography paragraph>{t("exclusionsIntro")}</Typography>
        <List>
          <ListItem><ListItemText primary={`• ${t("exclusion1")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("exclusion2")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("exclusion3")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("exclusion4")}`} /></ListItem>
        </List>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("claimPeriodTitle")}
        </Typography>
        <Typography paragraph>{t("claimPeriodBody")}</Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("claimHowTitle")}
        </Typography>
        <Typography paragraph>{t("claimHowBody")}</Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("claimEvalTitle")}
        </Typography>
        <Typography paragraph>{t("claimEvalBody")}</Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {t("claimResolutionTitle")}
        </Typography>
        <Typography paragraph>{t("claimResolutionIntro")}</Typography>
        <List>
          <ListItem><ListItemText primary={`• ${t("claimRes1")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("claimRes2")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("claimRes3")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("claimRes4")}`} /></ListItem>
          <ListItem><ListItemText primary={`• ${t("claimRes5")}`} /></ListItem>
        </List>
        <Typography variant="h5" component="h2" gutterBottom>
          {t("unavailableTitle")}
        </Typography>
        <Typography paragraph>{t("unavailableBody")}</Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t("pricingTitle")}
        </Typography>
        <Typography paragraph>{t("pricingBody")}</Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t("contactTitle")}
        </Typography>
        <Typography paragraph>{t("contactIntro")}</Typography>
        <Typography paragraph>
          {t("contactEmail")}<br />{t("contactPhone")}<br />{t("contactResponse")}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t("changesTitle")}
        </Typography>
        <Typography paragraph>{t("changesBody")}</Typography>
        <Box mt={6} textAlign="center">
          <Typography variant="caption" color="grey.500">{t('lastUpdate')}: {t('lastUpdateDate')}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ReturnRefundPage;
