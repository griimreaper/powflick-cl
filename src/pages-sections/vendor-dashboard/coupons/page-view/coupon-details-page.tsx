"use client";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { TableHeader } from "components/data-table";
import Scrollbar from "components/scrollbar";
import PageWrapper from "../../page-wrapper";
import { Box, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";


const couponUserTableHeading = [
    { id: "userName", label: "User", align: "left" },
    { id: "userEmail", label: "Email", align: "left" }, // Nueva columna Email
    { id: "active", label: "Active", align: "center" },
];

export default function CouponDetailsPageView({ coupon }: any) {
    const [couponUsers, setCouponUsers] = useState<any[]>(coupon.couponUsers || []);

    return (
        <PageWrapper title={`Coupon: ${coupon.title}`}>
            <Card sx={{ mb: 3, p: 3 }}>
                <Typography variant="h5" mb={2}>Coupon Details</Typography>
                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
                    <Box>
                        <Typography variant="subtitle2" color="grey.700">Title</Typography>
                        <Typography fontWeight={600}>{coupon.title}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="grey.700">Content</Typography>
                        <Typography>{coupon.content}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="grey.700">Discount</Typography>
                        <Chip label={`${coupon.discount}%`} color="success" />
                    </Box>
                </Box>


            </Card>
            <Card>
                <Scrollbar>
                    <TableContainer>
                        <Table>
                            <TableHeader
                                heading={[
                                    ...couponUserTableHeading,
                                ]}
                                orderBy="userId"
                                rowCount={couponUsers?.length || 0}
                                numSelected={0}
                                order="asc"
                                onRequestSort={() => { }}
                                hideSelectBtn
                            />
                            <TableBody>
                                {couponUsers?.map((cu: any) => (
                                    <tr key={cu.id}>
                                        <td style={{ padding: 12, fontWeight: 500 }}>
                                            {cu.user?.firstName && cu.user?.lastName
                                                ? `${cu.user.firstName} ${cu.user.lastName}`
                                                : cu.userId}
                                        </td>
                                        <td style={{ padding: 12 }}>
                                            {cu.user?.email || "-"}
                                        </td>
                                        <td align="center" style={{ padding: 12 }}>
                                            <Chip
                                                label={cu.active ? "Active" : "Inactive"}
                                                color={cu.active ? "success" : "default"}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {(!couponUsers || couponUsers.length === 0) && (
                                    <tr>
                                        <td colSpan={3} align="center" style={{ padding: 24, color: "#888" }}>
                                            No users for this coupon.
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </PageWrapper>
    );
}
