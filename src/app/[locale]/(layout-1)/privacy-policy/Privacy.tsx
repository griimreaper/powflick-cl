"use client"
import { Container, Typography, Box, List } from "@mui/material";
import { themeColors } from "theme/theme-colors";
import { useTranslations } from 'next-intl';

const PrivacyPage = () => {
    const t = useTranslations('Privacy');

    // Detecta cuántas secciones existen según las claves de traducción
    const sectionNumbers: number[] = [];
    for (let i = 1; i <= 50; i++) {
        if (t.has(`section${i}.title` as any)) sectionNumbers.push(i); else break;
    }

    const renderSection = (sectionIndex: number) => {
        // Collect item keys dynamically until a gap appears
        const items: JSX.Element[] = [];
        for (let i = 0; i < 20; i++) {
            const baseKey = `section${sectionIndex}.items.${i}`;
            const hasText = t.has(`${baseKey}.text` as any);
            const hasSubtitle = t.has(`${baseKey}.subtitle` as any);
            if (!hasText && !hasSubtitle) break;
            items.push(
                <Box key={i} mb={2}>
                    {hasSubtitle && (
                        <Typography variant="h5" component="h3" fontWeight={600} mb={1}>
                            {t(`${baseKey}.subtitle` as any)}
                        </Typography>
                    )}
                    {hasText && (
                        <Typography variant="body2" component="div">
                            {t(`${baseKey}.text` as any)}
                        </Typography>
                    )}
                </Box>
            );
        }
        // Lists
        const listItems: JSX.Element[] = [];
        for (let j = 0; j < 20; j++) {
            const listKey = `section${sectionIndex}.list.${j}`;
            if (!t.has(listKey as any)) break;
            listItems.push(
                <Typography key={j} component="li" variant="body2" sx={{ display: 'list-item', mb: 1 }}>
                    {t(listKey as any)}
                </Typography>
            );
        }
        return (
            <>
                {items}
                {listItems.length > 0 && (
                    <List dense sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
                        {listItems}
                    </List>
                )}
            </>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4, color: themeColors.grey[200] }}>
            <Box component="header" mb={4}>
                <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center" mb={4}>
                    {t('title')}
                </Typography>
                {t.has('introShort' as any) && (
                    <Box component="section" mb={4}>
                        <Typography variant="body2" mb={2}>{t('introShort' as any)}</Typography>
                    </Box>
                )}
            </Box>

            {sectionNumbers.map((n) => (
                <Box key={n} component="section" mb={4}>
                    <Typography variant="h4" component="h2" fontWeight={600} mb={2}>
                        {t(`section${n}.title` as any)}
                    </Typography>
                    {renderSection(n)}
                </Box>
            ))}
        </Container>
    );
};

export default PrivacyPage;