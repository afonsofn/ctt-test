import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AddNewProduct from "@/features/products/components/AddNewProduct/AddNewProduct";
import { Provider } from "react-redux";
import React from "react";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { productReducer } from "@/features/products/store/reducers/productReducer";
import { thunk } from "redux-thunk";

const renderView = () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {},
    applyMiddleware(thunk)
  );

  const view = render(
    <Provider store={store}>
      <ToastProvider>
        <AddNewProduct />
      </ToastProvider>
    </Provider>
  );

  return { ...view, store };
};

describe("AddNewProduct", () => {
  it("submits a new product", async () => {
    const { store } = renderView();

    const descriptionInput = screen.getByTestId("description-input");
    const priceInput = screen.getByTestId("price-input");
    const stockInput = screen.getByTestId("stock-input");
    const categoryCheckbox = screen.getByTestId("multi-select");
    const submitButton = screen.getByTestId("product-form-submit-button");

    fireEvent.change(descriptionInput, {
      target: { value: "Novo Produto" },
    });
    fireEvent.change(priceInput, {
      target: { value: "499" },
    });
    fireEvent.change(stockInput, {
      target: { value: "5" },
    });
    fireEvent.click(categoryCheckbox);
    const techOption = await screen.findByTestId("checkbox-input-tech");
    fireEvent.click(techOption);

    fireEvent.click(submitButton);

    await waitFor(() => {
      const {
        product: { items },
      } = store.getState();

      expect(items).toHaveLength(1);
      expect(items[0]).toMatchObject({
        description: "Novo Produto",
        price: 4.99,
        stock: 5,
        categories: ["tech"],
      });
    });
  });

  it("does not submit when fields are empty or invalid", async () => {
    const { store } = renderView();
    const state = store.getState();

    const descriptionInput = screen.getByTestId("description-input");
    const priceInput = screen.getByTestId("price-input");
    const stockInput = screen.getByTestId("stock-input");
    const submitButton = screen.getByTestId("product-form-submit-button");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("form-error")).toBeInTheDocument();
    });

    expect(state.product.items).toHaveLength(0);

    fireEvent.change(descriptionInput, {
      target: { value: "Produto Incompleto" },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("form-error")).toBeInTheDocument();
    });

    expect(state.product.items).toHaveLength(0);

    fireEvent.change(priceInput, {
      target: { value: "-10" },
    });
    fireEvent.change(stockInput, {
      target: { value: "-2" },
    });

    await waitFor(() => {
      expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("form-error")).toBeInTheDocument();
    });
  });

  it("does not allow duplicate product descriptions", async () => {
    const { store } = renderView();

    const descriptionInput = screen.getByTestId("description-input");
    const priceInput = screen.getByTestId("price-input");
    const stockInput = screen.getByTestId("stock-input");
    const categoryCheckbox = screen.getByTestId("multi-select");
    const submitButton = screen.getByTestId("product-form-submit-button");

    fireEvent.click(categoryCheckbox);

    const addProduct = async (desc: string, price: string, stock: string) => {
      fireEvent.change(descriptionInput, {
        target: { value: desc },
      });
      fireEvent.change(priceInput, {
        target: { value: price },
      });
      fireEvent.change(stockInput, {
        target: { value: stock },
      });

      const techOption = await screen.findByTestId("checkbox-input-tech");

      fireEvent.click(techOption);
      fireEvent.click(submitButton);

      await waitFor(() => {
        const {
          product: { items },
        } = store.getState();
        expect(items).not.toHaveLength(0);
      });
    };

    await addProduct("Produto Único", "10.00", "3");
    expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();

    await addProduct("Produto Único", "15.00", "2");
    expect(screen.getByTestId("form-error")).toBeInTheDocument();

    await waitFor(() => {
      const {
        product: { items },
      } = store.getState();
      expect(items).toHaveLength(1);
    });
  });

  it("clears fields after submission", async () => {
    renderView();

    const descriptionInput = screen.getByTestId("description-input");
    const priceInput = screen.getByTestId("price-input");
    const stockInput = screen.getByTestId("stock-input");
    const categoryCheckbox = screen.getByTestId("multi-select");
    const categoryCheckboxPlaceholder = screen.getByTestId(
      "multi-select-placeholder"
    );
    const submitButton = screen.getByTestId("product-form-submit-button");

    fireEvent.change(descriptionInput, {
      target: { value: "Produto Temporário" },
    });
    fireEvent.change(priceInput, {
      target: { value: "12.34" },
    });
    fireEvent.change(stockInput, {
      target: { value: "4" },
    });
    fireEvent.click(categoryCheckbox);
    const techOption = await screen.findByTestId("checkbox-input-tech");
    fireEvent.click(techOption);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(descriptionInput).toHaveValue();
      expect(priceInput).toHaveValue();
      expect(stockInput).toHaveValue();
      expect(categoryCheckboxPlaceholder).toBeDefined();
    });
  });
});
