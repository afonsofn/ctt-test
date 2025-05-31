export interface ProductFormProps {
  saveButtonLabel: string;
  cancelButtonLabel?: string;
  description: string;
  price: string;
  stock: string;
  categories: string[];
  error: string;
  loading?: boolean;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStockChange: (value: string) => void;
  onCategoriesChange: (categories: string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}
