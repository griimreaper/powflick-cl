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
// import OrderRow from "../order-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
import { useEffect, useState } from "react";
import useHearingEvent from "hooks/hearingEvent";
import { useDashboardStore } from "store/dashboard";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import { tableHeading } from "../table-heading";
import { getMessages } from "services/dashboardAdmin/messages";
import FreeDesignRow from "../free-design-row";
import { DataFreeDesign, Filters } from ".";
import { getFreeDesign } from "services/FreeDesign";

// =============================================================================
// =============================================================================

export default function FreeDesignPageView() {
    const [freeDesign, setFreeDesign] = useState<DataFreeDesign>();
    const { actualize, setActualize } = useHearingEvent();
    const { profile } = useDashboardStore();
    const { token } = profile;

    const [filters, setFilters] = useState<Filters>({
        order: "ASC",
        filterBy: "email",
        search: "",
        page: 1,
        limit: 6,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const response = await getFreeDesign(token, filters);
                setFreeDesign(response);
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
        <PageWrapper title="Free design">
            <SearchArea
                handleSearch={handleSearch}
                url="/admin/free-design"
                searchPlaceholder="Search Email..."
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
                                rowCount={Number(freeDesign?.total)}
                                numSelected={Number(freeDesign?.totalPages)}
                                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                            />

                            <TableBody>
                                {freeDesign?.results?.map((fdesign) => (
                                    <FreeDesignRow fdesign={fdesign} key={fdesign.id} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <Pagination
                        page={freeDesign?.page}
                        prevPage={freeDesign?.prevPage}
                        nextPage={freeDesign?.nextPage}
                        totalPages={freeDesign?.totalPages}
                        handlePage={handlePage}
                    />
                </Stack>
            </Card>
        </PageWrapper>
    );
}
