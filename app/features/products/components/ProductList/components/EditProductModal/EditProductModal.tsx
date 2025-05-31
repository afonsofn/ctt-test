import "./EditProductModal.css";

import { AppDispatch, RootState } from "@/features/products/store";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/Modal/Modal";
import { Product } from "@/features/products/types";
import ProductForm from "@/features/products/components/ProductForm/ProductForm";
import { areArraysEqual } from "@/features/products/utils/areArraysEqual";
import { editProduct } from "@/features/products/store/actions/productActions";
import { useToast } from "@/components/Toast/ToastProvider";
import { validateFields } from "@/features/products/utils";

const EditProductModal = ({
  product,
  openModal,
  onConfirm,
  onCancel,
}: {
  product: Product;
  openModal: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.items);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { showToast } = useToast();

  useEffect(() => {
    if (product && openModal) {
      setDescription(product.description);
      setPrice(product.price.toString().replace(".", ","));
      setStock(product.stock.toString());
      setCategories(product.categories);
    }
  }, [product, openModal]);

  const resetForm = () => {
    setDescription("");
    setPrice("");
    setStock("");
    setCategories([]);
    setError("");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      const desc = description.trim();
      const priceValue = Number(price.replace(",", ".")) || 0;
      const stockValue = parseInt(stock, 10) || 0;

      const errorMsg = validateFields(
        desc,
        priceValue,
        stockValue,
        categories,
        products,
        true
      );
      if (errorMsg) {
        setError(errorMsg);
        return;
      }

      const productPayload = {
        id: product.id,
        description: desc,
        price: priceValue,
        stock: stockValue,
        categories: categories,
      };

      const isUnchanged =
        product.description === desc &&
        product.price === priceValue &&
        product.stock === stockValue &&
        areArraysEqual(product.categories, categories);

      if (isUnchanged) {
        resetForm();
        onConfirm();
        return;
      }

      try {
        setLoading(true);
        await dispatch(editProduct(productPayload));
        resetForm();
        onConfirm();
      } catch (error) {
        showToast("Failed to update product. Please try again.", "error");
      } finally {
        setLoading(false);
        showToast("Product updated successfully!");
      }
    },
    [
      description,
      price,
      stock,
      categories,
      products,
      dispatch,
      onConfirm,
      product.id,
    ]
  );

  const handleCancel = useCallback(() => {
    resetForm();
    onCancel();
  }, [onCancel]);

  if (!openModal) return null;

  return (
    <Modal openModal={openModal} closeModal={handleCancel}>
      <div className="edit-modal">
        <h2 data-testid="edit-product-title">Edit Product</h2>

        <ProductForm
          saveButtonLabel="Save"
          cancelButtonLabel="Cancel"
          description={description}
          price={price}
          stock={stock}
          categories={categories}
          error={error}
          loading={loading}
          onDescriptionChange={setDescription}
          onPriceChange={setPrice}
          onStockChange={setStock}
          onCategoriesChange={setCategories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </Modal>
  );
};

export default React.memo(EditProductModal);
