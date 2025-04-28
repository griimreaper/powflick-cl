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
import { getUsers } from "services/dashboardAdmin/users";
import { createCouponUser } from "services/modals/discount";
import { updateCouponUser, deleteCouponUser } from "services/dashboardAdmin/coupons";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSession } from "next-auth/react";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";

const couponUserTableHeading = [
    { id: "userName", label: "User", align: "left" },
    { id: "userEmail", label: "Email", align: "left" }, // Nueva columna Email
    { id: "active", label: "Active", align: "center" },
];

export default function CouponDetailsPageView({ coupon }: any) {

    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const token = session?.user?.name?.split("|")[0];
    const [couponUsers, setCouponUsers] = useState<any[]>(coupon.couponUsers || []);

    console.log("selectedUser", selectedUser);


    useEffect(() => {
        // Cargar usuarios solo si hay cupón
        if (coupon?.id && token) {
            getUsers({ page: 1, limit: 100 }, token).then((res) => {
                setUsers(res?.rows || res?.users || []);
            });
        }
    }, [coupon?.id, token]);

    useEffect(() => {
        setCouponUsers(coupon.couponUsers || []);
    }, [coupon.couponUsers]);

    const handleLinkUser = async () => {
        if (!coupon?.id || !selectedUser) return;
        setLoading(true);
        try {
            const response = await createCouponUser(
                token ?? "",
                { couponId: coupon.id, active: true, userId: selectedUser }, // <-- userId en el body
                coupon.title
            );
            showSuccessAlert("Éxito", "Usuario vinculado al cupón correctamente");
            setSelectedUser("");
        } catch (err: any) {
            console.log("err", err);

            const errorMessage = err?.response?.data?.message || "No se pudo vincular el usuario";
            showErrorAlert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    }


    // Cambiar estado active/desactive del couponUser
    const handleToggleActive = async (couponUserId: string, currentActive: boolean) => {
        if (!token) return;
        try {
            await updateCouponUser(couponUserId, { active: !currentActive }, token);
            setCouponUsers((prev) =>
                prev.map((cu) =>
                    cu.id === couponUserId ? { ...cu, active: !currentActive } : cu
                )
            );
            showSuccessAlert("Éxito", `El cupón fue ${!currentActive ? "activado" : "desactivado"} correctamente`);
        } catch (err: any) {
            showErrorAlert("Error", "No se pudo cambiar el estado del cupón");
        }
    };

    // Eliminar couponUser
    const handleDeleteCouponUser = async (couponUserId: string) => {
        if (!token) return;
        if (!window.confirm("¿Seguro que deseas eliminar este cupón del usuario?")) return;
        try {
            await deleteCouponUser(couponUserId, token);
            setCouponUsers((prev) => prev.filter((cu) => cu.id !== couponUserId));
            showSuccessAlert("Eliminado", "El cupón fue eliminado del usuario correctamente");
        } catch (err: any) {
            showErrorAlert("Error", "No se pudo eliminar el cupón del usuario");
        }
    };

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
                {/* Selector y botón para vincular usuario */}
                <Box mt={3} display="flex" gap={2} alignItems="center">
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="user-select-label">Seleccionar usuario</InputLabel>
                        <Select
                            labelId="user-select-label"
                            value={selectedUser}
                            label="Seleccionar usuario"
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName} ({user.email})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedUser || loading}
                        onClick={handleLinkUser}
                    >
                        Vincular usuario
                    </Button>
                </Box>
            </Card>
            <Card>
                <Scrollbar>
                    <TableContainer>
                        <Table>
                            <TableHeader
                                heading={[
                                    ...couponUserTableHeading,
                                    { id: "actions", label: "Actions", align: "center" }
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
                                            <Switch
                                                checked={cu.active}
                                                color="success"
                                                onChange={() => handleToggleActive(cu.id, cu.active)}
                                                inputProps={{ "aria-label": "toggle coupon user active" }}
                                            />
                                            <Chip
                                                label={cu.active ? "Active" : "Inactive"}
                                                color={cu.active ? "success" : "default"}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </td>
                                        <td align="center" style={{ padding: 12 }}>
                                            <Button
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteCouponUser(cu.id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {(!couponUsers || couponUsers.length === 0) && (
                                    <tr>
                                        <td colSpan={4} align="center" style={{ padding: 24, color: "#888" }}>
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
