"use client";

import Card from "@mui/material/Card";
import * as yup from "yup";
// STYLED COMPONENTS
import { FreeDesign } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";

// ================================================================
interface Props {
    id: string;
    freeDesign: FreeDesign,
};
// ================================================================

export default function FreeDesignDetail({ id, freeDesign }: Props) {
    const { profile } = useDashboardStore();
    const router = useRouter();

    const {
        addNames,
        addNumbers,
        color,
        createdAt,
        email,
        teamName,
        fullName,
        logos,
        otherImages,
        primaryColors,
        secondaryColors,
        sport,
        date,
        description,
        organization,
        phone
    } = freeDesign;


    return (
        <Card className="p-3">
        </Card>
    );
}
