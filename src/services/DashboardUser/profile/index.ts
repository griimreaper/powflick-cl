import { mainApi } from "../../apis";

export const userUpdateProfile = async (token: string, data: any) => {
  try {
    const response = await mainApi.patch("/users/update", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const updatePassword = async (token: string, data: any) => {
  try {
    const response = await mainApi.patch("/auth/changePassword", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
};

export const getUserOrders = async (token: string) => {
  try {
    const { data } = await mainApi.get("/orders/by/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}