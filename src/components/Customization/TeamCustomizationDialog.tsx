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
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material";
import { ErrorOutline, ChevronRightOutlined, Visibility, Delete, Close } from "@mui/icons-material";
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
    const [mode, setMode] = useState<"numbers" | "texts">("texts"); // solo mobile

    const { setCustomization } = useCustomizationStore();
    const { updateCustomizationField } = useCustomizationsStore();

    const [selectedCustomizationId, setSelectedCustomizationId] = useState<string | null>(
        customizations?.[0]?.id ?? null
    );

    const [blocksCount, setBlocksCount] = useState(0);

    const { control, handleSubmit, reset, getValues } = useForm();

    const isMobile = useMediaQuery('(max-width: 500px)');

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
                            <Box display={"flex"} width={'100%'} justifyContent={'space-between'}>
                                <Typography variant="h6" whiteSpace={'nowrap'}>Edit Team</Typography>
                                <IconButton
                                    onClick={handleClose}
                                    size="small"
                                    aria-label="close dialog"
                                    sx={{ display: { xs: "flex", md: 'none' } }}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                            <Box display="flex" justifyContent={{ xs: 'space-between', md: 'end' }} flexWrap={'wrap'} width={'100%'} gap={3}>
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
                                {/* Mobile: selector global de modo */}
                                {isMobile && (
                                    <ToggleButtonGroup
                                        value={mode}
                                        exclusive
                                        onChange={(_, v) => v && setMode(v)}
                                        size="small"
                                        color="primary"
                                    >
                                        <ToggleButton value="texts">Texts</ToggleButton>
                                        <ToggleButton value="numbers">Numbers</ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                                <IconButton
                                    onClick={handleClose}
                                    size="small"
                                    aria-label="close dialog"
                                    sx={{ display: { md: "flex", xs: 'none' } }}
                                >
                                    <Close />
                                </IconButton>
                            </Box>

                        </Box>
                        <Box
                            maxWidth="100%"
                            overflow="auto"
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pt: 3,
                                pb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mx: 'auto', // centra si cabe, se alinea izq si no
                                    minWidth: 'fit-content', // evita que se rompa en múltiples líneas
                                }}
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
                                                fontSize: "0.875rem",
                                                borderRadius: "0.375rem",
                                                minWidth: 0,
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
                        </Box>

                    </DialogTitle>

                    <DialogContent>
                        <Grid spacing={2} sx={{ mt: 1 }}>
                            {selectedCustomizationId && Array.from({ length: blocksCount }).map((_, i) => {
                                const fieldPrefix = `${selectedCustomizationId}-${side}`;
                                return (
                                    <Grid container spacing={1} key={i} alignItems="center" mb={1}>

                                        {/* Desktop: dos campos */}
                                        {!isMobile && (
                                            <>
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
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: 'black',
                                                                        },
                                                                    },
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
                                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            '&:active': {
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: 'black' }
                                                            },
                                                            '&:hover': { backgroundColor: '#d9d9d9' }
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
                                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            '&:active': {
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: 'black' }
                                                            },
                                                            '&:hover': { backgroundColor: '#d9d9d9' }
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
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: 'black',
                                                                        },
                                                                    },
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
                                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            '&:active': {
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: 'black' }
                                                            },
                                                            '&:hover': { backgroundColor: '#d9d9d9' }
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
                                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                                            '&:active': {
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: 'black' }
                                                            },
                                                            '&:hover': { backgroundColor: '#d9d9d9' }
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

                                            </>
                                        )}
                                        {/* Mobile: solo el campo según modo */}

                                        {isMobile && mode === "texts" && (
                                            <Grid xs={12} mb={1} display="flex" alignItems="center" ml={1} justifyContent={'flex-start'} width={'100%'} gap={1}>
                                                <Controller
                                                    name={`${fieldPrefix}-text-${i}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label={`Text #${i + 1}`}
                                                            value={field.value || ""}
                                                            sx={{ width: '100%' }}
                                                            onChange={(e) => {
                                                                const val = e.target.value.slice(0, 14);
                                                                field.onChange(val);
                                                                updateCustomizationField(
                                                                    productId,
                                                                    selectedCustomizationId!,
                                                                    side,
                                                                    "texts",
                                                                    i,
                                                                    val
                                                                );
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
                                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                                        '&:active': {
                                                            backgroundColor: 'black',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: 'black' }
                                                        },
                                                        '&:hover': { backgroundColor: '#d9d9d9' }
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
                                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                                        '&:active': {
                                                            backgroundColor: 'black',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: 'black' }
                                                        },
                                                        '&:hover': { backgroundColor: '#d9d9d9' }
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
                                        )}
                                        {isMobile && mode === "numbers" && (
                                            <Grid xs={12} mb={1} display="flex" alignItems="center" ml={1} justifyContent={'flex-start'} width={'100%'} gap={1}>
                                                <Controller
                                                    name={`${fieldPrefix}-numbers-${i}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            type="number"
                                                            sx={{ width: '100%' }}
                                                            label={`Number #${i + 1}`}
                                                            value={field.value || ""}
                                                            onChange={(e) => {
                                                                const val = e.target.value.slice(0, 3);
                                                                field.onChange(val);
                                                                updateCustomizationField(
                                                                    productId,
                                                                    selectedCustomizationId!,
                                                                    side,
                                                                    "numbers",
                                                                    i,
                                                                    val
                                                                );
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
                                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                                        '&:active': {
                                                            backgroundColor: 'black',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: 'black' }
                                                        },
                                                        '&:hover': { backgroundColor: '#d9d9d9' }
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
                                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                                        '&:active': {
                                                            backgroundColor: 'black',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: 'black' }
                                                        },
                                                        '&:hover': { backgroundColor: '#d9d9d9' }
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
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Box display={'flex'} justifyContent={'flex-start'} gap={1}>
                            <Button
                                variant="outlined"
                                onClick={handleAddBlock}
                                size="small"
                                sx={{ mt: 2, width: '50%', whiteSpace: 'nowrap', minWidth: '12ch' }}
                            >
                                + Add Block
                            </Button>

                            {blocksCount > 1 && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleRemoveBlock}
                                    size="small"
                                    sx={{ mt: 2, width: '50%', whiteSpace: 'nowrap', minWidth: '16ch' }}
                                >
                                    - Remove Block
                                </Button>
                            )}
                        </Box>

                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
