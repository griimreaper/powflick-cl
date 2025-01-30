"use client";
import React, { useState } from "react";

import {
  Container,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faqs = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>("how to buy");
  const [activeQuestion, setActiveQuestion] = useState<string | undefined>("");

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleActiveQuestion = (question: string) => {
    setActiveQuestion((prevQuestion) =>
      prevQuestion === question ? undefined : question
    );
  };

  type Question = {
    id: string;
    title: string;
    content: string;
  };

  type Questions = {
    "how to buy": Question[];
    "payment methods": Question[];
    delivery: Question[];
    "exchanges & returns": Question[];
    registration: Question[];
    "look after your garments": Question[];
    contacts: Question[];
  };

  const questions: Questions = {
    "how to buy": [
      {
        id: "1",
        title: "How to place an order?",
        content:
          "To place an order, simply browse our catalog, add items to your cart, and proceed to checkout. Follow the instructions to complete your purchase.",
      },
      {
        id: "2",
        title: "Can I track my order?",
        content:
          "Yes, once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.",
      },
    ],
    "payment methods": [
      {
        id: "3",
        title: "What payment methods are accepted?",
        content:
          "We accept various payment methods including credit/debit cards, PayPal, and bank transfers.",
      },
      {
        id: "4",
        title: "Is it safe to use my credit card?",
        content:
          "Yes, we use secure encryption technology to ensure your personal and payment information is protected.",
      },
    ],
    delivery: [
      {
        id: "5",
        title: "What are the delivery options?",
        content:
          "We offer standard and express delivery options. You can choose your preferred option at checkout.",
      },
      {
        id: "6",
        title: "Do you offer international shipping?",
        content:
          "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary depending on the destination.",
      },
    ],
    "exchanges & returns": [
      {
        id: "7",
        title: "What is your return policy?",
        content:
          "You can return any unused items within 30 days of purchase for a full refund. Please contact our customer service for return instructions.",
      },
      {
        id: "8",
        title: "How do I exchange an item?",
        content:
          "To exchange an item, please contact our customer service. We will guide you through the process and ensure you receive the correct item.",
      },
    ],
    registration: [
      {
        id: "9",
        title: "How do I create an account?",
        content:
          'To create an account, click on the "Sign Up" button at the top of the page and fill in the required information.',
      },
      {
        id: "10",
        title: "What are the benefits of registering?",
        content:
          "By registering, you can save your shipping information, track your orders, and receive exclusive offers and updates.",
      },
    ],
    "look after your garments": [
      {
        id: "11",
        title: "How do I care for my sportswear?",
        content:
          "Follow the care instructions provided with each garment. Generally, wash them in cold water and avoid using bleach.",
      },
      {
        id: "12",
        title: "Can I wash my sports gear?",
        content:
          "Yes, most sports gear can be machine washed with mild detergent. Air dry them completely before use.",
      },
    ],
    contacts: [
      {
        id: "13",
        title: "How can I contact customer service?",
        content:
          'You can contact our customer service via email, phone, or live chat. Our contact information is available on the "Contact Us" page.',
      },
      {
        id: "14",
        title: "What are your customer service hours?",
        content:
          "Our customer service is available Monday to Friday, from 9 AM to 6 PM.",
      },
    ],
  };

  const renderQuestions = (tab: keyof Questions) => (
    <Box className={`tab-question  ${activeTab === tab ? "active" : ""}`}>
      {questions[tab].map((question) => (
        <Accordion
          key={question.id}
          expanded={activeQuestion === question.id}
          onChange={() => handleActiveQuestion(question.id)}
          sx={{ marginY: 1 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{question.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  return (
    <>
      <Box className="faqs-block" sx={{ py: 2, backgroundColor: "white" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            FAQs
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <List>
                {Object.keys(questions).map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    selected={activeTab === item}
                    onClick={() => handleActiveTab(item)}
                    sx={{
                      marginBottom: "0.5rem",
                      backgroundColor: "#f0f0f0",
                      "&:hover": { backgroundColor: "#CA0B0B" },
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              {renderQuestions(activeTab as keyof Questions)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Faqs;
