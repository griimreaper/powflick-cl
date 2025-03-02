import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Button, CircularProgress, Box } from "@mui/material";
import { Direction } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { createDirection, deleteDirection, updateDirection } from "services/Directions";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import useLoading from "hooks/useLoading";
import useHeader from "components/header/hooks/use-header";

export default function DirectionForm({
    toggleForm,
    address,
    toggleDialog,
}: {
    toggleForm: () => void;
    toggleDialog?: () => void;
    address: Direction | null;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [loading, startLoading, stopLoading] = useLoading();
    const { profile, addOrUpdateUserDirection, setProfileUser } = useDashboardStore();
    const { token } = profile;

    useEffect(() => {
        const savedData = localStorage.getItem("pendingAddress");
        if (savedData && !address) {
            reset(JSON.parse(savedData)); // Restaurar datos guardados en localStorage
        } else if (address) {
            reset(address);
        }
    }, [address, reset]);

    const fetchDeleteDirection = async (token: string) => {
        if (token && address) {
            try {
                const response = await deleteDirection(token, address.id);
                setProfileUser({ directions: response.directions });
                showSuccessAlert("Success!", response.message);
            } catch (error) {
                showErrorAlert("Error!", `Error deleting direction: ${error}`);
            }
        }
    };

    const fetchUpdateDirection = async (token: any, data: any) => {
        if (token) {
            const response = await updateDirection(token, data);
            if (response?.error) {
                showErrorAlert("Error!", `Error updating address: ${response?.error}`);
            }
            if (response.status === 204 || response.status === 200) {
                showSuccessAlert("Success!", response.message);
                toggleForm();
                reset();
                addOrUpdateUserDirection(response.direction);
            }
        }
    };

    const fetchCreateDirection = async (token: any, data: any) => {
        if (token) {
            try {
                startLoading();
                const response = await createDirection(token, data);
                showSuccessAlert("Success!", "Address created correctly");
                addOrUpdateUserDirection(response.direction);
                stopLoading();
                toggleForm();
                localStorage.removeItem("pendingAddress");
                reset();
            } catch (error) {
                showErrorAlert("Error!", `Failed to create address ${error}`);
                stopLoading();
            }
        } else {
            localStorage.setItem("pendingAddress", JSON.stringify(data)); // Guardar formulario antes de redirigir
            toggleDialog!();
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        if (address) {
            await fetchUpdateDirection(token, data);
        } else {
            await fetchCreateDirection(token, data);
        }
    });

    return (
        <Box sx={{ mt: 1, width: "100%" }}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Country/Region"
                                fullWidth
                                variant="outlined"
                                {...register("country", {
                                    required: "Country is required",
                                })}
                                error={!!errors.country}
                                helperText={errors.country?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                fullWidth
                                variant="outlined"
                                {...register("city", {
                                    required: "City is required",
                                })}
                                error={!!errors.city}
                                helperText={errors.city?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Location"
                                fullWidth
                                variant="outlined"
                                {...register("district", {
                                    required: "Location is required",
                                })}
                                error={!!errors.district}
                                helperText={errors.district?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Postal Code"
                                fullWidth
                                variant="outlined"
                                {...register("postalCode", {
                                    required: "Postal code is required",
                                })}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                fullWidth
                                variant="outlined"
                                {...register("address", {
                                    required: "Address is required",
                                })}
                                error={!!errors.address}
                                helperText={errors.address?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apartment, Suite, etc"
                                fullWidth
                                variant="outlined"
                                {...register("addressReference")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Neighborhood"
                                fullWidth
                                variant="outlined"
                                {...register("neighborhood", {
                                    required: "Neighborhood is required",
                                })}
                                error={!!errors.neighborhood}
                                helperText={errors.neighborhood?.message?.toString()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone"
                                fullWidth
                                variant="outlined"
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^\+[1-9]{1}[0-9]{3,14}$/,
                                        message:
                                            "Phone number must start with a '+' and include the country code",
                                    },
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message?.toString()}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justifyContent="space-around" sx={{ mt: 0.1 }}>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24} /> : address ? "Update" : "Submit"}
                            </Button>
                        </Grid>
                        {address && (
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => fetchDeleteDirection(token!)}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Delete"}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </form>
        </Box>
    );
}
