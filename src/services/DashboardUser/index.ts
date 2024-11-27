import { mainApi } from "../apis";

export const getProfile = async (token: string) => {
  try {
    const response = await mainApi.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
};
