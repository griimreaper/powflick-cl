"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import { Review } from "models/types";
import PricingSectionTab from "./PricingTab";
import DetailReviewList from "./DetailsReviewList";
import SizeTableTab from "./SizeTableTab";
import WorldWideTab from "./WorldWideTab";
import DescriptionTab from "./DescriptionTab";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";

// STYLED COMPONENT
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize"
  }
}));

export default function ProductTabs({ reviews, hasInfluencer }: { reviews: Review[], hasInfluencer?: boolean }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const contentList = [
    {
      label: "Description",
      content: <DescriptionTab />,
      hidden: false
    },
    {
      label: "Pricing Information",
      content: <PricingSectionTab />,
      hidden: hasInfluencer
    },
    {
      label: "Size Table",
      content: <SizeTableTab />,
      hidden: false
    },
    {
      label: "Worldwide Shipping",
      content: <WorldWideTab />,
      hidden: false
    },
    {
      label: "Reviews",
      content: <DetailReviewList reviews={reviews} />,
      hidden: false
    }
  ];

  const visibleTabs = contentList.filter(tab => !tab.hidden);

  return (
    <>
      <Box my={6} sx={{ display: { sm: 'none', xs: 'block' } }} >
        {visibleTabs.map(({ label, content }, index) => (
          <div key={index}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <Typography fontWeight={600}>{label}</Typography>
              </AccordionSummary>
              <AccordionDetails>{content}</AccordionDetails>
            </Accordion>
          </div>
        ))}
      </Box>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={(_, val) => setSelectedOption(val)}
        variant="scrollable"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        {visibleTabs.map(({ label }, index) => (
          <Tab key={index} className="inner-tab" label={label} />
        ))}
      </StyledTabs>

      <Box mb={6} sx={{ display: { xs: 'none', sm: 'flex' } }}>{visibleTabs[selectedOption]?.content}</Box>
    </>
  );
}