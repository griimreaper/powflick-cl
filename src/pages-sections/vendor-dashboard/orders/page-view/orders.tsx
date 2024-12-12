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
import OrderRow from "../order-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import Order from "models/Order.model";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { DataOrders, Filters } from ".";
import { useEffect, useState } from "react";
import useHearingEvent from "hooks/hearingEvent";
import { useDashboardStore } from "store/dashboard";
import { getAllOrders } from "services/dashboardAdmin/orders";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";

// =============================================================================
// =============================================================================

export default function OrdersPageView() {
  const [orders, setOrders] = useState<DataOrders>();
  const { actualize, setActualize } = useHearingEvent();
  const { profile } = useDashboardStore();
  const { token } = profile;
  const [filters, setFilters] = useState<Filters>({
    filterBy: "USER",
    order: "DESC",
    status: "",
    search: "",
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const response = await getAllOrders(token, filters);
        setOrders(response.data);
      }
    };
    fetchData();
  }, [filters, token, actualize]);

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handlePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <PageWrapper title="Orders">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Create Order"
        url="/admin/orders"
        searchPlaceholder="Search Order..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={filters.order.toLowerCase() as 'asc' || 'desc'}
                hideSelectBtn
                orderBy={''}
                heading={tableHeading}
                rowCount={Number(orders?.totalOrders)}
                numSelected={Number(orders?.totalPages)}
                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
              />

              <TableBody>
                {orders?.orders?.map((order) => (
                  <OrderRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
        <Pagination
            page={orders?.page}
            prevPage={orders?.prevPage}
            nextPage={orders?.nextPage}
            totalPages={orders?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
