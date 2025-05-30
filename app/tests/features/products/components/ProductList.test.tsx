import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ProductList from "@/features/products/components/ProductList/ProductList";
import { Provider } from "react-redux";
import React from "react";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { productReducer } from "@/features/products/store/reducers/productReducer";
import { resetMockData } from "@/tests/__mocks__/fetchMock";
import { thunk } from "redux-thunk";

jest.mock("../../../../features/products/store/actions/productActions", () => ({
  ...jest.requireActual(
    "../../../../features/products/store/actions/productActions"
  ),
  loadProducts: () => () => {},
}));

const renderView = () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {
      product: {
        items: [
          {
            id: "1",
            description: "Test Product 1",
            price: 19.99,
            stock: 5,
            categories: ["tech"],
          },
          {
            id: "2",
            description: "Test Product 2",
            price: 29.99,
            stock: 10,
            categories: ["wearable"],
          },
        ],
      },
    } as {},
    applyMiddleware(thunk)
  );

  const view = render(
    <Provider store={store}>
      <ToastProvider>
        <ProductList />
      </ToastProvider>
    </Provider>
  );

  return { ...view, store };
};

describe("ProductList", () => {
  beforeEach(async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    resetMockData();
  });

  it("renders the product list table with products", () => {
    renderView();

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("€ 19.99")).toBeInTheDocument();

    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("€ 29.99")).toBeInTheDocument();
  });

  it("opens delete modal and deletes a product", async () => {
    const { store } = renderView();

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-product-button-1");
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId(
      "delete-modal-confirm-button"
    );
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
      expect(screen.queryByTestId("Test Product 1")).not.toBeInTheDocument();

      const {
        product: { items },
      } = store.getState();
      expect(items).toHaveLength(1);
      expect(items[0].description).toBe("Test Product 2");
    });
  });

  it("opens edit modal and edit a product", async () => {
    const { store } = renderView();

    const editButton = screen.getByTestId("edit-product-button-1");
    fireEvent.click(editButton);

    const modalTitle = await screen.findByTestId("edit-product-title");
    expect(modalTitle).toBeInTheDocument();

    const descriptionInput = screen.getByTestId("description-input");
    const priceInput = screen.getByTestId("price-input");
    const stockInput = screen.getByTestId("stock-input");
    const categoryCheckbox = screen.getByTestId("multi-select");

    fireEvent.change(descriptionInput, {
      target: { value: "Updated Product 1" },
    });
    fireEvent.change(priceInput, { target: { value: "25.99" } });
    fireEvent.change(stockInput, { target: { value: "7" } });

    fireEvent.click(categoryCheckbox);
    const wearableCheckbox = await screen.findByTestId(
      "checkbox-input-wearable"
    );
    fireEvent.click(wearableCheckbox, { target: { checked: true } });

    await screen.findByText("Tech, Wearable");

    const submitButton = screen.getByTestId("product-form-submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const {
        product: { items },
      } = store.getState();
      const updatedProduct = items.find((p) => p.id === "1");

      expect(updatedProduct).toBeDefined();
      expect(updatedProduct?.description).toBe("Updated Product 1");
      expect(updatedProduct?.price).toBe(25.99);
      expect(updatedProduct?.stock).toBe(7);
      expect(updatedProduct?.categories).toEqual(["tech", "wearable"]);
    });
  });

  it("shows success toast after deleting a product", async () => {
    const { store } = renderView();

    const deleteButton = screen.getByTestId("delete-product-button-1");
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId(
      "delete-modal-confirm-button"
    );
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(
        screen.getByText("Product deleted successfully!")
      ).toBeInTheDocument();
    });

    const {
      product: { items },
    } = store.getState();
    expect(items).toHaveLength(1);
    expect(items[0].description).toBe("Test Product 2");
  });
});
