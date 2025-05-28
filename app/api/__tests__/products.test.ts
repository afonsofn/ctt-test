import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../products";

import { Product } from "../../features/products/types";

const sample: Product = {
  id: "abc-123",
  stock: 5,
  description: "Test",
  categories: ["c1"],
  price: 10,
};

describe("products API", () => {
  it("should create and fetch product", async () => {
    await createProduct(sample);
    const products = await fetchProducts();
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe(sample.id);
  });

  it("should update a product", async () => {
    const updated = { ...sample, stock: 10 };
    await updateProduct(updated);
    const products = await fetchProducts();
    expect(products[0].stock).toBe(10);
  });

  it("should delete a product", async () => {
    await deleteProduct(sample.id);
    const products = await fetchProducts();
    expect(products).toHaveLength(0);
  });
});
