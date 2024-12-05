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

export const favProduct = async (
    token: string,
    productId: string,
    firstCall: boolean
) => {
    try {
        const response = await mainApi.post(
            `/products/fav/${productId}`,
            { firstCall },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error faving product:", error);
        throw error;
    }
};

export const allFavorites = async (token: string) => {
    try {
        const response = await mainApi.get(`/products/fav/all?limit=200&page=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error faving product:", error);
        throw error;
    }
};