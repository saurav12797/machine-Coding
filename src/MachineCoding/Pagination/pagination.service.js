import { GET_PRODUCTS } from "./ApiRoute";

export const getProducts = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const url = `${GET_PRODUCTS}?${queryString}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
