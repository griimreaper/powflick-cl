import { Box, Typography } from "@mui/material";
import { Customization } from "models/types";

type Props = {
    customization: Customization | undefined;
};

export default function CustomizationDetails({ customization }: Props) {
    if (!customization) return null;

    return (
        <Box>
            {customization.size && <Typography>Size: {customization.size}</Typography>}

            {/* FRONT */}
            {customization.frontSide?.logos?.some((e) => e.logoUrl) &&
                customization.frontSide.logos.map(
                    (each, index) =>
                        each.logoUrl && (
                            <Box key={`front-logo-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Front Logo {index + 1}:
                                </Typography>
                                <img
                                    src={each.logoUrl}
                                    alt={`Front Logo ${index + 1}`}
                                    style={{ width: 24, height: 24, marginLeft: 8 }}
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+4.99)
                                </Typography>
                            </Box>
                        )
                )}
            {customization.frontSide?.texts?.some((e) => e.text) &&
                customization.frontSide.texts.map(
                    (each, index) =>
                        each.text && (
                            <Box key={`front-text-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Front Text {index + 1}:
                                </Typography>
                                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                    {each.text}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+3.99)
                                </Typography>
                            </Box>
                        )
                )}
            {customization.frontSide?.numbers?.some((e) => e.number) &&
                customization.frontSide.numbers.map(
                    (each, index) =>
                        each.number && (
                            <Box key={`front-number-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Front Number {index + 1}:
                                </Typography>
                                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                    {each.number}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+3.99)
                                </Typography>
                            </Box>
                        )
                )}

            {/* BACK */}
            {customization.backSide?.logos?.some((e) => e.logoUrl) &&
                customization.backSide.logos.map(
                    (each, index) =>
                        each.logoUrl && (
                            <Box key={`back-logo-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Back Logo {index + 1}:
                                </Typography>
                                <img
                                    src={each.logoUrl}
                                    alt={`Back Logo ${index + 1}`}
                                    style={{ width: 24, height: 24, marginLeft: 8 }}
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+4.99)
                                </Typography>
                            </Box>
                        )
                )}
            {customization.backSide?.texts?.some((e) => e.text) &&
                customization.backSide.texts.map(
                    (each, index) =>
                        each.text && (
                            <Box key={`back-text-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Back Text {index + 1}:
                                </Typography>
                                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                    {each.text}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+3.99)
                                </Typography>
                            </Box>
                        )
                )}
            {customization.backSide?.numbers?.some((e) => e.number) &&
                customization.backSide.numbers.map(
                    (each, index) =>
                        each.number && (
                            <Box key={`back-number-${index}`} display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="medium">
                                    Back Number {index + 1}:
                                </Typography>
                                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                    {each.number}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                                    (+3.99)
                                </Typography>
                            </Box>
                        )
                )}

            {/* Otros detalles */}
            {customization.materials !== "None" && (
                <Typography>Materials: {customization.materials}</Typography>
            )}
            {customization.neck !== "Default" && (
                <Typography>Neck: {customization.neck}</Typography>
            )}
            {customization.pants !== "None (+$0.00)" && (
                <Typography>Pants: {customization.pants}</Typography>
            )}
            {customization.shorts !== "No Shorts (+$0.00)" && (
                <Typography>Shorts: {customization.shorts}</Typography>
            )}
            {customization.socks !== "No Socks (+$0.00)" && (
                <Typography>Socks: {customization.socks}</Typography>
            )}
        </Box>
    );
}
