import { mainApi } from "../apis"

export const registerUser = async (data: any, provider: string) => {
    try {
        const response = await mainApi.post('/users/register', {...data, provider});
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}