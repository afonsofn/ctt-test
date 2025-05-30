import { fireEvent, render, screen } from "@testing-library/react";

import DeleteProductModal from "@/features/products/components/ProductList/components/DeleteProductModal/DeleteProductModal";
import React from "react";

const defaultProps = {
  openModal: true,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
  loading: false,
};

describe("DeleteProductModal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it("renders correctly when openModal is true", () => {
    render(<DeleteProductModal {...defaultProps} />);

    expect(screen.getByTestId("delete-modal-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("delete-modal-cancel-button")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("delete-modal-confirm-button")
    ).toBeInTheDocument();
  });

  it("does not render when openModal is false", () => {
    render(<DeleteProductModal {...defaultProps} openModal={false} />);

    expect(screen.queryByTestId("delete-modal-title")).not.toBeInTheDocument();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<DeleteProductModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId("delete-modal-cancel-button"));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it("calls onConfirm when Delete button is clicked", () => {
    render(<DeleteProductModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId("delete-modal-confirm-button"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});
