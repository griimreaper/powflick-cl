import { Filters } from "@/app/dashboard-admin/reviews/interfaces";
import { mainApi } from "../../apis";

export const getReviewsAdmin = async (filters: Filters, token: string) => {
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

interface ActiveOrInactiveReview {
  reviewId: string;
  isActive: boolean;
}

export const statusReview = async (data: ActiveOrInactiveReview, token: string) => {
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