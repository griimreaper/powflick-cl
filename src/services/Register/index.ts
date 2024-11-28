import { mainApi } from "../apis"

export const registerUser = async (data: any) => {
    try {
        const response = await mainApi.post('/users/register', {...data, provider: 'none'});
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}