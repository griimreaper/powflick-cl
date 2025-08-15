"use client";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Scrollbar from "components/scrollbar";
import { TableHeader } from "components/data-table";
import Pagination from "pages-sections/vendor-dashboard/products/page-view/Pagination";
import PageWrapper from "../../page-wrapper";
import CouponRow from "../coupon-row";
import { useEffect, useState } from "react";
import { getAllCouponsAdmin, getCoupons } from "services/dashboardAdmin/coupons";
import { createCoupon } from "services/modals/discount";
import { Box, Button, TextField, Stack, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format } from "date-fns";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { Filters } from "pages-sections/vendor-dashboard/influencers/page-view";
import { useDashboardStore } from "store/dashboard";
import SearchArea from "pages-sections/vendor-dashboard/search-box";

const timezones = [
    { label: "New York (America/New_York)", value: "America/New_York" },
    { label: "Spain (Europe/Madrid)", value: "Europe/Madrid" },
    { label: "Argentina (America/Argentina/Buenos_Aires)", value: "America/Argentina/Buenos_Aires" },
    { label: "Los Angeles (America/Los_Angeles)", value: "America/Los_Angeles" },
    { label: "London (Europe/London)", value: "Europe/London" },
    { label: "Tokyo (Asia/Tokyo)", value: "Asia/Tokyo" },
    { label: "Sydney (Australia/Sydney)", value: "Australia/Sydney" },
    { label: "Mexico City (America/Mexico_City)", value: "America/Mexico_City" },
    { label: "Santiago (America/Santiago)", value: "America/Santiago" },
    { label: "Bogotá (America/Bogota)", value: "America/Bogota" },
    { label: "Dubai (Asia/Dubai)", value: "Asia/Dubai" },
    { label: "Johannesburg (Africa/Johannesburg)", value: "Africa/Johannesburg" },
];

export default function CouponsPageView() {
    const [couponsList, setCouponsList] = useState<any>();
    const [actualize, setActualize] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
    const { profile } = useDashboardStore();
    const token = profile.token;
    const [filters, setFilters] = useState<Filters>({
        search: '',
        page: 1,
        limit: 12,
    });

    const handlePage = (page: number) => {
        setFilters({ ...filters, page });
    };

    const handleSearch = (value: string) => {
        setFilters({ ...filters, search: value });
    };

    dayjs.extend(utc);
    dayjs.extend(timezone);

    // Estado para el formulario de creación
    const [form, setForm] = useState({
        title: "",
        content: "",
        discount: "",
        type: "percent",
        expirationDate: "", // yyyy-mm-dd
        expirationTime: "", // hh:mm
        timezone: "", // default
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                if (token) {
                    const data = await getAllCouponsAdmin(filters, token);
                    setCouponsList(data);
                    console.log("Coupons fetched:", data);
                }
            } catch (error) {
                console.error('Error al obtener cupones:', error);
            }
        };

        fetchCoupons();
    }, [filters, token, actualize]);

    // Manejar cambios en el formulario para inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Manejar cambios en el select de tipo
    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setForm({ ...form, type: event.target.value });
    };

    // Crear cupón
    const handleCreateCoupon = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validar que si pone fecha o hora, tenga que poner ambos
            if (
                (form.expirationDate && !form.expirationTime) ||
                (!form.expirationDate && form.expirationTime)
            ) {
                showErrorAlert("Error", "To set the expiration date you must complete the date and time");
                setLoading(false);
                return;
            }

            let expiresAt = null;
            if (form.expirationDate && form.expirationTime) {
                const localDateTime = dayjs.tz(
                    `${form.expirationDate} ${form.expirationTime}`,
                    "YYYY-MM-DD HH:mm",
                    form.timezone
                );
                const nowUtc = dayjs.utc();

                if (localDateTime.isBefore(nowUtc)) {
                    showErrorAlert("Date Restriccion", "The date and time must be in the future.");
                    setLoading(false);
                    return;
                }

                // Convertir a UTC para guardar
                expiresAt = localDateTime.utc().toDate();
            }

            await createCoupon({
                title: form.title,
                content: form.content,
                discount: Number(form.discount),
                type: form.type,
                expiresAt, // Date o null
                timezone: form.timezone || null,
            });

            showSuccessAlert("Success", "Coupon created successfully");

            setForm({
                title: "",
                content: "",
                discount: "",
                type: "percent",
                expirationDate: "",
                expirationTime: "",
                timezone: "America/New_York",
            });
            setActualize((a) => !a);
        } catch (err: any) {
            alert("Error al crear cupón" + err.message);
        }
        setLoading(false);
    };

    const todayUtc = new Date();
    const minDate = format(todayUtc, 'yyyy-MM-dd');

    return (
        <PageWrapper title="Coupons">
            <SearchArea
                handleSearch={handleSearch}
                buttonText=""
                url=""
                searchPlaceholder="Search Coupon..."
            />
            {/* Formulario para crear cupón */}
            <Box
                component="form"
                onSubmit={handleCreateCoupon}
                mb={3}
                sx={{
                    background: "#fff",
                    borderRadius: 2,
                    p: 2,
                    boxShadow: 1,
                }}
            >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <TextField
                        name="title"
                        label="Coupon Code"
                        value={form.title}
                        onChange={handleChange}
                        required
                        size="small"
                        sx={{ background: "#fff" }}
                    />
                    <TextField
                        name="content"
                        label="Description"
                        value={form.content}
                        onChange={handleChange}
                        required
                        size="small"
                        sx={{ background: "#fff" }}
                    />
                    <TextField
                        name="discount"
                        label={form.type === "percent" ? "Discount (%)" : "Discount (amount)"}
                        type="number"
                        value={form.discount}
                        onChange={handleChange}
                        required
                        size="small"
                        inputProps={form.type === "percent" ? { min: 1, max: 100 } : { min: 1 }}
                        sx={{ background: "#fff" }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120, background: "#fff" }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            name="type"
                            value={form.type}
                            label="Type"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="percent">Percent (%)</MenuItem>
                            <MenuItem value="amount">Amount</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="expirationDate"
                        label="Expiration Date"
                        type="date"
                        value={form.expirationDate}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: minDate }}
                        sx={{ background: "#fff" }}
                    />

                    <TextField
                        name="expirationTime"
                        label="Expiration Time"
                        type="time"
                        value={form.expirationTime}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ background: "#fff" }}
                    />

                    <FormControl size="small" sx={{ minWidth: 200, background: "#fff" }}>
                        <InputLabel id="timezone-label">Timezone</InputLabel>
                        <Select
                            labelId="timezone-label"
                            name="timezone"
                            value={form.timezone}
                            label="Timezone"
                            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                        >
                            {timezones.map((tz) => (
                                <MenuItem key={tz.value} value={tz.value}>
                                    {tz.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ minWidth: 140, height: 40 }}
                    >
                        {loading ? "Creating..." : "Create Coupon"}
                    </Button>
                </Stack>
            </Box>
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 600 }}>
                        <Table>
                            <TableHeader
                                heading={[
                                    { id: "title", label: "Title", align: "left" },
                                    { id: "content", label: "Content", align: "left" },
                                    { id: "discount", label: "Discount", align: "center" },
                                    { id: "expireAt", label: "Expire Date", align: "center" },
                                    { id: "utc", label: "UTC", align: "center" },
                                    { id: "state", label: "State", align: "center" },
                                    { id: "limit", label: "Limit", align: "right", content: [1, 3, 6, 12, 24, 50, 100] },
                                ]}
                                orderBy="title"
                                rowCount={couponsList?.length}
                                numSelected={0}
                                order="asc"
                                onFilterChange={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                                onRequestSort={(filter: string, option: string) => setFilters((f: any) => { return { ...f, [filter]: option } })}
                                hideSelectBtn
                            />
                            <TableBody>
                                {couponsList?.coupons?.map((coupon: { id: any; discount: number; type: string; }) => (
                                    <CouponRow
                                        key={coupon.id}
                                        coupon={{
                                            ...coupon,
                                            discountDisplay: coupon.type === "amount"
                                                ? `$${coupon.discount}`
                                                : `${coupon.discount}%`
                                        }}
                                        setActualize={setActualize}
                                        onClick={() => setSelectedCoupon(coupon)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
                <Pagination
                    page={couponsList?.page}
                    prevPage={couponsList?.prevPage}
                    nextPage={couponsList?.nextPage}
                    totalPages={couponsList?.totalPages}
                    handlePage={handlePage}
                />
            </Card>
        </PageWrapper>
    );
}
