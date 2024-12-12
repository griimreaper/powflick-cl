import { mainApi } from "../../apis";

export const getAllOrders = async (token: string, filters: any) => {
    try {
        let query = '/orders?'

        if (filters) {
            query += `limit=${filters.limit}&page=${filters.page}&`
            if (filters.order) {
                query += `order=${filters.order}&`
            }
            if (filters.status) {
                query += `status=${filters.status}&`
            }
            if (filters.filterBy) {
                query += `searchBy=${filters.filterBy}&`
            }
            if (filters.search) {
                query += `searchTerm=${filters.search}`
            }
        }

        const response = await mainApi.get(query, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting orders:", error);
        throw error;
    }
}

export const getOrder = async (orderId: string, token: string) => {
    try {
        const response = await mainApi.get(`/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting order:", error);
        throw error;
    }
}

export const updateOrder = async (body: { orderId: string, state: string, note: string, directionId: string }, token: string) => {
    try {
        const response = await mainApi.patch(`/orders`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
}
