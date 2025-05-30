import { CreateProduct, Product } from "@/features/products/types";
import {
  createProduct,
  deleteProductById,
  fetchProducts,
  updateProduct,
} from "@/api/products";

import { resetMockData } from "../__mocks__/fetchMock";

const newProduct: CreateProduct = {
  description: "Apple Watch",
  price: 1099,
  stock: 6,
  categories: [],
};

describe("Product API", () => {
  beforeEach(() => {
    resetMockData();
  });

  it("should fetch all products", async () => {
    const products = await fetchProducts();
    expect(products).toHaveLength(2);
  });

  it("should create a new product", async () => {
    await createProduct(newProduct);
    const products = await fetchProducts();
    expect(products).toHaveLength(3);
    expect(
      products.find((p: Product) => p.description === "Apple Watch")?.price
    ).toBe(1099);
  });

  it("should update a product", async () => {
    const created = await createProduct(newProduct);
    await updateProduct({ ...created, price: 500 });

    const updated = (await fetchProducts()).find(
      (p: Product) => p.id === created.id
    );
    expect(updated?.price).toBe(500);
  });

  it("should delete a product", async () => {
    const created = await createProduct(newProduct);
    await deleteProductById(created.id);

    const products = await fetchProducts();
    expect(products.find((p: Product) => p.id === created.id)).toBeUndefined();
  });
});
