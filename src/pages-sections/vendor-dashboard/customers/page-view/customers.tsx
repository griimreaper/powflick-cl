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
import { tableHeading } from "../table-heading";
import { useEffect, useState } from "react";
import useLoading from "hooks/useLoading";
import { getUsers } from "services/dashboardAdmin/users";
import { DataUsers, Filters } from "models/types";
import { useSession } from "next-auth/react";

// =============================================================================
type Props = { customers: any[] };
// =============================================================================

export default function CustomersPageView({ customers }: Props) {
  const [loading, startLoading, stopLoading] = useLoading();
  const [users, setUsers] = useState<DataUsers>();

  const { data: session } = useSession();
  const token = session?.user?.name?.split("|")[0];

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: users?.users || [] });

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

  return (
    <PageWrapper title="Customers">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Customer"
        url="/admin/customers"
        searchPlaceholder="Search Customer..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
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
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil((users?.total || 0) / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
