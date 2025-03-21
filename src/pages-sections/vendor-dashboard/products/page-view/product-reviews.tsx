"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// LOCAL CUSTOM COMPONENT
import ReviewRow from "../review-row";
import PageWrapper from "../../page-wrapper";

import useHearingEvent from "hooks/hearingEvent";
import { useEffect, useState } from "react";
import { FiltersReview, ReviewsData } from ".";
import { getReviewsAdmin } from "services/dashboardAdmin/reviews";
import { useDashboardStore } from "store/dashboard";
import Pagination from "./Pagination";

// TABLE HEADING DATA LIST
const tableHeading = (type: 'ORDER' | 'PRODUCT' | null) => [
  type === 'ORDER' ?
    { id: "image", label: "Image", align: "left" } :
    [
      { id: "product", label: "Product", align: "left" },
      { id: "image", label: "Image", align: "left" }
    ],
  { id: "customer", label: "Customer", align: "left" },
  { id: "rating", label: "Rating", align: "left" },
  { id: "comment", label: "Comment", align: "left" },
  { id: "published", label: "Published", align: "left" },
  { id: "show", label: "Show", align: "left" },
  { id: "limit", label: "Limit", align: "right", content: [1, 3, 6, 12, 24, 50, 100] }
];

// =============================================================================
// =============================================================================

export default function ProductReviewsPageView({ type }: { type: 'ORDER' | 'PRODUCT' | null }) {
  const [reviewList, setReviewList] = useState<ReviewsData>();
  const { actualize, setActualize } = useHearingEvent();
  const [filters, setFilters] = useState<FiltersReview>({
    isActive: "",
    rating: "",
    type,
    orderBy: type === 'ORDER' ? 'image' : 'product',
    search: "",
    page: 1,
    limit: 6,
  });
  const { profile } = useDashboardStore();
  const { token } = profile;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (token) {
          const { data } = await getReviewsAdmin(filters, token as string);
          setReviewList(data);
        }
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    fetchReviews();
  }, [token, filters, actualize]);

  const handlePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <PageWrapper title="Product Reviews">
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 1000 }}>
            <Table>
              <TableHeader
                order={'asc'}
                hideSelectBtn
                orderBy={''}
                heading={tableHeading(type)}
                rowCount={Number(reviewList?.total)}
                numSelected={Number(reviewList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {reviewList?.reviews.map((review) => (
                  <ReviewRow rev={review} key={review.id} setActualize={setActualize} orderBy={filters.orderBy} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={reviewList?.page}
            prevPage={reviewList?.prevPage}
            nextPage={reviewList?.nextPage}
            totalPages={reviewList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
