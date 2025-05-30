import { CreateProduct, Product } from "@/features/products/types";

const API_URL = "http://localhost:4000/api/products";

export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProduct = async (product: CreateProduct) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (product: Product) => {
  const res = await fetch(`${API_URL}/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProductById = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
};
