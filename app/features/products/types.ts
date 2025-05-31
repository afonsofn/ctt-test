export interface Product {
  id: string;
  stock: number;
  description: string;
  categories: string[];
  price: number;
}

export interface CreateProduct {
  stock: number;
  description: string;
  categories: string[];
  price: number;
}
