import { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format } from "date-fns";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

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

type Coupon = {
    id: string;
    title: string;
    content: string;
    discount: number;
    type: "percent" | "amount";
    expiresAt: string | null;
    timezone: string | null;
};

type Props = {
    coupon: Coupon;
    onCancel: () => void;
    onSave: (updatedCoupon: Partial<Coupon>) => Promise<void>;
};

export default function CouponEditForm({ coupon, onCancel, onSave }: Props) {
    const expiresAt = coupon.expiresAt ? dayjs.utc(coupon.expiresAt).tz(coupon.timezone || 'UTC') : null;
    const router = useRouter();

    const [form, setForm] = useState({
        title: coupon.title || '',
        content: coupon.content || '',
        discount: coupon.discount.toString(),
        type: coupon.type || 'percent',
        expirationDate: expiresAt ? expiresAt.format('YYYY-MM-DD') : '',
        expirationTime: expiresAt ? expiresAt.format('HH:mm') : '',
        timezone: coupon.timezone || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setForm(prev => ({ ...prev, type: event.target.value as 'percent' | 'amount' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if ((form.expirationDate && !form.expirationTime) || (!form.expirationDate && form.expirationTime)) {
            alert("Para establecer la fecha de expiración debe completar fecha y hora");
            return;
        }
        let expiresAt = null;
        if (form.expirationDate && form.expirationTime && form.timezone) {
            // 1. Construir fecha/hora con timezone
            const localDateTime = dayjs.tz(
                `${form.expirationDate} ${form.expirationTime}`,
                'YYYY-MM-DD HH:mm',
                form.timezone
            );

            // 2. Convertir a UTC
            const selectedUtc = localDateTime.utc();

            // 3. Obtener la hora actual en UTC
            const nowUtc = dayjs.utc();

            // 4. Validar que sea futura
            if (selectedUtc.isBefore(nowUtc)) {
                showErrorAlert("Date Restriccion", "The date and time must be in the future.");
                return;
            }

            // 5. Convertir a ISO para guardar
            expiresAt = selectedUtc.toISOString();
        }

        await onSave({
            title: form.title,
            content: form.content,
            discount: Number(form.discount),
            type: form.type as 'percent' | 'amount',
            expiresAt,
            timezone: form.timezone,
        });

        showSuccessAlert("Success", "Coupon updated successfully");

        router.refresh();
    };

    const todayUtc = new Date();
    const minDate = format(todayUtc, 'yyyy-MM-dd');

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }} flexWrap="nowrap" justifyContent={"space-between"}>
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
            </Stack>

            {/* Botones alineados a la derecha */}
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    Cancelar
                </Button>
            </Stack>
        </form>
    );

}
