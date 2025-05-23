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
// Local CUSTOM COMPONENT
import SearchArea from "../../search-box";
import CustomerRow from "../customer-row";
import PageWrapper from "../../page-wrapper";
// TABLE HEAD COLUMN DATA
import { useEffect, useState } from "react";
import useLoading from "hooks/useLoading";
import { getExcelUsers, getUsers } from "services/dashboardAdmin/users";
import { DataUsers, Filters } from "models/types";
import { useSession } from "next-auth/react";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { Box, Button, CircularProgress } from "@mui/material";
import * as xlsx from "xlsx";
// =============================================================================

// =============================================================================

const tableHeading = [
  { id: "name", label: "Name", align: "left", content: null },
  { id: "email", label: "Email", align: "left", content: null },
  { id: "phone", label: "Phone", align: "left", content: null },
  { id: "rol", label: "Rol", align: "left", content: ["all", "admin", "user"] },
  {
    id: "isActive",
    label: "Active",
    align: "left",
    content: ["all", "yes", "no"],
  },
  { id: "limit", label: "Limit", align: "right", content: [1, 3, 6, 12, 24, 50, 100] },
];

export default function CustomersPageView() {
  const [loading, startLoading, stopLoading] = useLoading();
  const [users, setUsers] = useState<DataUsers>();
  const [loadExport, startLoadExport, stopLoadExport] = useLoading();
  const { data: session } = useSession();
  const token = session?.user?.name?.split("|")[0];

  const {
    order: rawOrder,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: users?.users || [] });

  const order = rawOrder === "DESC" ? "DESC" : "ASC";

  const [filters, setFilters] = useState<Filters>({
    filter: "email",
    order: "DESC",
    rol: "all",
    isActive: "all",
    search: "",
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token) {
          startLoading();
          const data = await getUsers(filters, token);
          stopLoading();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    fetchUsers();
  }, [filters, token]);

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handlePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleFilterChange = (filter: string, option: string) => {
    setFilters((f: any) => {
      const updatedFilters = {
        ...f,
        [filter]: option === "all" ? undefined : option,
      };
      return updatedFilters;
    });
  };

  const handleExport = async () => {
    if (token) {
      try {
        startLoadExport();
        const response = await getExcelUsers(token);

        const arrayBufferView = new Uint8Array(response.data);
        const workbook = xlsx.read(arrayBufferView, { type: "array" });
        xlsx.writeFile(workbook, "powflick_users.xlsx");

        stopLoadExport();
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
      }
    }
  };

  return (
    <PageWrapper title="Customers">
      <SearchArea
        handleSearch={handleSearch}
        buttonText="Add Customer"
        url="/admin/customers"
        searchPlaceholder="Search Customer..."
      />
      <Box position='relative' width={'100%'} display={'flex'} paddingBottom={{ xs: 2, md: 0 }} justifyContent={{ md: 'flex-end', xs: "space-between" }}>
        <Button variant="contained" color="primary" sx={{ position: { md: 'absolute' }, top: { md: '-55px' } }} disabled={loadExport} onClick={handleExport}>
          {loadExport ? <CircularProgress size={24} /> : "Export"}
        </Button>
      </Box>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order.toLowerCase() as 'asc' || 'desc'}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onFilterChange={handleFilterChange}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredList.map((customer) => (
                  <CustomerRow customer={customer} key={customer.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <Pagination
            page={users?.page}
            prevPage={users?.prevPage}
            nextPage={users?.nextPage}
            totalPages={users?.totalPages}
            handlePage={handlePage}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
