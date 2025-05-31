import { CreateProduct, Product } from "@/features/products/types";
import {
  createProduct,
  deleteProductById,
  fetchProducts,
  updateProduct,
} from "@/api/products";

import { Dispatch } from "redux";
import { cacheClient } from "@/cache";

const CACHE_KEY = "products";

export const loadProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const cached = cacheClient.get<Product[]>(CACHE_KEY);
      if (cached) {
        dispatch({ type: "SET_PRODUCTS", payload: cached });
        return;
      }

      const products = await fetchProducts();
      dispatch({ type: "SET_PRODUCTS", payload: products });
      cacheClient.set(CACHE_KEY, products);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteProductById(productId);
      dispatch({ type: "DELETE_PRODUCT", payload: productId });
      cacheClient.clear(CACHE_KEY);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };
};

export const addProduct = (product: CreateProduct) => {
  return async (dispatch: Dispatch) => {
    try {
      const newProduct = await createProduct(product);
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
      cacheClient.clear(CACHE_KEY);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    try {
      const updatedProduct = await updateProduct(product);
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      cacheClient.clear(CACHE_KEY);
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };
};
