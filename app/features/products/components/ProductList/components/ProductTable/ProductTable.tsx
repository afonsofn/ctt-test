import "./ProductTable.css";

import { DeleteIcon, EditIcon } from "@/components/icons";
import React, { useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import { ProductTableProps } from "./ProductTable.types";
import { getCategoryLabels } from "@/features/products/utils/categoryUtils";

export const ITEMS_PER_PAGE = 8;

const ProductTable = React.memo(
  ({ products, onEdit, onDelete }: ProductTableProps) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginated = useMemo(() => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return products.slice(start, end);
    }, [products, page]);

    const renderRows = useMemo(() => {
      return [...Array(ITEMS_PER_PAGE)].map((_, i) => {
        const product = paginated[i];

        return (
          <tr
            key={product?.id || `empty-${i}`}
            className={i % 2 === 0 ? "row-even" : "row-odd"}
            data-testid={
              product ? `product-row-${product.id}` : `product-row-empty-${i}`
            }
          >
            <td>{product?.description || ""}</td>
            <td>{product ? `€ ${product.price.toFixed(2)}` : ""}</td>
            <td>{product?.stock ?? ""}</td>
            <td>
              {product ? getCategoryLabels(product.categories).join(", ") : ""}
            </td>
            <td>
              {product && (
                <div className="buttons-wrapper">
                  <Button
                    variant="secondary"
                    small
                    onClick={() => onEdit(product)}
                    icon={<EditIcon />}
                    data-testid={`edit-product-button-${product.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    small
                    onClick={() => onDelete(product)}
                    icon={<DeleteIcon />}
                    data-testid={`delete-product-button-${product.id}`}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </td>
          </tr>
        );
      });
    }, [paginated, onEdit, onDelete]);

    return (
      <div className="product-table">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Categories</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows}</tbody>
          </table>
        </div>

        <div className="pagination">
          {page !== 1 && (
            <span
              className={`pagination-link ${page === 1 ? "disabled" : ""}`}
              onClick={() => page > 1 && setPage((p) => p - 1)}
              data-testid="pagination-prev"
            >
              Previous Page
            </span>
          )}

          <span data-testid="pagination-info">
            Page {page} of {Math.max(totalPages, 1)}
          </span>

          <span
            className={`pagination-link ${
              page >= totalPages ? "disabled" : ""
            }`}
            onClick={() => page < totalPages && setPage((p) => p + 1)}
            data-testid="pagination-next"
          >
            Next Page
          </span>
        </div>
      </div>
    );
  }
);

export default ProductTable;
