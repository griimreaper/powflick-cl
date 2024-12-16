import { mainApi } from "../../apis";

export const createCoupon = async (body: any) => {
  try {
    const response = await mainApi.post("/coupon", body);

    return response.data;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
};

export const createCouponUser = async (
  token: string,
  body: any,
  title: string
) => {
  try {
    const response = await mainApi.post("/coupon/coupon-users", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        title,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating coupon user:", error);
    throw error;
  }
};
