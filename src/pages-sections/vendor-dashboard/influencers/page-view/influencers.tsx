"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { TableHeader } from "components/data-table";
// GLOBAL CUSTOM HOOK
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { useDashboardStore } from "store/dashboard";
import useHearingEvent from "hooks/hearingEvent";
import { useEffect, useState } from "react";
import { Filters, InfluencersData } from ".";
import { getAllInfluencersAdmin } from "services/Influencers";
import InfluencerRow from "../influencer-row";

// =============================================================================
type Props = { collections: any[] };
// =============================================================================

export default function InfluencersPageView() {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const { actualize, setActualize } = useHearingEvent();
  const [influencersList, setInfluencersList] = useState<InfluencersData>();

  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    limit: 6,
  });

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token) {
          const data = await getAllInfluencersAdmin(filters, token);
          setInfluencersList(data);
        }
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };
    fetchProducts();
  }, [filters, token, actualize]);

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handlePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <PageWrapper title="Influencers">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Influencers"
        url="/admin/influencers/create"
        searchPlaceholder="Search Influencers..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table>
              <TableHeader
                order={'asc'}
                hideSelectBtn
                orderBy={''}
                heading={tableHeading}
                rowCount={Number(influencersList?.total)}
                numSelected={Number(influencersList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {influencersList?.influencers?.map((influencer) => (
                  <InfluencerRow key={influencer.id} influencer={influencer} setActualize={setActualize}  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={influencersList?.page}
            prevPage={influencersList?.prevPage}
            nextPage={influencersList?.nextPage}
            totalPages={influencersList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
