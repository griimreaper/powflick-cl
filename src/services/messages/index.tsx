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

export const addConversation = async (message: string, messageId: string) => {
  try {
    const response = await mainApi.post(`/messages/${messageId}/conversations`, {text: message});

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
