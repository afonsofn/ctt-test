import { Product } from "../../../features/products/types";
import { ProductState } from "../types";
import { productReducer } from "../productReducer";

describe("productReducer", () => {
  const initialState: ProductState = { items: [] };

  const product: Product = {
    id: "1",
    stock: 10,
    description: "Test Product",
    categories: ["cat1"],
    price: 19.99,
  };

  it("should handle SET_PRODUCTS", () => {
    const nextState = productReducer(initialState, {
      type: "SET_PRODUCTS",
      payload: [product],
    });

    expect(nextState.items).toEqual([product]);
  });

  it("should handle ADD_PRODUCT", () => {
    const nextState = productReducer(initialState, {
      type: "ADD_PRODUCT",
      payload: product,
    });

    expect(nextState.items).toEqual([product]);
  });

  it("should handle UPDATE_PRODUCT", () => {
    const stateWithItem = { items: [product] };

    const updated = { ...product, stock: 20 };
    const nextState = productReducer(stateWithItem, {
      type: "UPDATE_PRODUCT",
      payload: updated,
    });

    expect(nextState.items[0].stock).toBe(20);
  });

  it("should handle DELETE_PRODUCT", () => {
    const stateWithItem = { items: [product] };

    const nextState = productReducer(stateWithItem, {
      type: "DELETE_PRODUCT",
      payload: "1",
    });

    expect(nextState.items).toEqual([]);
  });
});
