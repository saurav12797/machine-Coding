import { GET_PRODUCTS } from "../../Shared/apiRoute";

export const getProductDetails = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${GET_PRODUCTS}?${queryString}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    throw error;
  }
};
