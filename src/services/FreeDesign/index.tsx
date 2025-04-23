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