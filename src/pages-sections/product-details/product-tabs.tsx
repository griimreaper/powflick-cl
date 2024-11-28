"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import ProductReview from "./product-review";
import ProductDescription from "./product-description";
import { Review } from "models/types";

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

export default function ProductTabs({ content, reviews, productId }: { content: string, reviews: Review[], productId: string }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_: any, value: number) => setSelectedOption(value);

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}>
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label={`Review (${reviews.length})`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription content={content} />}
        {selectedOption === 1 && <ProductReview reviews={reviews} typeId={productId}/>}
      </Box>
    </>
  );
}
