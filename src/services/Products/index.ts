import { mainApi } from "../apis";

export const getProductsBySlug = async (slug: string) => {
    try {
        const response = await mainApi.get(`/detail/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

export const getAllProductSlugs = async () => {
    try {
        const response = await mainApi.get(`/products/all/productsSlugs`);

        return response.data;
    } catch (error) {
        console.error("Error faving product:", error);
        throw error;
    }
};