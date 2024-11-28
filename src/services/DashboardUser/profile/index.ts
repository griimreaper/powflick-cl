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
