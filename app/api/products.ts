import { Product } from "../features/products/types";

let mockProducts: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockProducts]), 200);
  });
};

export const createProduct = async (product: Product): Promise<Product> => {
  mockProducts.push(product);
  return new Promise((resolve) => {
    setTimeout(() => resolve(product), 200);
  });
};

export const updateProduct = async (updated: Product): Promise<Product> => {
  mockProducts = mockProducts.map((p) => (p.id === updated.id ? updated : p));
  return new Promise((resolve) => {
    setTimeout(() => resolve(updated), 200);
  });
};

export const deleteProduct = async (id: string): Promise<string> => {
  mockProducts = mockProducts.filter((p) => p.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 200);
  });
};
