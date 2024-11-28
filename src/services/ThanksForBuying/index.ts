import { mainApi } from "../apis";

export const getOrder = async (id: any, token: string) => {
    try {
      const response = await mainApi.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };