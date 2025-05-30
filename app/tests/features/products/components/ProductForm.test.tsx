import { fireEvent, render, screen } from "@testing-library/react";

import ProductForm from "@/features/products/components/ProductForm/ProductForm";
import React from "react";

describe("ProductForm", () => {
  const defaultProps = {
    saveButtonLabel: "Save Product",
    cancelButtonLabel: "Cancel",
    description: "",
    price: "",
    stock: "",
    categories: [],
    error: "",
    loading: false,
    onDescriptionChange: jest.fn(),
    onPriceChange: jest.fn(),
    onStockChange: jest.fn(),
    onCategoriesChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all input fields and buttons with correct props", () => {
    render(<ProductForm {...defaultProps} />);

    expect(screen.getByTestId("description-input")).toBeInTheDocument();
    expect(screen.getByTestId("price-input")).toBeInTheDocument();
    expect(screen.getByTestId("stock-input")).toBeInTheDocument();
    expect(screen.getByTestId("multi-select-placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("product-form-submit-button")).toHaveTextContent(
      "Save Product"
    );
    expect(screen.getByTestId("product-form-cancel-button")).toHaveTextContent(
      "Cancel"
    );
  });

  it("renders only the submit button if cancel label is not provided", () => {
    const props = { ...defaultProps, cancelButtonLabel: undefined };
    render(<ProductForm {...props} />);

    expect(
      screen.queryByTestId("product-form-cancel-button")
    ).not.toBeInTheDocument();
  });

  it("displays error message if error prop is passed", () => {
    const props = { ...defaultProps, error: "Some error" };
    render(<ProductForm {...props} />);

    expect(screen.getByTestId("form-error")).toHaveTextContent("Some error");
  });

  it("calls onDescriptionChange when user types in description input", () => {
    render(<ProductForm {...defaultProps} />);
    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "New Desc" },
    });

    expect(defaultProps.onDescriptionChange).toHaveBeenCalledWith("New Desc");
  });

  it("calls onCategoriesChange when a category is selected", async () => {
    render(<ProductForm {...defaultProps} />);

    const trigger = screen.getByTestId("multi-select");
    fireEvent.click(trigger);

    const checkbox = await screen.findByTestId("checkbox-input-tech");
    fireEvent.click(checkbox);

    expect(defaultProps.onCategoriesChange).toHaveBeenCalledWith(["tech"]);
  });

  it("calls onSubmit when form is submitted", () => {
    render(<ProductForm {...defaultProps} />);
    fireEvent.submit(screen.getByTestId("product-form"));

    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});
