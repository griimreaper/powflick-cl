'use client';
import { useState } from "react";
import { Grid, Card, CardActionArea, Typography, Collapse, Box, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";

const sectionsData = {
  orders: {
    title: "Orders & Customization",
    image: "/assets/images/faqs/FAQS_ICONOS-7.png",
    sections: [
      {
        id: "1",
        title: "How can I customize my uniform?",
        content: "Select the type of uniform, choose sizes and genders, and add your logos, texts, or numbers. Upload logos in vector format (SVG, AI, EPS, PDF) or high resolution (minimum 300 dpi).",
      },
      {
        id: "2",
        title: "What file types can I upload for logos?",
        content: "We recommend vector files (SVG, AI, EPS, PDF). If you don't have these formats, send the highest resolution image possible. We can’t guarantee optimal print quality if the file doesn’t meet our requirements.",
      },
      {
        id: "3",
        title: "Can I see a preview before confirming my order?",
        content: "Yes, once you complete your customization, you can generate a PDF file with a preview of your design.",
      },
      {
        id: "4",
        title: "Can I modify or cancel my order after purchasing?",
        content: "You have up to 2 hours after placing your order to cancel it free of charge. After that, if the order is already in production, no changes can be made, and a 10% fee will apply for cancellations.",
      },
    ],
  },
  payments: {
    title: "Prices & Payments",
    image: "/assets/images/faqs/FAQS_ICONOS-8.png",
    sections: [
      {
        id: "5",
        title: "What payment methods do you accept?",
        content: "We accept credit cards (Visa, Mastercard, Maestro, American Express) and payments via Stripe.",
      },
      {
        id: "6",
        title: "Do prices include taxes?",
        content: "No, taxes are calculated at checkout based on the shipping location.",
      },
      {
        id: "7",
        title: "Do you offer discounts or promotions?",
        content: "Yes, we occasionally offer promotional codes and discounts. Stay tuned to our social media and newsletters!",
      },
    ],
  },
  shipping: {
    title: "Shipping & Delivery",
    image: "/assets/images/faqs/FAQS_ICONOS-9.png",
    sections: [
      {
        id: "8",
        title: "How long will it take to receive my order?",
        content: "Production takes about 30 days. Shipping times vary depending on the destination:\nUSA, European Union, and Mexico: 10–20 business days.\nOther destinations: Shipping times may vary depending on the country.",
      },
      {
        id: "9",
        title: "Do you offer express shipping?",
        content: "Yes, for an additional $20 USD, you can select express shipping at checkout. This service reduces delivery time to approximately 15 days.",
      },
      {
        id: "10",
        title: "Do I have to pay customs duties or taxes?",
        content: "Yes, customs duties and taxes are the customer's responsibility and vary by country.",
      },
    ],
  },
  returns: {
    title: "Returns & Claims",
    image: "/assets/images/faqs/FAQS_ICONOS-10.png",
    sections: [
      {
        id: "11",
        title: "Can I return a customized product?",
        content: "Since our products are made to order, we don’t accept returns unless there’s a manufacturing defect or an obvious error.",
      },
      {
        id: "12",
        title: "What should I do if I receive a defective or incorrect product?",
        content: "Contact us within 7 business days of receiving your product by emailing support@powflick.com with a detailed description and photos of the issue.",
      },
      {
        id: "13",
        title: "Who covers the shipping costs for returns?",
        content: "If we accept the return due to a defect or error, Pow Flick will cover the return shipping costs and the cost of shipping a replacement.",
      },
    ],
  },
};

export default function FAQSection() {
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
          <Typography variant="h3" component={'h1'} sx={{ fontWeight: '400', fontFamily: "GYMER", fontSize: isMobile ? '1.3rem' : '2rem', textAlign: 'center', mb: 2, color: 'white', position: 'relative', zIndex:3 }}>
            We want your experience to be perfect!
          </Typography>
          <Typography variant="h5" component={'h2'} sx={{ textAlign: 'center', color: 'white', fontSize: isMobile ? '1rem' : '2rem' }}>
            {"Here you'll find answers to the most common questions about orders, payments, and shipping. If anything’s unclear, just reach out we’re here to help!"}
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
              <img src="/assets/images/faqs/FAQS_CONTACT.png" alt="Contact" width={isMobile ? "50%" : '80%'} />
            </Box>
          </Link>
          <Box sx={{ width: isMobile ? '100%' : '80%' }} textAlign={isMobile ? 'center' : 'left'} ml={isMobile ? 0 : 6}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              <strong>How can I get in touch with Pow Flick?</strong><br />
            </Typography>
            <Typography variant="h5" color={'white'} mb={3}>
              You can email us at support@powflick.com or call us at +86 15920110846.
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              <strong> Where are you located?</strong>
            </Typography>
            <Typography variant="h5" color={'white'}>
              Our headquarters are at B15-280, Xia Nan Yi Heng Base Section, Guicheng Subdistrict, Nanhai District, Foshan City, Guangdong Province, China.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
