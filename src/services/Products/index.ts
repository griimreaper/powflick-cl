import { mainApi } from "../apis";

export const getProductsBySlug = async (slug: string) => {
    try {
        const response = await mainApi.get(`/detail/${slug}`);

        console.log("Slugs:", response.data);
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

export const getAllCategories = async () => {
    try {
        const response = await mainApi.get("/categories");

        return response.data.map((c: any) => c = c.name);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const searchByTitle = async (search: string) => {
    try {
        const response = await mainApi.get("/products/all/Titles?search=" + search);

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getProducts = async (
    currentPage: number,
    sports?: string,
    categories?: string,
    collection?: string,
    tag?: string,
    gender?: string,
    colors?: string,
    featured?: boolean,
    mostSold?: boolean,
    discount?: boolean,
    order?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    limit?: number
) => {
    try {
        let queryString = `/products?page=${currentPage}&limit=${limit ?? 9}`;

        // Agregar los parámetros a la cadena de consulta solo si tienen un valor no vacío
        if (sports) queryString += `&sport=${sports}`;
        if (categories) queryString += `&category=${categories}`;
        if (collection) queryString += `&collection=${collection}`;
        if (tag) queryString += `&tag=${tag}`;
        if (gender) queryString += `&gender=${gender}`;
        if (colors) queryString += `&color=${colors}`;
        if (featured) queryString += `&featured=${featured}`;
        if (mostSold) queryString += `&mostSold=${mostSold}`;
        if (order) queryString += `&order=${order}`;
        if (search) queryString += `&search=${search}`;
        if (discount) queryString += `&discount=${discount}`;
        if (minPrice) queryString += `&minPrice=${minPrice}`;
        if (maxPrice) queryString += `&maxPrice=${maxPrice}`;

        const response = await mainApi.get(queryString);

        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};