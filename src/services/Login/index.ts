import { mainApi } from "../apis";

export const login = async (email: string, password: string | null) => {
  try {
    const response = await mainApi.post("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const recoverPassword = async (email: string) => {
  try {
    const response = await mainApi.patch("/auth/recoverPassword", {
      email
    });
    return response
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw error.response.data;
  }
}

export const resetPassword = async (password: string, token: string) => {
  try {
    const response = await mainApi.patch("/auth/resetPassword", { password }, {
        headers: {
          "x-token": `${token}`,
        }
      });
    return response
  } catch (error) {
    console.error("Error to change password:", error);
    throw error;
  }
}

export const validateToken = async (token: string) => {
  try {
    const response = await mainApi.get("/auth/token/" + token);

    return response.data
  } catch (error) {
    console.error("Error to change password:", error);
    throw error;
  }
}