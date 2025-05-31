import "./ProductForm.css";

import Button from "@/components/Button/Button";
import { CATEGORIES } from "../../constants/categories";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import { ProductFormProps } from "./ProductForm.types";
import React from "react";
import { formatPrice } from "@/features/products/utils";

const ProductForm = React.memo((props: ProductFormProps) => {
  const {
    saveButtonLabel,
    cancelButtonLabel,
    description,
    price,
    stock,
    categories,
    error,
    loading,
    onDescriptionChange,
    onPriceChange,
    onStockChange,
    onCategoriesChange,
    onSubmit,
    onCancel,
  } = props;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatPrice(e.target.value);
    onPriceChange(masked);
  };

  return (
    <section className="product-form-wrapper">
      <form
        data-testid="product-form"
        className="product-form"
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            data-testid="description-input"
            id="description-input"
            value={description}
            placeholder="Apple Watch"
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            data-testid="price-input"
            id="price-input"
            type="decimal"
            placeholder="€ 790,00"
            value={price}
            onChange={handlePriceChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            data-testid="stock-input"
            id="stock-input"
            type="number"
            placeholder="15"
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
          />
        </div>

        <MultiSelect
          options={CATEGORIES}
          selected={categories}
          onChange={onCategoriesChange}
          label="Categories"
          placeholder="Select categories"
        />

        <div className="buttons-wrapper">
          {cancelButtonLabel && (
            <Button
              data-testid="product-form-cancel-button"
              id="product-form-cancel-button"
              variant="secondary"
              type="button"
              onClick={onCancel}
            >
              {cancelButtonLabel}
            </Button>
          )}
          <Button
            loading={loading}
            data-testid="product-form-submit-button"
            id="product-form-submit-button"
            type="submit"
          >
            {saveButtonLabel}
          </Button>
        </div>
      </form>

      {error && (
        <div data-testid="form-error" id="form-error" className="error-message">
          {error}
        </div>
      )}
    </section>
  );
});

export default ProductForm;
