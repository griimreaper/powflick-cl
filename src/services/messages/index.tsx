import { mainApi } from "../apis";

export const postMessages = async (message: any) => {
  try {
    const response = await mainApi.post("/messages", message);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const addConversation = async (message: string, messageId: string, from: string, token: string) => {
  try {
    const response = await mainApi.post(`/messages/${messageId}/conversations`, {text: message, from}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
