import "./AddNewProduct.css";

import { AppDispatch, RootState } from "@/features/products/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "@/features/products/components/ProductForm/ProductForm";
import { addProduct } from "@/features/products/store/actions/productActions";
import { useToast } from "@/components/Toast/ToastProvider";
import { validateFields } from "@/features/products/utils";

const AddNewProduct = () => {
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
    if (error && (description || price || stock || categories)) {
      setError("");
    }
  }, [description, price, stock, categories]);

  const resetForm = () => {
    setDescription("");
    setPrice("");
    setStock("");
    setCategories([]);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      products
    );
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const productPayload = {
      description: desc,
      price: priceValue,
      stock: stockValue,
      categories,
    };

    try {
      setLoading(true);
      await dispatch(addProduct(productPayload));
      resetForm();
    } catch (error) {
      showToast("Failed to add product. Please try again.", "error");
    } finally {
      setLoading(false);
      showToast("Product added successfully!");
    }
  };

  return (
    <div className="new-product-wrapper">
      <h2>Add New Product</h2>

      <ProductForm
        saveButtonLabel="Add Product"
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
      />
    </div>
  );
};

export default AddNewProduct;
