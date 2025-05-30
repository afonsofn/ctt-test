import * as api from "@/api/products";

import {
  addProduct,
  deleteProduct,
  editProduct,
  loadProducts,
} from "@/features/products/store/actions/productActions";

import { Product } from "@/features/products/types";
import { cacheClient } from "@/cache";

jest.mock("../../../../../api/products");
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Product Actions", () => {
  const dispatch = jest.fn();

  const mockProducts: Product[] = [
    { id: "1", description: "iPhone", price: 1000, stock: 10, categories: [] },
    { id: "2", description: "MacBook", price: 2000, stock: 5, categories: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    cacheClient.clearAll();
  });

  describe("loadProducts", () => {
    it("dispatches cached products if available", async () => {
      cacheClient.set("products", mockProducts);

      await loadProducts()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: "SET_PRODUCTS",
        payload: mockProducts,
      });
      expect(api.fetchProducts).not.toHaveBeenCalled();
    });

    it("fetches and dispatches products if not cached", async () => {
      (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

      await loadProducts()(dispatch);

      expect(api.fetchProducts).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: "SET_PRODUCTS",
        payload: mockProducts,
      });
    });
  });

  describe("deleteProduct", () => {
    it("calls API, dispatches action and clears cache", async () => {
      (api.deleteProductById as jest.Mock).mockResolvedValue("1");
      cacheClient.set("products", mockProducts);

      await deleteProduct("1")(dispatch);

      expect(api.deleteProductById).toHaveBeenCalledWith("1");
      expect(dispatch).toHaveBeenCalledWith({
        type: "DELETE_PRODUCT",
        payload: "1",
      });
      expect(cacheClient.get("products")).toBeNull();
    });
  });

  describe("addProduct", () => {
    it("calls API, dispatches action and clears cache", async () => {
      const newProduct = {
        id: "3",
        description: "iPad",
        price: 500,
        stock: 7,
        categories: [],
      };
      (api.createProduct as jest.Mock).mockResolvedValue(newProduct);

      await addProduct(newProduct)(dispatch);

      expect(api.createProduct).toHaveBeenCalledWith(newProduct);
      expect(dispatch).toHaveBeenCalledWith({
        type: "ADD_PRODUCT",
        payload: newProduct,
      });
      expect(cacheClient.get("products")).toBeNull();
    });
  });

  describe("editProduct", () => {
    it("calls API, dispatches action and clears cache", async () => {
      const updatedProduct = {
        id: "1",
        description: "iPhone 14",
        price: 1200,
        stock: 8,
        categories: [],
      };
      (api.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);

      await editProduct(updatedProduct)(dispatch);

      expect(api.updateProduct).toHaveBeenCalledWith(updatedProduct);
      expect(dispatch).toHaveBeenCalledWith({
        type: "UPDATE_PRODUCT",
        payload: updatedProduct,
      });
      expect(cacheClient.get("products")).toBeNull();
    });
  });
});
