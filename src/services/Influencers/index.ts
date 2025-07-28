import { mainApi } from "../apis";

export const getInfluencers = async () => {
    try {
        const response = await mainApi.get("/influencers");
        return response.data;
    } catch (error: any) {
        console.error("Error getting influencers:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export const getOneInfluencer = async (id: string) => {
    try {
        const response = await mainApi.get(`/influencers/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error getting influencer:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export const createInfluencer = async (values: any, token: string) => {
    try {
        const response = await mainApi.post("/influencers/create-with-products", values, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating influencer:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export const updateInfluencer = async (id: string, values: any, token: string) => {
    try {
        const response = await mainApi.put(`/influencers/${id}/products`, values, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error updating influencer:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export const deleteInfluencer = async (id: string, token: string) => {
    try {
        const response = await mainApi.delete(`/influencers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error deleting influencer:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export interface InfluencerFilters {
    page?: number;
    limit?: number;
    search?: string;
}

export const getAllInfluencersAdmin = async (filters: InfluencerFilters, token: string) => {
    try {
        const queryParams = new URLSearchParams();

        if (filters.page) queryParams.append("page", String(filters.page));
        if (filters.limit) queryParams.append("limit", String(filters.limit));
        if (filters.search) queryParams.append("search", filters.search);

        const queryString = queryParams.toString();

        const response = await mainApi.get(`/influencers/admin/get${queryString ? `?${queryString}` : ""}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error getting influencers (admin):", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};

export const getInfluencerWithProducts = async (label: string) => {
    try {
        const response = await mainApi.get(`/influencers/store/${label}`); // Asumo ruta backend
        return response.data;
    } catch (error: any) {
        console.error("Error getting influencer with products:", error);
        throw error.response?.data?.message || "Unexpected error";
    }
};
