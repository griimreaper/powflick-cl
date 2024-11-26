import { mainApi } from "../apis";

export const getSearch = async () => {
  let queryString = `/products?page=${1}&limit=${300}`;

  try {
    const response = await mainApi.get(queryString);

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};


