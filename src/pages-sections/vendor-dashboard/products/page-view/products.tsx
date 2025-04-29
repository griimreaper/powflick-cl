"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { TableHeader } from "components/data-table";
//  LOCAL CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import { useDashboardStore } from "store/dashboard";
import { getProductsAdmin } from "services/dashboardAdmin/products";
import { Filters, ProductData } from ".";
import Pagination from "./Pagination";
import useHearingEvent from "hooks/hearingEvent";
import { Box, Button } from "@mui/material";
import { serverCacheReset } from "services/cache";
import useLoading from "hooks/useLoading";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductsPageView() {
  const [productList, setProductList] = useState<ProductData>();
  const { actualize, setActualize } = useHearingEvent();
  const [loadCache, startLoadCache, stopLoadCache] = useLoading();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    limit: 12,
    order: 'DESC',
    orderBy: 'collection',
    section2: 'status',
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
    category: item.categories[0]?.name
  }));

  // TABLE HEADING DATA LIST
  const tableHeading = [
    { id: "name", label: "Name", align: "left", content: null },
    { id: "category", label: "Category", align: "left", content: (Object.keys(productList?.count?.categories || {})) },
    [
      { id: "collection", label: "Collection", align: "left", content: (Object.keys(productList?.count?.collection || {})), section: 1 },
      { id: "tag", label: "Tag", align: "left", content: (Object.keys(productList?.count?.tag || {})), section: 1 },
      { id: "date", label: "Date", align: "left", content: ['ASC', 'DESC'], section: 1 },
      { id: "score", label: "Score", align: "left", content: ['ASC', 'DESC'], section: 1 },
    ],
    { id: "order", label: "Price", align: "left", content: ['ASC', 'DESC'] },
    [
      { id: "status", label: "Published", align: "left", content: ['publish', 'draft'], section: 2 },
      { id: "mostSold", label: "Most Sold", align: "left", content: ['true', 'false'], section: 2 },
      { id: "featured", label: "Featured", align: "left", content: ['true', 'false'], section: 2 }
    ],
    { id: "limit", label: "Limit", align: "center", content: [1, 3, 6, 12, 24, 50, 100] }
  ];

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const resetCache = async () => {
    try {
      startLoadCache();
      const response = await serverCacheReset();
      queryClient.removeQueries();
      showSuccessAlert('Great!', response);
      stopLoadCache();
    } catch (error: any) {
      stopLoadCache();
      showErrorAlert('Error!', error.message);
    }
  };

  console.log(filteredProducts);

  return (
    <PageWrapper title="Product List">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Product"
        url="/admin/products/create"
        searchPlaceholder="Search Product..."
      />
      <Box position='relative' width={'100%'} display={'flex'} paddingBottom={{ xs: 2, md: 0 }} justifyContent={{ md: 'flex-end', xs: "space-between" }}>
        <Button variant="contained" color="primary" sx={{ position: { md: 'absolute' }, top: { md: '-55px' }, right: { md: '130px' } }} disabled={loadCache}
          onClick={() => resetCache()}>
          {loadCache ? "loading..." : "Reset Cache"}
        </Button>
        <Button variant="contained" color="primary" sx={{ position: { md: 'absolute' }, top: { md: '-55px' } }}
          onClick={() => {
            setFilters({
              search: '',
              page: 1,
              limit: filters.limit,
              order: 'DESC',
              orderBy: filters.orderBy,
              section2: filters.section2,
            })
          }}>
          Reset Filters
        </Button>
      </Box>
      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={filters.order.toLowerCase() as 'asc' | 'desc'}
                hideSelectBtn
                changeOrder={true}
                orderBy={'ASC'}
                heading={tableHeading}
                rowCount={Number(productList?.total)}
                numSelected={Number(productList?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />
              <TableBody>

                {filteredProducts?.map((product) => (
                  <ProductRow key={product.id} product={product} setActualize={setActualize} orderBy={filters.orderBy} section2={filters.section2} />
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
    </PageWrapper >
  );
}
