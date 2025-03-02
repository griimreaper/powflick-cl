import React, { FC, useState, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { paginationProps } from ".";

const Pagination: FC<paginationProps> = ({
  page,
  totalPages,
  prevPage,
  nextPage,
  handlePage,
}) => {
  const [pages, setPages] = useState<(string | number)[]>([]);

  useEffect(() => {
    const pagesArray = [];
    if (totalPages !== null && totalPages !== undefined && page !== null && page !== undefined) {
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(i);
        }
      } else {
        if (page <= 3) {
          for (let i = 1; i <= 3; i++) {
            pagesArray.push(i);
          }
          pagesArray.push("...");
          pagesArray.push(totalPages - 2);
          pagesArray.push(totalPages - 1);
          pagesArray.push(totalPages);
        } else if (page > totalPages - 3) {
          pagesArray.push(1);
          pagesArray.push(2);
          pagesArray.push(3);
          pagesArray.push("...");
          for (let i = totalPages - 2; i <= totalPages; i++) {
            pagesArray.push(i);
          }
        } else {
          pagesArray.push(1);
          pagesArray.push("...");
          pagesArray.push(page - 1);
          pagesArray.push(page);
          pagesArray.push(page + 1);
          pagesArray.push("...");
          pagesArray.push(totalPages);
        }
      }
      setPages(pagesArray);
    }
  }, [page, totalPages]);

  const handlePagePrev = () => {
    if (prevPage !== null && prevPage !== undefined) {
      handlePage(prevPage);
    }
  };

  const handlePageNext = () => {
    if (nextPage !== null && nextPage !== undefined) {
      handlePage(nextPage);
    }
  };

  const handlePageClick = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") handlePage(pageNumber);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderTop: "1px solid #E0E0E0", padding: "16px", width: '100%' }}>
      {/* Botón de página anterior */}
      <IconButton
        onClick={handlePagePrev}
        disabled={page === 1}
        sx={{ color: page === 1 ? "gray" : "primary.main" }}
        aria-label="Previous"
      >
        <ArrowLeft />
      </IconButton>

      {/* Páginas numeradas */}
      <Box display="flex" gap={1}>
        {pages.map((pageNumber, index) => (
          <Typography
            key={index}
            onClick={() => handlePageClick(pageNumber)}
            variant="inherit"
            sx={{
              cursor: pageNumber !== "..." ? "pointer" : "default",
              padding: "8px 12px",
              borderRadius: "4px",
              backgroundColor: pageNumber === page ? "primary.main" : "transparent",
              color: pageNumber === page ? "#FFF" : "text.primary",
              "&:hover": {
                color: pageNumber !== "..." ? '#ffffff' : '',
                backgroundColor: pageNumber !== page && pageNumber !== "..." ? "primary.600" : "",
              },
            }}
          >
            {pageNumber}
          </Typography>
        ))}
      </Box>

      {/* Botón de página siguiente */}
      <IconButton
        onClick={handlePageNext}
        disabled={page === totalPages}
        sx={{ color: page === totalPages ? "gray" : "primary.main" }}
        aria-label="Next"
      >
        <ArrowRight />
      </IconButton>
    </Box>
  );
};

export default Pagination;
