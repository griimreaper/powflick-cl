import { mainApi } from "../apis";

export const createOrder = async (
  token: string,
  body: any,
  directionId: string,
  Currency: string,
  CurrencyValue: number,
  couponId?: string,
  note?: string // Añadir el campo note
) => {
  try {
    const creatingOrder = await mainApi.post(
      "/orders",
      {
        directionId,
        couponId,
        note,
        cartProducts: body.cartProducts,
        total: body.total,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Currency,
          CurrencyValue,
        },
      }
    );

    return creatingOrder.data.urlBuy;
  } catch (error) {
    console.error("Error generating order:", error);
    throw error;
  }
};
