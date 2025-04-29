"use client";

import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Box,
    Tooltip,
} from "@mui/material";
import { FreeDesign } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { colors } from "app/(layout-1)/your-design/Form";
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";

// ================================================================
interface Props {
    id: string;
    freeDesign: FreeDesign;
}
// ================================================================

export default function FreeDesignDetail({ id, freeDesign }: Props) {
    const {
        addNames,
        addNumbers,
        createdAt,
        email,
        teamName,
        fullName,
        logos,
        otherImages,
        primaryColors,
        font,
        secondaryColors,
        sport,
        date,
        description,
        organization,
        phone,
    } = freeDesign;

    console.log(logos);
    
    function RenderColor(color: string[]) {
        return (
            <Grid container spacing={2}>
                {color.map((color) => (
                    <Grid item xs={3} sm={2} md={1} key={color}>
                        <Tooltip title={color}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: colors.find(c => c.name === color)?.hex,
                                    borderRadius: 1,
                                    border: "1px solid #ccc",
                                    mx: "auto",
                                }}
                            />
                        </Tooltip>
                        <Typography
                            variant="caption"
                            display="block"
                            align="center"
                            sx={{ mt: 0.5 }}
                        >
                            {color}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        );
    }

    const renderArray = (arr?: string[]) =>
        arr && arr.length ? arr.join(", ") : "N/A";

    return (
        <>
            <PageWrapper title="Free Design Details">
                <Card>
                    <CardContent>

                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            Contact Info
                        </Typography>
                        <Grid container spacing={2} xs={12} mb={6}>
                            <Detail label="Full Name" value={fullName} />
                            <Detail label="Email" value={email} />
                            <Detail label="Phone" value={phone} />
                        </Grid>

                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            Team Info
                        </Typography>
                        <Grid container spacing={2} xs={12} mb={6}>
                            <Detail label="Team Name" value={teamName} />
                            <Detail label="Sport" value={sport} />
                            <Detail label="Organization" value={organization} />
                        </Grid>

                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            Design Preferences
                        </Typography>
                        <Grid container spacing={2} xs={12}>
                            <Detail label="Primary Colors" value={RenderColor(primaryColors)} />
                            <Detail label="Secondary Colors" value={RenderColor(secondaryColors)} />
                            <Detail label="Add Names" value={addNames ? "Yes" : "No"} />
                            <Detail label="Add Numbers" value={addNumbers ? "Yes" : "No"} />
                            {/* <Detail label="Font" value={<Typography variant="h6" sx={{ fontFamily: font }}>{font}</Typography>} /> */}
                            <Detail label="Date" value={date || "N/A"} />
                            <Detail
                                label="Created At"
                                value={new Date(createdAt).toLocaleString()}
                            />
                        </Grid>
                        <Typography variant="subtitle1" fontWeight="bold" mt={3}>
                            Description
                        </Typography>
                        <Typography variant="body2">{description || "N/A"}</Typography>

                        {logos?.length > 0 && (
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Logos
                                </Typography>
                                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                                    {logos.map((logo, i) => (
                                        <img
                                            key={i}
                                            src={logo}
                                            alt={`logo-${i}`}
                                            style={{
                                                width: 96,
                                                height: 96,
                                                objectFit: "contain",
                                                borderRadius: 4,
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {otherImages?.length > 0 && (
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Other Images
                                </Typography>
                                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                                    {otherImages.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`img-${i}`}
                                            style={{
                                                width: 96,
                                                height: 96,
                                                objectFit: "contain",
                                                borderRadius: 4,
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                    </CardContent>
                </Card>
            </PageWrapper>
        </>
    );
}

function Detail({ label, value }: { label: string; value?: string | JSX.Element }) {
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="text.secondary">
                {label}
            </Typography>
            {typeof value === "string" ? (
                <Typography variant="body2">{value || "N/A"}</Typography>
            ) :
                value
            }
        </Grid>
    );
}
