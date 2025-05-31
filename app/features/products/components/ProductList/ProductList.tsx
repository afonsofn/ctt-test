import { AppDispatch, RootState } from "@/features/products/store";
import React, { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  loadProducts,
} from "@/features/products/store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import DeleteProductModal from "@/features/products/components/ProductList/components/DeleteProductModal/DeleteProductModal";
import EditProductModal from "@/features/products/components/ProductList/components/EditProductModal/EditProductModal";
import { Product } from "@/features/products/types";
import ProductTable from "@/features/products/components/ProductList/components/ProductTable/ProductTable";
import { useToast } from "@/components/Toast/ToastProvider";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.items);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const handleEdit = useCallback((product: Product) => {
    setProductToEdit(product);
  }, []);

  const handleDelete = useCallback((product: Product) => {
    setProductToDelete(product);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!productToDelete?.id) return;

    try {
      setLoading(true);
      await dispatch(deleteProduct(productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      showToast("Failed to delete product. Please try again.", "error");
    } finally {
      setLoading(false);
      showToast("Product deleted successfully!");
    }
  }, [dispatch, productToDelete]);

  return (
    <>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {productToEdit && (
        <EditProductModal
          openModal
          product={productToEdit}
          onConfirm={() => setProductToEdit(null)}
          onCancel={() => setProductToEdit(null)}
        />
      )}

      {productToDelete?.id && (
        <DeleteProductModal
          openModal
          loading={loading}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </>
  );
};

export default ProductList;
