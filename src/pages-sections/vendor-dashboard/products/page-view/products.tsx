"use client";

import { useEffect, useState } from "react";
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
//  LOCAL CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import { useDashboardStore } from "store/dashboard";
import { getProductsAdmin } from "services/dashboardAdmin/products";
import useLoading from "hooks/useLoading";
import { Filters, ProductData } from ".";
import Pagination from "./Pagination";
import LoadingComponent from "components/Loaders/LoadingComponent";
import { Box } from "@mui/material";
import useHearingEvent from "hooks/hearingEvent";

export default function ProductsPageView() {
  const [productList, setProductList] = useState<ProductData>();
  const { actualize, setActualize } = useHearingEvent();
  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    limit: 6,
    order: 'DESC',
  });

  const { profile } = useDashboardStore();
  const { token } = profile;

  const handlePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token) {
          const data = await getProductsAdmin(filters, token);
          setProductList(data);
        }
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };
    fetchProducts();
  }, [filters, token, actualize]);

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts = productList?.products.map((item) => ({
    ...item,
    id: item.id,
    slug: item.slug,
    name: item.title,
    sport: item.sport,
    price: item.price,
    image: item.URL,
    status: item.status,
    category: item.product_categories.split('|')[0]
  }));

  // TABLE HEADING DATA LIST
  const tableHeading = [
    { id: "name", label: "Name", align: "left", content: null },
    { id: "category", label: "Category", align: "left", content: (Object.keys(productList?.count?.categories || {})) },
    { id: "collection", label: "Collection", align: "left", content: (Object.keys(productList?.count?.collection || {})) },
    { id: "order", label: "Price", align: "left", content: ['ASC', 'DESC'] },
    { id: "status", label: "Published", align: "left", content: ['publish', 'draft'] },
    { id: "limit", label: "Limit", align: "center", content: [1, 3, 6, 8, 10, 12] }
  ];

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  return (
    <PageWrapper title="Product List">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Product"
        url="/admin/products/create"
        searchPlaceholder="Search Product..."
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={filters.order.toLowerCase() as 'asc' | 'desc'}
                hideSelectBtn
                orderBy={'asc'}
                heading={tableHeading}
                rowCount={Number(productList?.total)}
                numSelected={Number(productList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />
              <TableBody>

                {filteredProducts?.map((product) => (
                  <ProductRow key={product.id} product={product} setActualize={setActualize} />
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={productList?.page}
            prevPage={productList?.prevPage}
            nextPage={productList?.nextPage}
            totalPages={productList?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
