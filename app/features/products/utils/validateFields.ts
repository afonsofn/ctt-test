import { Product } from "@/features/products/types";

const isEmptyField = (
  desc: string,
  price: number,
  stock: number,
  categories: string[]
): boolean => {
  return (
    !desc.trim() || isNaN(price) || isNaN(stock) || categories.length === 0
  );
};

const hasInvalidValues = (price: number, stock: number): boolean => {
  return price <= 0 || stock <= 0;
};

const isDuplicateDescription = (desc: string, products: Product[]) => {
  return products.some(
    (p) => p.description.toLowerCase() === desc.trim().toLowerCase()
  );
};

export const validateFields = (
  desc: string,
  price: number,
  stock: number,
  categories: string[],
  products: Product[],
  isEdit: boolean = false
): string | null => {
  if (isEmptyField(desc, price, stock, categories)) {
    return "All fields are required.";
  }

  if (hasInvalidValues(price, stock)) {
    return "Price and stock must be greater than zero.";
  }

  if (!isEdit && isDuplicateDescription(desc, products)) {
    return "A product with this description already exists.";
  }

  return null;
};
