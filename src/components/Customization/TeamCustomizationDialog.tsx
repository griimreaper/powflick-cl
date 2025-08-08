import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Icon,
    Button
} from "@mui/material";
import { ErrorOutline, ChevronRightOutlined, OpenWithOutlined, DeleteOutline, Visibility, Delete } from "@mui/icons-material";
import { Customization } from "models/types";
import { useForm, Controller } from "react-hook-form";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";

export default function TeamCustomDialogTrigger({
    showFront,
    setShowFrontPanel,
    productId,
    customizations,
    setSelection,
}: {
    customizations?: Customization[];
    showFront?: boolean;
    setShowFrontPanel?: (x: boolean) => void;
    productId: string;
    setSelection: Function;
}) {
    const [open, setOpen] = useState(false);
    const [side, setSide] = useState<"frontSide" | "backSide">("frontSide");

    const { setCustomization } = useCustomizationStore();
    const { updateCustomizationField } = useCustomizationsStore();

    const [selectedCustomizationId, setSelectedCustomizationId] = useState<string | null>(
        customizations?.[0]?.id ?? null
    );

    const [blocksCount, setBlocksCount] = useState(0);

    const { control, handleSubmit, reset, getValues } = useForm();

    const handleOpen = () => {
        setSide(!showFront ? "frontSide" : "backSide");
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSideChange = (_: React.MouseEvent<HTMLElement>, newSide: typeof side | null) => {
        if (newSide) setSide(newSide);
    };

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
        handleClose();
    };

    const togglePanel = () => {
        if (setShowFrontPanel) {
            side !== "frontSide" ? setShowFrontPanel(true) :
                setShowFrontPanel(false);
        }
    }

    useEffect(() => {
        if (!selectedCustomizationId) return;

        const c = customizations?.find((c) => c.id === selectedCustomizationId);
        if (!c) return;

        // Calcular cantidad de bloques actual
        const count = Math.max(
            c[side]?.numbers?.length ?? 0,
            c[side]?.texts?.length ?? 0
        );
        setBlocksCount(count);

        const values: Record<string, any> = {};
        c[side]?.numbers?.forEach((n, i) => {
            values[`${c.id}-${side}-number-${i}`] = n?.number || "";
        });
        c[side]?.texts?.forEach((t, i) => {
            values[`${c.id}-${side}-text-${i}`] = t?.text || "";
        });

        reset({ ...values });
    }, [side, selectedCustomizationId, customizations, reset]);

    const handleAddBlock = () => {
        if (!selectedCustomizationId) return;

        const c = customizations?.find(c => c.id === selectedCustomizationId);
        if (!c) return;

        const currentNumbers = c[side]?.numbers ?? [];
        const currentTexts = c[side]?.texts ?? [];

        const newIndex = Math.max(currentNumbers.length, currentTexts.length);

        // Actualizá el store con nuevos valores vacíos
        updateCustomizationField(productId, selectedCustomizationId, side, "numbers", newIndex, "");
        updateCustomizationField(productId, selectedCustomizationId, side, "texts", newIndex, "");

        // Actualizá el form
        const fieldPrefix = `${selectedCustomizationId}-${side}`;
        reset({
            ...getValues(), // <-- conservar campos anteriores
            [`${fieldPrefix}-number-${newIndex}`]: "",
            [`${fieldPrefix}-text-${newIndex}`]: "",
        });
    };

    const handleRemoveBlock = () => {
        if (!selectedCustomizationId) return;

        const c = customizations?.find(c => c.id === selectedCustomizationId);
        if (!c) return;

        const currentNumbers = c[side]?.numbers ?? [];
        const currentTexts = c[side]?.texts ?? [];

        const lastIndex = Math.max(currentNumbers.length, currentTexts.length) - 1;

        // No eliminar si solo queda un bloque
        if (lastIndex <= 0) return;

        // Eliminar del store
        updateCustomizationField(productId, selectedCustomizationId, side, "numbers", lastIndex, undefined);
        updateCustomizationField(productId, selectedCustomizationId, side, "texts", lastIndex, undefined);

        // Limpiar campos del form
        const fieldPrefix = `${selectedCustomizationId}-${side}`;
        reset({
            ...getValues(),
            [`${fieldPrefix}-number-${lastIndex}`]: undefined,
            [`${fieldPrefix}-text-${lastIndex}`]: undefined,
        });
    };

    const currentCustomization = customizations?.find(c => c.id === selectedCustomizationId);

    return (
        <>
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={handleOpen}>
                <Tooltip title="You can use this view to edit each text and numbers" placement="bottom">
                    <ErrorOutline
                        sx={{
                            width: 24,
                            height: 24,
                            opacity: 0.5,
                            "&:hover": { opacity: 1 },
                        }}
                    />
                </Tooltip>
                <Typography variant="body2" color="primary" sx={{ textDecoration: "underline" }}>
                    Team
                </Typography>
                <ChevronRightOutlined sx={{ width: 16, height: 16 }} />
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'start', md: "center" }} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                            <Typography variant="h6" whiteSpace={'nowrap'}>Edit Team</Typography>
                            <Box display="flex" justifyContent={{ xs: 'space-between', md: 'end' }} width={'100%'} gap={2}>
                                {/* Lado: Front / Back */}
                                <ToggleButtonGroup
                                    value={side}
                                    exclusive
                                    onChange={handleSideChange}
                                    size="small"
                                    color="primary"
                                >
                                    <ToggleButton value="frontSide">Front</ToggleButton>
                                    <ToggleButton value="backSide">Back</ToggleButton>
                                </ToggleButtonGroup>

                            </Box>

                        </Box>
                        <Box
                            maxWidth="100%"
                            display="flex"
                            justifyContent="flex-start"
                            py={2}
                            sx={{ overflowX: 'auto', gap: 2 }}
                        >
                            {customizations?.map((c, index) => {
                                const isActive = selectedCustomizationId === c.id;

                                return (
                                    <Button
                                        key={c.id}
                                        onClick={() => setSelectedCustomizationId(c.id)}
                                        variant={isActive ? "contained" : "outlined"}
                                        sx={{
                                            width: "2rem",
                                            backgroundColor: isActive ? "black" : "white",
                                            color: !isActive ? "black" : "white",
                                            height: "2rem",
                                            fontSize: "0.875rem", // text-sm
                                            borderRadius: "0.375rem", // rounded-md
                                            minWidth: 0, // evita que el botón se expanda por el texto
                                            padding: 0,
                                            flexShrink: 0,
                                            ':hover': {
                                                backgroundColor: isActive ? "black" : "dark.light",
                                            }
                                        }}
                                    >
                                        {index + 1}
                                    </Button>
                                );
                            })}
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {selectedCustomizationId && Array.from({ length: blocksCount }).map((_, i) => {
                                const fieldPrefix = `${selectedCustomizationId}-${side}`;
                                return (
                                    <Grid container spacing={1} key={i} alignItems="center" mb={1}>

                                        {/* Número + botones */}
                                        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
                                            <Controller
                                                name={`${fieldPrefix}-number-${i}`}
                                                control={control}
                                                rules={{
                                                    pattern: { value: /^[0-9]{1,3}$/, message: "Only numbers (max 3 digits)" },
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        type="number"
                                                        fullWidth
                                                        label={`Number #${i + 1}`}
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        placeholder="US$3.99"
                                                        value={field.value || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value.slice(0, 3);
                                                            field.onChange(value);
                                                            updateCustomizationField(productId, selectedCustomizationId!, side, "numbers", i, value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <Icon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    border: "1px solid black",
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:active': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: 'black' }
                                                    },
                                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                                }}
                                                onClick={() => {
                                                    const selected = customizations?.find(c => c.id === selectedCustomizationId);
                                                    if (selected) {
                                                        setCustomization(selected);
                                                        setSelection({ type: 'Number', index: i })
                                                        handleClose();
                                                        togglePanel();
                                                    }
                                                }}
                                            >
                                                <Visibility />
                                            </Icon>
                                            <Icon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    border: "1px solid black",
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:active': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: 'black' }
                                                    },
                                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                                }}
                                                onClick={() => {
                                                    if (!selectedCustomizationId) return;

                                                    // Limpiar valor (vacío) pero no eliminar el bloque
                                                    updateCustomizationField(productId, selectedCustomizationId, side, "numbers", i, "");

                                                    const fieldPrefix = `${selectedCustomizationId}-${side}`;
                                                    reset({
                                                        ...getValues(),
                                                        [`${fieldPrefix}-number-${i}`]: "",
                                                    });
                                                }}
                                            >
                                                <Delete />
                                            </Icon>
                                        </Grid>

                                        {/* Texto + botones */}
                                        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
                                            <Controller
                                                name={`${fieldPrefix}-text-${i}`}
                                                control={control}
                                                rules={{
                                                    minLength: { value: 2, message: "Min 2 characters" },
                                                    maxLength: { value: 14, message: "Max 14 characters" },
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label={`Text #${i + 1}`}
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        placeholder="US$3.99"
                                                        value={field.value || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value.slice(0, 14);
                                                            field.onChange(value);
                                                            updateCustomizationField(productId, selectedCustomizationId!, side, "texts", i, value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <Icon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    border: "1px solid black",
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:active': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: 'black' }
                                                    },
                                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                                }}
                                                onClick={() => {
                                                    const selected = customizations?.find(c => c.id === selectedCustomizationId);
                                                    if (selected) {
                                                        setCustomization(selected);
                                                        setSelection({ type: 'Text', index: i })
                                                        handleClose();
                                                        togglePanel();
                                                    }
                                                }}
                                            >
                                                <Visibility />
                                            </Icon>
                                            <Icon
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    border: "1px solid black",
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:active': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: 'black' }
                                                    },
                                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                                }}
                                                onClick={() => {
                                                    if (!selectedCustomizationId) return;

                                                    // Limpiar valor (vacío) pero no eliminar el bloque
                                                    updateCustomizationField(productId, selectedCustomizationId, side, "texts", i, "");

                                                    const fieldPrefix = `${selectedCustomizationId}-${side}`;
                                                    reset({
                                                        ...getValues(),
                                                        [`${fieldPrefix}-number-${i}`]: "",
                                                    });
                                                }}
                                            >
                                                <Delete />
                                            </Icon>
                                        </Grid>

                                    </Grid>

                                );
                            })}
                        </Grid>

                        <Button
                            variant="outlined"
                            onClick={handleAddBlock}
                            size="small"
                            sx={{ mt: 2 }}
                        >
                            + Add Block
                        </Button>

                        {blocksCount > 1 && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleRemoveBlock}
                                size="small"
                                sx={{ mt: 2, ml: 1 }}
                            >
                                - Remove Block
                            </Button>
                        )}

                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
