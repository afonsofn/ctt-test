import { Dispatch } from "redux";
import { fetchProducts } from "../../api/products";

export const loadProducts = () => {
  return async (dispatch: Dispatch) => {
    const products = await fetchProducts();
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };
};
