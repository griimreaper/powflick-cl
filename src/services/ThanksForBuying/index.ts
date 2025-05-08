import { mainApi } from "../apis";

export const getOrder = async (id: any, token: string) => {
  try {
    const response = await mainApi.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    // Manejo seguro del error para evitar TypeError
    if (error?.response?.data) {
      return error.response.data;
    }
    return { status: "error", message: error?.message || "Unexpected error" };
  }
};
