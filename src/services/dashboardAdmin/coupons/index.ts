import { mainApi } from "../../apis";

export const getCoupons = async () => {
  const { data } = await mainApi.get("/coupon");
  return data;
};

export const getAllCouponsAdmin = async (filters: any, token: string) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.page) queryParams.append("page", String(filters.page));
    if (filters.limit) queryParams.append("limit", String(filters.limit));
    if (filters.search) queryParams.append("search", filters.search);

    const queryString = queryParams.toString();

    const response = await mainApi.get(`/coupon/admin/get${queryString ? `?${queryString}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error getting influencers (admin):", error);
    throw error.response?.data?.message || "Unexpected error";
  }
};

export const getCouponByCode = async (code: string, token: string) => {
  try {
    console.log('hola2');
    
    const response = await mainApi.get(`/coupon/code/${code}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    console.log(response.data, 'response');
    
    return response.data;
  } catch (error: any) {
    // Devuelve el mensaje de error del backend si existe, si no uno genérico
    throw error?.response?.data?.message || "Error fetching coupon";
  }
};

export const getCouponById = async (id: string) => {
  try {
    const { data } = await mainApi.get(`/coupon/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error fetching coupon by id:", error);
    throw error?.response?.data?.message || "Error fetching coupon";
  }
};

export const createCouponUser = async (
  body: any,
  token: string,
  title: string
) => {
  const response = await mainApi.post("/coupon/coupon-users", body, {
    headers: { Authorization: `Bearer ${token}` },
    params: { title },
  });
  return response.data;
};

export const updateCouponUser = async (
  couponUserId: string,
  body: any,
  token: string
) => {
  const response = await mainApi.patch(
    `/coupon/coupon-users/${couponUserId}`,
    body,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteCouponUser = async (couponUserId: string, token: string) => {
  const response = await mainApi.delete(
    `/coupon/coupon-users/${couponUserId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteCoupon = async (id: string, token: string) => {
  try {
    const response = await mainApi.delete(`/coupon/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error deleting coupon:", error);
    throw error?.response?.data?.message || "Error deleting coupon";
  }
};


export const updateCoupon = async (id: string, body: any) => {
  try {
    // body debe incluir el campo type: 'amount' | 'percent'
    const response = await mainApi.patch("/coupon/" + id, body);

    return response.data;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
};

