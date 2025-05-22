import { CustomAxiosRequestConfig, mainApi } from "../../apis";

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

export const getUserAddress = async (token: string) => {
  try {
    const config: CustomAxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      skipAuthInterceptor: true,
    };

    const { data } = await mainApi.get("/directions", config);
    return data.direction;
  } catch (error) {
    console.error("Error getting address:", error);
    throw error;
  }
};