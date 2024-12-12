import { Review } from "models/types";
import { mainApi } from "../../apis";

export const getReviewsAdmin = async (filters: any, token: string) => {
  let query = '/reviews/admin?'

  if (filters) {
    query += `limit=${filters.limit ?? 8}&page=${filters.page ?? 1}&`
    if (filters.isActive) {
      query += `isActive=${filters.isActive}&`
    }
    if (filters.type) {
      query += `type=${filters.type}&`
    }
    if (filters.rating) {
      query += `rating=${filters.rating}&`
    }
    if (filters.search) {
      query += `search=${filters.search}`
    }

  }
  try {
    const response = await mainApi.get(query, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

interface updateReview extends Partial<Review>{
  reviewId: string;
}

export const updateReview = async (data: updateReview, token: string) => {
  try {
    const response = await mainApi.patch("/reviews/update", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating status review:", error);
    throw error;
  }
};

export const deleteReview = async (id: string, token: string) => {
  try {
    const response = await mainApi.delete("/reviews/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating status review:", error);
    throw error;
  }
};