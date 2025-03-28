import { mainApi } from "services/apis";

export const serverCacheReset = async () => {
    try {
        const response: any = await mainApi.get("/cacheReset");

        return response.data;
    } catch (error: any) {
        console.error("Error reseting cache:", error);
        throw error.response.data.message;
    }
}

export const serverCacheDetailReset = async (slug: string) => {
    try {
        const response: any = await mainApi.get("/cacheReset/detail/" + slug);

        return response.data;
    } catch (error: any) {
        console.error("Error reseting cache detail:", error);
        throw error.response.data.message;
    }
}
