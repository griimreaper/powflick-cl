"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import { Review } from "models/types";
import { H4 } from "components/Typography";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaApplePay, FaGooglePay } from "react-icons/fa";
import ProductComment from "./product-comment";
import { Reviews } from "components/Reviews/Reviews";


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

interface Props {
  content: string,
  reviews: Review[],
  paymentMethods: { text: string },
  shippingTypes: string
}

export default function ProductTabs({ content, reviews, paymentMethods, shippingTypes }: Props) {
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_: any, value: number) => setSelectedOption(value);

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}
        variant='scrollable'
      >
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label={`Review (${reviews.length})`} />
        <Tab className="inner-tab" label={`Payment Method`} />
        <Tab className="inner-tab" label={`Shipping Types`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 &&
          <H4>
            {content}
          </H4>
        }
        {selectedOption === 1 &&
          <Box>
            <Reviews review={reviews} />
            {reviews.map((item, ind) => (
              <ProductComment
                name={item.user.firstName + " " + item.user.lastName}
                comment={item.review}
                date={item.createdAt}
                rating={Number(item.rating)}
                imgUrl={item.user.image}
                key={ind}
              />
            ))}
          </Box>
        }
        {selectedOption === 2 &&
          <Box display="flex" flexDirection={'column'} alignItems="start" width={'100%'} gap={2}>
            <H4>{paymentMethods.text}</H4>
            <Box display={'flex'} gap={2}>
              <FaCcVisa size={100} color="#1A1F71" />       {/* Azul de Visa */}
              <FaCcMastercard size={100} color="#EB001B" /> {/* Rojo de Mastercard */}
              <FaCcAmex size={100} color="#0077A6" />       {/* Azul de American Express */}
              <FaApplePay size={100} color="#000000" />     {/* Negro de Apple Pay */}
              <FaGooglePay size={100} color="#4285F4" />    {/* Azul de Google Pay */}
            </Box>
          </Box>
        }
        {selectedOption === 3 &&
          <H4 maxWidth={'100%'} textAlign={'start'}>
            {shippingTypes}
          </H4>
        }
      </Box>
    </>
  );
}
