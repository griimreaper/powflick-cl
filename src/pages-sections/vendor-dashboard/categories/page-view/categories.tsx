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
import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useEffect, useState } from "react";
import { CategoriesData, Filters } from ".";
import { getAllCategories, getCategories } from "services/Categories";
import { useDashboardStore } from "store/dashboard";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { Category } from "models/types";
import useHearingEvent from "hooks/hearingEvent";

// =============================================================================
type Props = { category: Category[] };
// =============================================================================

const CategoriesPageView = () => {
  const { profile } = useDashboardStore();
  const token = profile.token;
  const { actualize, setActualize } = useHearingEvent();
  const [categoriesList, setCategoriesList] = useState<CategoriesData>();

  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token) {
          const data = await getAllCategories(filters, token);
          setCategoriesList(data);
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
    <PageWrapper title="Product Categories">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Category"
        url="/admin/categories/create"
        searchPlaceholder="Search Category..."
      />

      <Card>
        <Scrollbar>
          <TableContainer >
            <Table>
              <TableHeader
                order={'ASC'}
                hideSelectBtn
                orderBy={''}
                heading={tableHeading}
                rowCount={Number(categoriesList?.total)}
                numSelected={Number(categoriesList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {categoriesList?.categories.map((category) => (
                  <CategoryRow key={category.id} category={category} setActualize={setActualize} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={categoriesList?.page}
            prevPage={categoriesList?.prevPage}
            nextPage={categoriesList?.nextPage}
            totalPages={categoriesList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
};

export default CategoriesPageView;
