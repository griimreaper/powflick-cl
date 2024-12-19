import { mainApi } from "../apis";
import { Customization } from "@/global interfaces";

export const getPDF = async (product: any, customization: Customization, orderId?: string | null) => {
    try {
        const { data } = await mainApi.post('/pdf/buffer', { product, customization, orderId })
        return data.data;
    } catch (error) {
        console.error('Error get Pdf: ', error)
    }
}