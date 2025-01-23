import { mainApi } from "../apis";

export const createOrder = async (
  token: string,
  body: any,
  directionId: string,
  Currency: string,
  CurrencyValue: number,
  couponId?: string
) => {
  try {
    const addProductsToShoppingCart = await mainApi.post(
      "/shopping-cart/bulk",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (addProductsToShoppingCart.data.statusCode === 200) {
      const creatingOrder = await mainApi.post(
        "/orders",
        { directionId, couponId },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            Currency,
            CurrencyValue,
          },
        }
      );

      return creatingOrder.data.urlBuy;
    }
  } catch (error) {
    console.error("Error generating order:", error);
    throw error;
  }
};
