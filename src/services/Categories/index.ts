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
