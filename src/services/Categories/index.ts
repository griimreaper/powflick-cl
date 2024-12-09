import { Filters } from "pages-sections/vendor-dashboard/categories/page-view";
import { mainApi } from "../apis";

export const getCategories = async () => {
    try {
        const response: any = await mainApi.get("/categories");

        return response.data;
    } catch (error: any) {
        console.error("Error getting categories:", error);
        throw error.response.data.message;
    }
}

export const getOneCategory = async (id: string) => {
    try {
        const response: any = await mainApi.get("/categories/" + id);

        return response.data;
    } catch (error: any) {
        console.error("Error getting categories:", error);
        throw error.response.data.message;
    }
}

export const createCategory = async (values: any, token:string) => {
    try {
        const response: any = await mainApi.post("/categories/create-with-products", values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error creating categories:", error);
        throw error.response.data.message;
    }
}

export const updateCategory = async (id: string, values: any, token:string) => {
    try {
        const response: any = await mainApi.put("/categories/" + id + '/products', values, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating categories:", error);
        throw error.response.data.message;
    }
}

export const deleteCategory = async (id: string, token: string) => {
    try {
        const response: any = await mainApi.delete("/categories/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error deleting categories:", error);
        throw error.response.data.message;
    }
}

export const getAllCategories = async (filters: Filters, token: string) => {
    try {
        // Construir manualmente la cadena de consulta
        const queryParams = new URLSearchParams();

        if (filters.page) queryParams.append("page", String(filters.page));
        if (filters.limit) queryParams.append("limit", String(filters.limit));
        if (filters.search) queryParams.append("search", filters.search);

        const queryString = queryParams.toString(); // Convierte a "page=1&limit=10&search=value"

        const response: any = await mainApi.get(`/categories/admin${queryString ? `?${queryString}` : ''}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error getting categories:", error);
        throw error.response?.data?.message || "Unexpected error occurred";
    }
};
