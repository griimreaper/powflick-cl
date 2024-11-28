import { Direction } from "models/types";
import { mainApi } from "../apis";

export const allDirections = async (token: string) => {
  try {
    const response = await mainApi.get("/directions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving directions:", error);
    throw error;
  }
};

export const createDirection = async (token: string, body: any) => {
  try {
    const response = await mainApi.post("/directions", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating directions:", error);
    throw error;
  }
};

export const updateDirection = async (
  token: string,
  body: Partial<Direction>
) => {
  try {
    const response = await mainApi.patch(`/directions`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating direction:", error);
    throw error;
  }
};

export const deleteDirection = async (
  token: string,
  directionId: string,
) => {
  try {
    const response = await mainApi.delete(`/directions/` + directionId , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating direction:", error);
    throw error;
  }
};
