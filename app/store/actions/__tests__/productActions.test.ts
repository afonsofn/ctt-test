import * as api from "../../../api/products";

import { Product } from "../../../features/products/types";
import { loadProducts } from "../productActions";
import { store } from "../../index";

jest.mock("../../../api/products");

describe("productActions", () => {
  it("should dispatch SET_PRODUCTS after loading products", async () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        stock: 5,
        description: "Test 1",
        categories: ["c1"],
        price: 10,
      },
    ];
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    await store.dispatch<any>(loadProducts());

    const state = store.getState();
    expect(state.product.items).toEqual(mockProducts);
  });
});
