import { Product } from "@/features/products/types";
import { ProductAction } from "@/features/products/store/actions/types";
import { productReducer } from "@/features/products/store/reducers/productReducer";

const initialState = {
  items: [],
};

const mockProduct: Product = {
  id: "1",
  description: "iPhone 15 Pro",
  price: 1299,
  stock: 5,
  categories: [],
};

describe("productReducer", () => {
  it("should return the initial state when action is unknown", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = productReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle SET_PRODUCTS", () => {
    const products = [mockProduct];
    const action = { type: "SET_PRODUCTS", payload: products } as ProductAction;
    const newState = productReducer(undefined, action);
    expect(newState.items).toEqual(products);
  });

  it("should handle ADD_PRODUCT", () => {
    const action = {
      type: "ADD_PRODUCT",
      payload: mockProduct,
    } as ProductAction;
    const newState = productReducer(initialState, action);
    expect(newState.items).toContainEqual(mockProduct);
  });

  it("should handle UPDATE_PRODUCT", () => {
    const updatedProduct = { ...mockProduct, stock: 10 };
    const state = { items: [mockProduct] };
    const action = {
      type: "UPDATE_PRODUCT",
      payload: updatedProduct,
    } as ProductAction;
    const newState = productReducer(state, action);
    expect(newState.items[0].stock).toBe(10);
  });

  it("should handle DELETE_PRODUCT", () => {
    const state = { items: [mockProduct] };
    const action = {
      type: "DELETE_PRODUCT",
      payload: mockProduct.id,
    } as ProductAction;
    const newState = productReducer(state, action);
    expect(newState.items).toHaveLength(0);
  });
});
