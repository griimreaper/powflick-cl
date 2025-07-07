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
  console.log("ProductComment props:", props);

  const { title, imgUrl, rating, date, comment, imgRev } = props || {};

  return (
    <Box mb={4} maxWidth={600} display={'flex'} border={'1px solid grey-800'} flexDirection="row" gap={2} p={2} borderRadius={2} boxShadow={1} width={'100%'} sx={{ boxShadow: '1px 12px 5px rgba(0,0,0,0.1)' }}>
      <FlexBox alignItems="start" flexDirection={'row'} mb={2} gap={2} width={'90%'}>
        <Avatar alt={title} src={imgUrl} sx={{ width: 48, height: 48 }} />

        <Box width={'100%'}>
          <H5 mb={1}>{title}</H5>

          <FlexBox alignItems="center" flexWrap={'wrap'} gap={1.25}>
            <Rating size="small" value={rating} color="warn" readOnly />
            <H6>{rating}</H6>
            <Span>{getDateDifference(date)}</Span>
          </FlexBox>

          {imgRev && (
            <Box my={2} width={'20%'}>
              <img
                src={imgRev}
                alt="Imagen de la reseña"
                style={{ minWidth: "100px", minHeight: "100px", maxWidth: "100%", borderRadius: 8, objectFit: "cover" }}
              />
            </Box>
          )}

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

      <FlexBox alignItems="center" gap={2}>
      </FlexBox>

    </Box>
  );
}
