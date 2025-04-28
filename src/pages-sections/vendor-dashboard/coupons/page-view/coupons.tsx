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

export default function CouponsPageView() {
    const [couponsList, setCouponsList] = useState<any>();
    const [actualize, setActualize] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

    // Estado para el formulario de creación
    const [form, setForm] = useState({ title: "", content: "", discount: "", type: "percent" });
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
            await createCoupon({
                title: form.title,
                content: form.content,
                discount: Number(form.discount),
                type: form.type,
            });
            setForm({ title: "", content: "", discount: "", type: "percent" });
            setActualize((a) => !a);
        } catch (err) {
            // Manejo de error simple
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
                                    { id: "discount", label: "Discount (%)", align: "center" },
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
                                {couponsList?.map((coupon: { id: any; }) => (
                                    <CouponRow
                                        key={coupon.id}
                                        coupon={coupon}
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
