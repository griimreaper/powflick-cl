import { useEffect, useState } from "react";
import { getUsers } from "services/dashboardAdmin/users";
import { createCouponUser, deleteCouponUser } from "services/dashboardAdmin/coupons";
import { Card, Button, Select, MenuItem, Typography, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDashboardStore } from "store/dashboard";

interface CouponDetailProps {
    coupon: {
        id: string;
        title: string; // Añadido para evitar error TS2339
        couponUsers?: { id: string; userId: string; user?: { email: string } }[];
    };
    onUpdated?: () => void;
}

export default function CouponDetail({ coupon, onUpdated }: CouponDetailProps) {
    const [users, setUsers] = useState<{ id: string; email: string }[]>([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [couponUsers, setCouponUsers] = useState(coupon.couponUsers || []);
    const { profile } = useDashboardStore();
    const token = profile?.token ?? ""; // Nunca será null

    useEffect(() => {
        if (token) {
            getUsers({ limit: 1000, page: 1 }, token).then(res => {
                setUsers(res?.users || res || []);
            });
        }
        setCouponUsers(coupon.couponUsers || []);
    }, [coupon, token]);

    const handleAddUser = async () => {
        if (!selectedUserId || !token) return;
        await createCouponUser(
            { userId: selectedUserId, couponId: coupon.id, active: true },
            token,
            coupon.title
        );
        onUpdated?.();
    };

    const handleRemoveCouponUser = async (couponUserId: string) => {
        await deleteCouponUser(couponUserId, token);
        onUpdated?.();
    };

    return (
        <Card sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6">Vincular usuario a cupón</Typography>
            <Select
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                displayEmpty
                sx={{ minWidth: 200, mr: 2 }}
            >
                <MenuItem value="">Selecciona un usuario</MenuItem>
                {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" onClick={handleAddUser} disabled={!selectedUserId}>
                Vincular usuario
            </Button>

            <Typography variant="subtitle1" sx={{ mt: 3 }}>Usuarios vinculados:</Typography>
            <List>
                {couponUsers.map((cu) => (
                    <ListItem key={cu.id} secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveCouponUser(cu.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        {cu.user?.email || cu.userId}
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
