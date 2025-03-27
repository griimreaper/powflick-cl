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
import { Filters, TagsData } from ".";
import { getAllTags } from "services/Tags";
import TagRow from "../tag-row";

// =============================================================================
type Props = { collections: any[] };
// =============================================================================

export default function TagsPageView() {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const { actualize, setActualize } = useHearingEvent();
  const [tagsList, setTagsList] = useState<TagsData>();

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
          const data = await getAllTags(filters, token);
          setTagsList(data);
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
    <PageWrapper title="Product Tags">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Tags"
        url="/admin/tags/create"
        searchPlaceholder="Search Tags..."
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
                rowCount={Number(tagsList?.total)}
                numSelected={Number(tagsList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {tagsList?.tags?.map((tag) => (
                  <TagRow key={tag.id} tag={tag} setActualize={setActualize}  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={tagsList?.page}
            prevPage={tagsList?.prevPage}
            nextPage={tagsList?.nextPage}
            totalPages={tagsList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
