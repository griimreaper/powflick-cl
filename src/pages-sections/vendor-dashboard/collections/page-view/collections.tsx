"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// LOCAL CUSTOM COMPONENT
import BrandRow from "../collection-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { useDashboardStore } from "store/dashboard";
import useHearingEvent from "hooks/hearingEvent";
import { useEffect, useState } from "react";
import { CollectionsData, Filters } from ".";
import CollectionRow from "../collection-row";
import { getAllCollections } from "services/Collections";

// =============================================================================
type Props = { collections: any[] };
// =============================================================================

export default function CollectionsPageView() {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const { actualize, setActualize } = useHearingEvent();
  const [collectionsList, setCollectionsList] = useState<CollectionsData>();

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
          const data = await getAllCollections(filters, token);
          setCollectionsList(data);
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
    <PageWrapper title="Product collection">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Collection"
        url="/admin/collections/create"
        searchPlaceholder="Search Collection..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table>
              <TableHeader
                order={'ASC'}
                hideSelectBtn
                orderBy={''}
                heading={tableHeading}
                rowCount={Number(collectionsList?.total)}
                numSelected={Number(collectionsList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {collectionsList?.collections?.map((collection) => (
                  <CollectionRow key={collection.id} collection={collection} setActualize={setActualize}  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={collectionsList?.page}
            prevPage={collectionsList?.prevPage}
            nextPage={collectionsList?.nextPage}
            totalPages={collectionsList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
