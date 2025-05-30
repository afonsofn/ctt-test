import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import EditProductModal from "@/features/products/components/ProductList/components/EditProductModal/EditProductModal";
import { Provider } from "react-redux";
import React from "react";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { productReducer } from "@/features/products/store/reducers/productReducer";
import { thunk } from "redux-thunk";

const renderModal = (openModal = true) => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {},
    applyMiddleware(thunk)
  );
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  render(
    <Provider store={store}>
      <ToastProvider>
        <EditProductModal
          product={{
            id: "1",
            description: "Test Product",
            price: 99.99,
            stock: 10,
            categories: ["tech"],
          }}
          openModal={openModal}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </ToastProvider>
    </Provider>
  );

  return { store, onConfirm, onCancel };
};

describe("EditProductModal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it("renders correctly when modal is open", () => {
    renderModal();

    expect(screen.getByTestId("edit-product-title")).toBeInTheDocument();
    expect(screen.getByTestId("description-input")).toBeInTheDocument();
    expect(screen.getByTestId("price-input")).toBeInTheDocument();
    expect(screen.getByTestId("stock-input")).toBeInTheDocument();
    expect(screen.getByTestId("multi-select")).toBeInTheDocument();
  });

  it("does not render when openModal is false", () => {
    renderModal(false);
    expect(screen.queryByText("edit-product-title")).not.toBeInTheDocument();
  });

  it("updates fields when user types in inputs", async () => {
    renderModal();

    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "Updated Product" },
    });
    fireEvent.change(screen.getByTestId("price-input"), {
      target: { value: "199,90" },
    });
    fireEvent.change(screen.getByTestId("stock-input"), {
      target: { value: "8" },
    });

    fireEvent.click(screen.getByTestId("multi-select"));

    const wearableCheckbox = await screen.findByTestId(
      "checkbox-input-wearable"
    );
    fireEvent.click(wearableCheckbox);

    expect(wearableCheckbox).toBeChecked();

    expect(screen.getByTestId("description-input")).toHaveValue(
      "Updated Product"
    );
    expect(screen.getByTestId("price-input")).toHaveValue("199,90");
    expect(screen.getByTestId("stock-input")).toHaveValue(8);
  });

  it("resets and closes modal when cancel is clicked", () => {
    const { onCancel } = renderModal();

    expect(screen.getByTestId("description-input")).toHaveValue("Test Product");

    fireEvent.change(screen.getByTestId("description-input"), {
      target: { value: "Changed Text" },
    });

    expect(screen.getByTestId("description-input")).toHaveValue("Changed Text");

    fireEvent.click(screen.getByTestId("product-form-cancel-button"));

    expect(onCancel).toHaveBeenCalled();
  });
});
