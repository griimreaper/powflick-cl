import { mainApi } from "../apis";

export const createFreeDesign = async (values: any): Promise<any> => {
    try {

        const { data } = await mainApi.post(
            "/free-design/create",
            values,
        );

        return data
    } catch (error) {
        console.error("Error creating design:", error);
    }
}

export const getFreeDesign = async (token: string, filters: any) => {
    try {
        let query = `/free-design?page=${filters.page}&limit=${filters.limit}&`

        if (filters) {
            if (filters.order) {
                query += `order=${filters.order}&`
            }
            if (filters.filterBy) {
                query += filters.filterBy === 'name' ? 'filter=name&' : 'filter=email&'
            }
            if (filters.search) {
                query += `search=${filters.search}`
            }
        }

        const response = await mainApi.get(query, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
}

export const getOneFreeDesign = async (token: string, id: string) => {
    try {
        const response = await mainApi.get("/free-design/" + id, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
}