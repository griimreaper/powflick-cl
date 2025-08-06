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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ToggleButtonGroup,
    ToggleButton,
    Icon
} from "@mui/material";
import { ErrorOutline, ChevronRightOutlined, OpenWithOutlined } from "@mui/icons-material";
import { Customization } from "models/types";
import { useForm, Controller } from "react-hook-form";
import { useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";

export default function TeamDialogTrigger({
    customizations,
    showFront,
    setShowFrontPanel,
    productId,
}: {
    customizations?: Customization[];
    showFront?: boolean;
    setShowFrontPanel?: (x: boolean) => void;
    productId: string;
}) {
    const [open, setOpen] = useState(false);
    const [side, setSide] = useState<"frontSide" | "backSide">("frontSide");
    const [index, setIndex] = useState(0);

    const { setCustomization } = useCustomizationStore();
    const { updateCustomizationField } = useCustomizationsStore();

    const { control, handleSubmit, reset } = useForm();

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
        const values: Record<string, any> = {};
        customizations?.forEach((c) => {
            const fieldPrefix = `${c.id}-${side}-${index}`;
            values[`${fieldPrefix}-number`] = c[side]?.numbers?.[index]?.number || "";
            values[`${fieldPrefix}-text`] = c[side]?.texts?.[index]?.text || "";
        });
        reset(values);

    }, [side, index, customizations, reset]);

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
                            <Box display="flex" justifyContent={{xs: 'space-between', md: 'end'}} width={'100%'} gap={2}>
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

                                {/* Índice Global */}
                                <FormControl size="small">
                                    <InputLabel>Index</InputLabel>
                                    <Select
                                        value={index}
                                        label="Index"
                                        onChange={(e) => setIndex(Number(e.target.value))}
                                    >
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <MenuItem key={i} value={i}>
                                                #{i + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {customizations?.map((c) => {
                                const fieldPrefix = `${c.id}-${side}-${index}`;

                                return (
                                    <Grid container spacing={1} key={c.id} alignItems="center" display={'flex'} mb={1}>
                                        <Grid item xs={5.5} >
                                            <Controller
                                                name={`${fieldPrefix}-number`}
                                                control={control}
                                                rules={{
                                                    pattern: {
                                                        value: /^[0-9]{1,3}$/,
                                                        message: "Only numbers (max 3 digits)",
                                                    },
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        type="number"
                                                        fullWidth
                                                        label="Number"
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        value={field.value || ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value.slice(0, 3);
                                                            field.onChange(value); // Actualiza react-hook-form
                                                            updateCustomizationField(
                                                                productId,
                                                                c.id,
                                                                side,
                                                                "numbers",
                                                                index,
                                                                value
                                                            );
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid container item xs={5.5}>
                                            <Controller
                                                name={`${fieldPrefix}-text`}
                                                control={control}
                                                rules={{
                                                    minLength: { value: 2, message: "Min 2 characters" },
                                                    maxLength: { value: 14, message: "Max 14 characters" },
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="Text"
                                                        error={!!fieldState.error}
                                                        value={field.value || ""}
                                                        helperText={fieldState.error?.message}
                                                        onChange={(e) => {
                                                            const value = e.target.value.slice(0, 14); // limitar a 14 caracteres
                                                            field.onChange(value);
                                                            updateCustomizationField(
                                                                productId,
                                                                c.id,
                                                                side,
                                                                "texts",
                                                                index,
                                                                value
                                                            );
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid container item xs={1} alignItems={'center'} display={'flex'} justifyContent={'center'}>
                                            <Icon sx={{
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                width: 32,
                                                height: 32,
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                            }}
                                                onClick={() => {
                                                    setCustomization(c); // función que guarda la selección
                                                    handleClose(); // función que cierra el dialog
                                                    togglePanel()
                                                }}>
                                                <OpenWithOutlined />
                                            </Icon>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
