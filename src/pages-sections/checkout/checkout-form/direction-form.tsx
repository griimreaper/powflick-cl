import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Button, CircularProgress, Box, Autocomplete } from "@mui/material";
import { Direction } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { createDirection, deleteDirection, updateDirection } from "services/Directions";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import useLoading from "hooks/useLoading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Country } from "country-state-city";

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
        control,
        watch,
        setValue,
    } = useForm();
    const [loading, startLoading, stopLoading] = useLoading();
    const { profile, addOrUpdateUserDirection, setProfileUser } = useDashboardStore();
    const { token } = profile;

    // Simplificado: solo se usa el valor seleccionado
    const selectedCountry = watch("country");
    const countryInput = watch("countryInput") || "";

    // Restaurar datos guardados o cargar dirección existente
    useEffect(() => {
        const savedData = localStorage.getItem("pendingAddress");
        if (savedData && !address) {
            reset(JSON.parse(savedData));
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
            localStorage.setItem("pendingAddress", JSON.stringify(data));
            toggleDialog && toggleDialog();
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        if (address) {
            await fetchUpdateDirection(token, data);
        } else {
            await fetchCreateDirection(token, data);
        }
    });

    // Opciones de países filtradas en cada render
    const allCountries = useMemo(() => Country.getAllCountries(), []);
    const filteredCountries = countryInput.length > 0
        ? allCountries.filter(c => c.name.toLowerCase().includes(countryInput.toLowerCase()))
        : allCountries;

    return (
        <Box sx={{ mt: 1, width: "100%" }}>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                                <Autocomplete
                                    options={filteredCountries}
                                    getOptionLabel={(option) => option.name}
                                    inputValue={countryInput}
                                    onInputChange={(_, value) => setValue("countryInput", value)}
                                    value={filteredCountries.find(opt => opt.isoCode === field.value) || null}
                                    onChange={(_, value) => {
                                        field.onChange(value ? value.isoCode : "");
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Country/Region"
                                            error={!!errors.country}
                                            helperText={errors.country?.message?.toString()}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            fullWidth
                            variant="outlined"
                            {...register("city", {
                                required: "City is required",
                                minLength: { value: 2, message: "Min 2 characters" },
                                maxLength: { value: 50, message: "Max 50 characters" },
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            fullWidth
                            variant="outlined"
                            {...register("district", {
                                required: "State is required",
                                minLength: { value: 2, message: "Min 2 characters" },
                                maxLength: { value: 50, message: "Max 50 characters" },
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
                                pattern: {
                                    value: /^[A-Za-z0-9\- ]{3,10}$/,
                                    message: "Invalid postal code",
                                },
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
                                minLength: { value: 5, message: "Min 5 characters" },
                                maxLength: { value: 100, message: "Max 100 characters" },
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
                            {...register("addressReference", {
                                required: "Apartment/Suite is required",
                                minLength: { value: 2, message: "Min 2 characters" },
                                maxLength: { value: 50, message: "Max 50 characters" },
                            })}
                            error={!!errors.addressReference}
                            helperText={errors.addressReference?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Neighborhood"
                            fullWidth
                            variant="outlined"
                            {...register("neighborhood", {
                                required: "Neighborhood is required",
                                minLength: { value: 2, message: "Min 2 characters" },
                                maxLength: { value: 50, message: "Max 50 characters" },
                            })}
                            error={!!errors.neighborhood}
                            helperText={errors.neighborhood?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Phone is required",
                                minLength: { value: 10, message: "Min 10 digits" },
                                maxLength: { value: 15, message: "Max 15 digits" },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers allowed",
                                },
                            }}
                            render={({ field }) => (
                                <PhoneInput
                                    country={"mx"}
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                        autoFocus: false,
                                    }}
                                    inputStyle={{ width: "100%", height: 26 }}
                                />
                            )}
                        />
                        {errors.phone && (
                            <span style={{ color: "#d32f2f", fontSize: 12 }}>
                                {errors.phone.message?.toString()}
                            </span>
                        )}
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
