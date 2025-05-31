import { Product } from "@/features/products/types";

export interface EditProductModalProps {
  product: Product;
  openModal: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
