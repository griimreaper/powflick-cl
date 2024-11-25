import { mainApi } from "../apis";

export const getLanding = async () => {
    try {
        const response: any = await mainApi.get("/landing");

        console.log(response.data);
        

        return response.data;
    } catch (error) {
        console.error("Error getting posts:", error);
        return { };
    }
}
