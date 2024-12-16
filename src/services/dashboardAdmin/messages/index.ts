import { mainApi } from "../../apis";

export const getMessages = async (token: string, filters: any) => {
    try {
        let query = `/messages?page=${filters.page}&limit=${filters.limit}&`

        if (filters) {
            if (filters.category) {
                query += `category=${filters.category}&`;
            }
            if (filters.orderByDate) {
                query += filters.orderByDate === 'ASC' ? 'desc=true&' : 'desc=false&'
            }
            if (filters.showAnswered !== null) {
                query += filters.showAnswered === 'true' ? 'answered=true&' : 'answered=false&';
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

export const getOneMessage = async (id: string, token: string) => {
    try {
        const response = await mainApi.get('/messages/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
}

export const getCategoryTotals = async (token: string) => {
    try {
        const response = await mainApi.get('/messages/category/totals', {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error getting messages category:", error);
        throw error
    }
}

export const answerMessage = async (id: string, answer: string, token: string) => {
    try {
        const response = await mainApi.patch(`/messages/` + id, { response: answer }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
}