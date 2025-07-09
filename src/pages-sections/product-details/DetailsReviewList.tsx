"use client";
import { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import ProductComment from "./product-comment";
import Review from "models/Review.model";
import Pagination from "pages-sections/customer-dashboard/pagination";
import './details.css';

const COMMENTS_PER_PAGE = 6;

export default function DetailReviewList({ reviews }: { reviews: any[] }) {

    const [page, setPage] = useState(1);
    const isMobile = useMediaQuery("(max-width:799px)");
    const isTablet = useMediaQuery("(max-width:1199px)");

    const start = (page - 1) * COMMENTS_PER_PAGE;
    const end = start + COMMENTS_PER_PAGE;
    const currentReviews = reviews.slice(start, end);

    const totalPages = Math.ceil(reviews.length / COMMENTS_PER_PAGE);

    return (
        <Box p={4}>
            <div
                key={page}
                className="fade-transition"
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "1fr"
                        : isTablet
                            ? "repeat(2, 1fr)"
                            : "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(2, auto)",
                    gap: "16px",
                    width: "100%",
                }}
            >
                {currentReviews.map((item, ind) => (
                    <Box
                        key={`${ind}-${item.createdAt}`}
                        width="100%"
                    >
                        <ProductComment
                            title={`${item.user.firstName} ${item.user.lastName}`}
                            comment={item.review}
                            date={item.createdAt}
                            rating={Number(item.rating)}
                            imgUrl={item.user.image}
                            imgRev={item.image}
                        />
                    </Box>
                ))}
            </div>
            <Box display="flex" justifyContent="center" mt={2} gap={1}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
}
