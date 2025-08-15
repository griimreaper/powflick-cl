'use client';
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Grid, Card, CardActionArea, Typography, Collapse, Box, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";

const sectionsDataBuilder = (t: (k: string) => string) => ({
  orders: {
    title: t('sections.orders.title'),
    image: "/assets/images/faqs/FAQS_ICONOS-7.png",
    sections: [
      {
        id: "1",
        title: t('sections.orders.q1Title'),
        content: t('sections.orders.q1Content'),
      },
      {
        id: "2",
        title: t('sections.orders.q2Title'),
        content: t('sections.orders.q2Content'),
      },
      {
        id: "3",
        title: t('sections.orders.q3Title'),
        content: t('sections.orders.q3Content'),
      },
      {
        id: "4",
        title: t('sections.orders.q4Title'),
        content: t('sections.orders.q4Content'),
      },
    ],
  },
  payments: {
    title: t('sections.payments.title'),
    image: "/assets/images/faqs/FAQS_ICONOS-8.png",
    sections: [
      {
        id: "5",
        title: t('sections.payments.q5Title'),
        content: t('sections.payments.q5Content'),
      },
      {
        id: "6",
        title: t('sections.payments.q6Title'),
        content: t('sections.payments.q6Content'),
      },
      {
        id: "7",
        title: t('sections.payments.q7Title'),
        content: t('sections.payments.q7Content'),
      },
    ],
  },
  shipping: {
    title: t('sections.shipping.title'),
    image: "/assets/images/faqs/FAQS_ICONOS-9.png",
    sections: [
      {
        id: "8",
        title: t('sections.shipping.q8Title'),
        content: t('sections.shipping.q8Content'),
      },
      {
        id: "9",
        title: t('sections.shipping.q9Title'),
        content: t('sections.shipping.q9Content'),
      },
      {
        id: "10",
        title: t('sections.shipping.q10Title'),
        content: t('sections.shipping.q10Content'),
      },
    ],
  },
  returns: {
    title: t('sections.returns.title'),
    image: "/assets/images/faqs/FAQS_ICONOS-10.png",
    sections: [
      {
        id: "11",
        title: t('sections.returns.q11Title'),
        content: t('sections.returns.q11Content'),
      },
      {
        id: "12",
        title: t('sections.returns.q12Title'),
        content: t('sections.returns.q12Content'),
      },
      {
        id: "13",
        title: t('sections.returns.q13Title'),
        content: t('sections.returns.q13Content'),
      },
    ],
  },
});

export default function FAQSection() {
  const t = useTranslations('Faq');
  const sectionsData = sectionsDataBuilder(t);
  const isMobile = useMediaQuery("(max-width: 765px)"); // Detecta si es móvil
  const [activeTab, setActiveTab] = useState<string | null>('orders');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const handleActiveTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab); // Toggle active tab
    setActiveQuestion(null); // Reset active question when tab changes
  };

  const handleActiveQuestion = (questionId: string) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId); // Toggle active question
  };

  const renderQuestions = (tab: keyof typeof sectionsData) => (
    <Box className={`tab-question ${activeTab === tab ? "active" : ""}`} mt={isMobile ? -8 : 0}>
      {sectionsData[tab].sections.map((question) => (
        <Accordion
          key={question.id}
          expanded={activeQuestion === question.id}
          onChange={() => handleActiveQuestion(question.id)}
          sx={{
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 2,
            marginY: 2,
            borderRadius: 2,
            paddingX: 1,
            color: activeQuestion === question.id ? 'black' : 'white',
            backgroundColor: activeQuestion === question.id ? '#f0f0f0' : 'primary.main',  // Fondo gris clarito cuando seleccionado
            '&:hover': {
              backgroundColor: activeQuestion === question.id ? '#f0f0f0' : "#E3364E",  // Color al pasar el mouse
            },
            transition: '0.3s',  // Transición suave al cambiar el color de fondo
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ background: activeQuestion === question.id ? 'darkgray' : 'white', borderRadius: '100%', transition: 'background-color 0.3s', }} />} // Fondo gris oscuro para el icono
          >
            <Typography fontWeight={500} fontSize={isMobile ? '1rem' : '1.2rem'}>{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={isMobile ? '0.8rem' : '1rem'}>{question.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );


  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", background: 'white' }}>
      <Box style={{ position: "relative", width: "100%" }}>
        <img
          src="/assets/images/faqs/FAQS_FORMAS-4.png"
          alt="Overlay"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 2,
            width: window.innerWidth <= 768 ? "75px" : "180px",
            height: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: '100%',
          height: '30rem', // Ajusta la altura según lo que necesites
          backgroundImage: 'url("/assets/images/faqs/FAQS_BACKGROUND.png")', // Ruta de la imagen de fondo
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >

        <Box sx={{ width: isMobile ? '100%' : '80%', p: isMobile ? 4 : 0 }}>
          <Typography variant="h3" component={'h1'} sx={{ fontWeight: '400', fontFamily: "GYMER", fontSize: isMobile ? '1.3rem' : '2rem', textAlign: 'center', mb: 2, color: 'white', position: 'relative' }}>
            {t('heroTitle')}
          </Typography>
          <Typography variant="h5" component={'h2'} sx={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1rem' : '2rem' }}>
            {t('heroSubtitle')}
          </Typography>
        </Box>
      </Box>
      <Box style={{ position: "relative", width: "100%" }}>
        <img
          src="/assets/images/faqs/FAQS_FORMAS-5.png"
          alt="Overlay"
          style={{
            position: "absolute",
            left: 0,
            bottom: window.innerWidth <= 768 ? -100 : -300,
            zIndex: 0,
            width: window.innerWidth <= 768 ? "75px" : "180px",
            height: "auto",
          }}
        />
      </Box>
      <Box sx={{ width: isMobile ? '100%' : '80%', position: 'relative', top: '-80px', p: isMobile ? 4 : 0 }}>
        <Grid container spacing={3} justifyContent="center" mb={10}>
          {Object.entries(sectionsData).map(([key, section]) => (
            <Grid item xs={6} sm={6} md={3} key={key}>
              <img
                src={section.image}
                alt={section.title}
                onClick={() => handleActiveTab(key)}
                style={{
                  position: "relative",
                  borderRadius: 6,
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  boxSizing: "border-box",
                  border: activeTab === key ? "3px solid #CA0B0B" : "none",
                }}
              >
              </img>
            </Grid>
          ))}
        </Grid>

        {/* Display questions for the active section */}
        <Collapse in={!!activeTab} timeout="auto" unmountOnExit>
          {activeTab && renderQuestions(activeTab as keyof typeof sectionsData)}
        </Collapse>
      </Box>
      <Box style={{ position: "relative", width: "100%" }}>
        <img
          src="/assets/images/faqs/FAQS_FORMAS-6.png"
          alt="Overlay"
          style={{
            position: "absolute",
            right: 0,
            bottom: -32,
            zIndex: 0,
            width: window.innerWidth <= 768 ? "75px" : "180px",
            height: "auto",
          }}
        />
      </Box>
      <Box bgcolor={'#5f0404'} width={'100%'} display='flex' justifyContent='center' mt={4}>
        <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'} bgcolor={'#5f0404'} width={isMobile ? '100%' : '80%'} p={4}>
          <Link href={'/contact'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
              <img src="/assets/images/faqs/FAQS_CONTACT.png" alt={t('sections.contact.contactImageAlt')} width={isMobile ? "50%" : '80%'} />
            </Box>
          </Link>
          <Box sx={{ width: isMobile ? '100%' : '80%' }} textAlign={isMobile ? 'center' : 'left'} ml={isMobile ? 0 : 6}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              <strong>{t('sections.contact.contactQuestion1')}</strong><br />
            </Typography>
            <Typography variant="h5" color={'white'} mb={3}>
              {t('sections.contact.contactAnswer1')}
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              <strong>{t('sections.contact.contactQuestion2')}</strong>
            </Typography>
            <Typography variant="h5" color={'white'}>
              {t('sections.contact.contactAnswer2')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
