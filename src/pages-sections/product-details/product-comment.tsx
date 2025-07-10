"use client";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { getDateDifference } from "lib";

// ===========================================================
interface Props {
  title: string;
  date: string;
  imgUrl: string;
  rating: number;
  comment: string;
  imgRev?: string; // Optional prop for product image
}
// ===========================================================

export default function ProductComment(props: Props) {


  const { title, imgUrl, rating, date, comment, imgRev } = props || {};

  return (
    <Box
      mb={4}
      maxWidth={600}
      display={'flex'}
      border={'1px solid grey-800'}
      flexDirection={{ xs: "column", sm: "row" }} // columna en móvil
      gap={2}
      p={2}
      borderRadius={2}
      boxShadow={1}
      width={'100%'}
      sx={{
        boxShadow: '1px 12px 5px rgba(0,0,0,0.1)',
        maxWidth: { xs: '100%', sm: 600 }, // 100% en móvil
      }}
    >
      <FlexBox
        alignItems="start"
        flexDirection={'row'}
        mb={2}
        gap={2}
        width={{ xs: '100%', sm: '90%' }} // 100% en móvil
      >
        <Avatar alt={title} src={imgUrl} sx={{ width: 48, height: 48 }} />

        <Box width={'100%'}>
          <H5 mb={1}>{title}</H5>


          <FlexBox alignItems="center" flexWrap={'wrap'} gap={1.25}>
            <Rating size="small" value={rating} color="warn" readOnly />
            <H6>{rating}</H6>
            <Span>{getDateDifference(date)}</Span>
          </FlexBox>

          <Paragraph
            color="grey.700"
            sx={{
              width: '100%',
              maxHeight: 100,
              mr: 2,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',

              /* Webkit */
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
              },
            }}
          >
            {comment}
          </Paragraph>
        </Box>
      </FlexBox>
      {imgRev && (
        <Box
          my={2}
          width={{ xs: '100%', sm: '20%' }} // 100% en móvil
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <img
            src={imgRev}
            alt="Imagen de la reseña"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: 8,
              objectFit: "cover",
              maxWidth: "100%",
              display: "block",
            }}
          />
        </Box>
      )}


      <FlexBox alignItems="center" gap={2}>
      </FlexBox>

    </Box>
  );
}
