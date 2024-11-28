import { mainApi } from "../apis";

export const postReview = async (data: any, token: string) => {
    try {
        console.log(data);
        
        const response = await mainApi.post("/reviews", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
}