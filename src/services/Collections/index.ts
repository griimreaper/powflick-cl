import { Filters } from "pages-sections/vendor-dashboard/collections/page-view";
import { mainApi } from "../apis";

export const getCollections = async () => {
    try {
        const response: any = await mainApi.get("/collection");

        return response.data;
    } catch (error: any) {
        console.error("Error getting collection:", error);
        throw error.response.data.message;
    }
}

export const getOneCollection = async (id: string) => {
    try {
        const response: any = await mainApi.get("/collections/" + id);

        return response.data;
    } catch (error: any) {
        console.error("Error getting collection:", error);
        throw error.response.data.message;
    }
}

export const createCollection = async (values: any, token:string) => {
    try {
        const response: any = await mainApi.post("/collections/create-with-products", values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error creating collection:", error);
        throw error.response.data.message;
    }
}

export const updateCollection = async (id: string, values: any, token:string) => {
    try {
        const response: any = await mainApi.put("/collections/" + id + '/products', values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating collection:", error);
        throw error.response.data.message;
    }
}

export const deleteCollection = async (id: string, token: string) => {
    try {
        const response: any = await mainApi.delete("/collections/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error deleting collection:", error);
        throw error.response.data.message;
    }
}

export const getAllCollections = async (filters: Filters, token: string) => {
    try {
        // Construir manualmente la cadena de consulta
        const queryParams = new URLSearchParams();

        if (filters.page) queryParams.append("page", String(filters.page));
        if (filters.limit) queryParams.append("limit", String(filters.limit));
        if (filters.search) queryParams.append("search", filters.search);

        const queryString = queryParams.toString(); // Convierte a "page=1&limit=10&search=value"

        const response: any = await mainApi.get(`/collections/admin/get${queryString ? `?${queryString}` : ''}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error getting collection:", error);
        throw error.response?.data?.message || "Unexpected error occurred";
    }
};
