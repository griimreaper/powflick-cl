import { mainApi } from "../../apis";

export const getCoupons = async () => {
  const { data } = await mainApi.get("/coupon");
  return data;
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
