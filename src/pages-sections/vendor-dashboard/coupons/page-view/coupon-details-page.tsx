"use client";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { TableHeader } from "components/data-table";
import Scrollbar from "components/scrollbar";
import PageWrapper from "../../page-wrapper";
import { Box, Typography, Chip, Tooltip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { isAfter } from "date-fns";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Edit } from "@mui/icons-material";
import CouponEditForm from "./coupon-edit-form";
import { updateCoupon } from "services/dashboardAdmin/coupons";
import { Router } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

const couponUserTableHeading = [
    { id: "userName", label: "User", align: "left" },
    { id: "userEmail", label: "Email", align: "left" }, // Nueva columna Email
    { id: "active", label: "Active", align: "center" },
];

export default function CouponDetailsPageView({ coupon }: any) {
    const [couponUsers, setCouponUsers] = useState<any[]>(coupon.couponUsers || []);
    const [editing, setEditing] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const isActive = coupon.expiresAt ? isAfter(new Date(coupon.expiresAt), new Date()) : false;
    const label = coupon.expiresAt
        ? new Date(coupon.expiresAt).toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Formato 24hs
        })
        : 'Sin fecha';

    useEffect(() => {
        if (searchParams.get("edit") === "true") {
            setEditing(true);
        }
    }, [searchParams]);

    return (
        <PageWrapper title={editing ? "Edit Coupon" : `Coupon: ${coupon.title}`}>
            <Card sx={{ mb: 3, p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h5">
                        {editing ? "Edit Coupon" : "Coupon Details"}
                    </Typography>
                    {!editing && (
                        <Tooltip title="Edit coupon">
                            <IconButton color="primary" onClick={() => setEditing(true)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                {editing ? (
                    <CouponEditForm
                        coupon={coupon}
                        onCancel={() => setEditing(false)}
                        onSave={async (updatedCoupon) => {
                            await updateCoupon(coupon.id, updatedCoupon);
                            setEditing(false);
                            router.push(`/admin/coupons/${coupon.id}`);
                        }}
                    />
                ) : (
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
                        <Box>
                            <Typography variant="subtitle2" color="grey.700">Expire Date</Typography>
                            <Chip
                                label={
                                    coupon.expiresAt
                                        ? (() => {
                                            const zone = coupon.timezone || 'UTC';
                                            const localTime = dayjs.utc(coupon.expiresAt).tz(zone).format("DD/MM/YYYY HH:mm");
                                            const cityName = zone.split('/').pop()?.replace(/_/g, ' ') || zone;
                                            return `${cityName} - ${localTime}`;
                                        })()
                                        : 'Sin fecha'
                                }
                                color={isActive ? 'success' : 'error'}
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="grey.700">Expire Date (UTC)</Typography>
                            <Chip
                                label={label}
                                color={isActive ? 'success' : 'error'}
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="grey.700">State</Typography>
                            <Chip
                                label={isActive ? "Active" : "Expired"}
                                color={isActive ? 'success' : 'error'}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                )}
            </Card>

            {!editing && (
                <Card>
                    <Scrollbar>
                        <TableContainer>
                            <Table>
                                <TableHeader
                                    heading={couponUserTableHeading}
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
            )}
        </PageWrapper>

    );
}
