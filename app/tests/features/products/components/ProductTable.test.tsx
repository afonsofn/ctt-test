import ProductTable, {
  ITEMS_PER_PAGE,
} from "@/features/products/components/ProductList/components/ProductTable/ProductTable";
import { fireEvent, render, screen } from "@testing-library/react";

import { Product } from "@/features/products/types";
import React from "react";
import { generateMockProducts } from "@/tests/testUtils";

const mockThreeProducts = generateMockProducts(3);
const mockTwelveProducts = generateMockProducts(12);

const renderProductTable = ({
  products,
  onEdit = jest.fn(),
  onDelete = jest.fn(),
}: {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}) => {
  render(
    <ProductTable products={products} onEdit={onEdit} onDelete={onDelete} />
  );
};

describe("ProductTable", () => {
  it("renders correct number of rows with product data", () => {
    renderProductTable({ products: mockThreeProducts });

    const renderedProductRows = mockThreeProducts.map((product) =>
      screen.getByTestId(`product-row-${product.id}`)
    );
    expect(renderedProductRows).toHaveLength(3);

    const emptyStartIndex = mockThreeProducts.length;
    const emptyEndIndex = ITEMS_PER_PAGE;

    const renderedEmptyRows = [];
    for (let i = emptyStartIndex; i < emptyEndIndex; i++) {
      renderedEmptyRows.push(screen.getByTestId(`product-row-empty-${i}`));
    }

    expect(renderedEmptyRows).toHaveLength(5);
  });

  it("calls onEdit with the correct product when Edit button is clicked", () => {
    const onEditMock = jest.fn();
    renderProductTable({ products: mockThreeProducts, onEdit: onEditMock });

    const editButton = screen.getByTestId(
      `edit-product-button-${mockThreeProducts[0].id}`
    );
    fireEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(mockThreeProducts[0]);
  });

  it("calls onDelete with the correct product when Delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    renderProductTable({ products: mockThreeProducts, onDelete: onDeleteMock });

    const deleteButton = screen.getByTestId(
      `delete-product-button-${mockThreeProducts[1].id}`
    );
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(mockThreeProducts[1]);
  });

  it("goes to next page when Next Page is clicked and render the correct items", () => {
    renderProductTable({ products: mockTwelveProducts });

    expect(screen.getByTestId("pagination-info")).toHaveTextContent(
      "Page 1 of 2"
    );
    expect(screen.getByText("Product 8")).toBeInTheDocument();
    expect(screen.queryByText("Product 9")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("pagination-next"));

    expect(screen.getByTestId("pagination-info")).toHaveTextContent(
      "Page 2 of 2"
    );
    expect(screen.queryByText("Product 8")).not.toBeInTheDocument();
    expect(screen.getByText("Product 9")).toBeInTheDocument();
  });

  it('disables "Next Page" and hides "Previous Page" when there is only one page of products', () => {
    renderProductTable({ products: mockThreeProducts });

    const nextPage = screen.getByTestId("pagination-next");
    expect(nextPage).toHaveClass("disabled");
    expect(nextPage).toHaveTextContent("Next Page");

    const prevPage = screen.queryByTestId("pagination-prev");
    expect(prevPage).not.toBeInTheDocument();

    expect(screen.getByTestId("pagination-info")).toHaveTextContent(
      "Page 1 of 1"
    );
  });

  it('allows navigation with "Next Page" and "Previous Page" when there are more than one page of products', () => {
    renderProductTable({ products: mockTwelveProducts });

    const firstPageProductIds = mockTwelveProducts.slice(0, 8).map((p) => p.id);
    firstPageProductIds.forEach((id) => {
      expect(screen.getByTestId(`product-row-${id}`)).toBeInTheDocument();
    });

    const paginationInfo = screen.getByTestId("pagination-info");
    const nextPageButton = screen.getByTestId("pagination-next");
    const previousPageButton = screen.queryByTestId("pagination-prev");

    expect(paginationInfo).toHaveTextContent("Page 1 of 2");
    expect(nextPageButton).not.toHaveClass("disabled");
    expect(previousPageButton).not.toBeInTheDocument();

    fireEvent.click(nextPageButton);

    const secondPageProductIds = mockTwelveProducts.slice(8).map((p) => p.id);
    secondPageProductIds.forEach((id) => {
      expect(screen.getByTestId(`product-row-${id}`)).toBeInTheDocument();
    });

    expect(paginationInfo).toHaveTextContent("Page 2 of 2");
    expect(screen.getByTestId("pagination-next")).toHaveClass("disabled");
    expect(screen.getByTestId("pagination-prev")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("pagination-prev"));

    firstPageProductIds.forEach((id) => {
      expect(screen.getByTestId(`product-row-${id}`)).toBeInTheDocument();
    });

    expect(paginationInfo).toHaveTextContent("Page 1 of 2");
  });
});
