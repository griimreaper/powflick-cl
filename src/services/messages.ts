import { mainApi } from "./apis";

export const sendMessage = async (data: {
  username: string;
  email: string;
  message: string;
  category: string;
}) => {
  try {
    return await mainApi.post("/messages", data);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// ...existing code...
