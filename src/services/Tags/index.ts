import { Filters } from "pages-sections/vendor-dashboard/tags/page-view";
import { mainApi } from "../apis";

export const getTags = async () => {
    try {
        const response: any = await mainApi.get("/tags");

        return response.data;
    } catch (error: any) {
        console.error("Error getting tags:", error);
        throw error.response.data.message;
    }
}

export const getOneTags = async (id: string) => {
    try {
        const response: any = await mainApi.get("/tags/" + id);

        return response.data;
    } catch (error: any) {
        console.error("Error getting Tag:", error);
        throw error.response.data.message;
    }
}

export const createTags = async (values: any, token:string) => {
    try {
        const response: any = await mainApi.post("/tags/create-with-products", values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error creating Tags:", error);
        throw error.response.data.message;
    }
}

export const updateTags = async (id: string, values: any, token:string) => {
    try {
        const response: any = await mainApi.put("/tags/" + id + '/products', values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating Tags:", error);
        throw error.response.data.message;
    }
}

export const deleteTags = async (id: string, token: string) => {
    try {
        const response: any = await mainApi.delete("/tags/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error deleting Tags:", error);
        throw error.response.data.message;
    }
}

export const getAllTags = async (filters: Filters, token: string) => {
    try {
        // Construir manualmente la cadena de consulta
        const queryParams = new URLSearchParams();

        if (filters.page) queryParams.append("page", String(filters.page));
        if (filters.limit) queryParams.append("limit", String(filters.limit));
        if (filters.search) queryParams.append("search", filters.search);

        const queryString = queryParams.toString(); // Convierte a "page=1&limit=10&search=value"

        const response: any = await mainApi.get(`/tags/admin/get${queryString ? `?${queryString}` : ''}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error getting Tags:", error);
        throw error.response?.data?.message || "Unexpected error occurred";
    }
};
