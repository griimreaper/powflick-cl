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
// import OrderRow from "../order-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import Order from "models/Order.model";
// TABLE HEAD COLUMN DATA
import { DataMessage, Filters } from ".";
import { useEffect, useState } from "react";
import useHearingEvent from "hooks/hearingEvent";
import { useDashboardStore } from "store/dashboard";
import { getAllOrders } from "services/dashboardAdmin/orders";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { tableHeading } from "../table-heading";
import { getMessages } from "services/dashboardAdmin/messages";
import MessageRow from "../message-row";
import { ContactType } from "models/types";

// =============================================================================
// =============================================================================

export default function OrdersPageView({ type }: { type: "Complaint or Claim" | "Help with an Order" | "Help with Page Functionality" | "General Help" }) {
    const [messages, setMessages] = useState<DataMessage>();
    const { actualize, setActualize } = useHearingEvent();
    const { profile } = useDashboardStore();
    const { token } = profile;

    console.log(type);

    const [filters, setFilters] = useState<Filters>({
        showAnswered: null,
        orderByDate: "ASC",
        category: type,
        filterBy: "name",
        search: "",
        page: 1,
        limit: 6,
    });

    console.log(filters);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const response = await getMessages(token, filters);
                setMessages(response);
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
        <PageWrapper title="Messages">
            <SearchArea
                handleSearch={handleSearch}
                url="/admin/message"
                searchPlaceholder="Search Message..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHeader
                                order={filters.orderByDate.toLowerCase() as 'asc' || 'desc'}
                                hideSelectBtn
                                orderBy={''}
                                heading={tableHeading}
                                rowCount={Number(messages?.total)}
                                numSelected={Number(messages?.totalPages)}
                                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                            />

                            <TableBody>
                                {messages?.messages?.map((message) => (
                                    <MessageRow mess={message} key={message.id} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <Pagination
                        page={messages?.page}
                        prevPage={messages?.prevPage}
                        nextPage={messages?.nextPage}
                        totalPages={messages?.totalPages}
                        handlePage={handlePage}
                    />
                </Stack>
            </Card>
        </PageWrapper>
    );
}
