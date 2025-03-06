import { mainApi } from "../apis";

export const getLanding = async () => {
    try {
        const response: any = await mainApi.get("/landing");

        return response.data;
    } catch (error) {
        console.error("Error getting posts:", error);
        return { };
    }
}

export const getNavbar = async () => {
    try {
        const response: any = await mainApi.get("/navbar");

        return response.data;
    } catch (error) {
        console.error("Error getting posts:", error);
        return { };
    }
}
