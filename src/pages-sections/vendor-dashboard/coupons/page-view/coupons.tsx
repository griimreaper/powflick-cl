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
import { getCoupons } from "services/dashboardAdmin/coupons";
import { createCoupon } from "services/modals/discount";
import { Box, Button, TextField, Stack, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
    const [page, setPage] = useState(1);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

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
        getCoupons().then(setCouponsList);
    }, [actualize, page]);

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
                alert("Para establecer la fecha de expiración debe completar fecha y hora");
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
                expiresAt = localDateTime.utc().toDate();
            }

            await createCoupon({
                title: form.title,
                content: form.content,
                discount: Number(form.discount),
                type: form.type,
                expiresAt, // Date o null
            });

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
        } catch (err) {
            alert("Error al crear cupón");
        }
        setLoading(false);
    };

    console.log("couponsList", couponsList);

    return (
        <PageWrapper title="Coupons">
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                                    { id: "discount", label: "Discount", align: "center" }, // quitado el (%)
                                    { id: "expireAt", label: "Expire Date", align: "center" }, // quitado el (%)
                                    { id: "actions", label: "Actions", align: "center" },
                                ]}
                                orderBy="title"
                                rowCount={couponsList?.length}
                                numSelected={0}
                                order="asc"
                                onRequestSort={() => { }}
                                hideSelectBtn
                            />
                            <TableBody>
                                {couponsList?.map((coupon: { id: any; discount: number; type: string; }) => (
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
                    handlePage={setPage}
                />
            </Card>
        </PageWrapper>
    );
}
