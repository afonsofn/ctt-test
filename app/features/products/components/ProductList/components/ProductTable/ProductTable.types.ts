import { Product } from "@/features/products/types";

export interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}
