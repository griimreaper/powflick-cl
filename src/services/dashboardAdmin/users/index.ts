import { Filters } from "@/app/dashboard-admin/users/interfaces";
import { mainApi } from "../../apis";

export const getUsers = async (filters: Filters, token: string) => {
  let query = '/users?'

  if (filters) {
    query += `limit=${filters.limit}&page=${filters.page}&`
    if (filters.order) {
      query += `order=${filters.order}&`
    }
    if (filters.isActive) {
      query += `isActive=${filters.isActive}&`
    }
    if (filters.rol) {
      query += `role=${filters.rol}&`
    }
    if (filters.filter) {
      query += `filter=${filters.filter}&`
    }
    if (filters.search) {
      query += `search=${filters.search}`
    }
  }

  try {
    const response = await mainApi.get(query, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const updateUser = async (id: string, data: any, token: string) => {
  try {
    const response = await mainApi.patch(`/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};