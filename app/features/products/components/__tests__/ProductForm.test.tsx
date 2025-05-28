import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { fireEvent, render, screen } from '@testing-library/react';

import ProductForm from '../ProductForm';
import { Provider } from 'react-redux';
import React from 'react';
import { productReducer } from '../../../../store/reducers/productReducer';
import {thunk} from 'redux-thunk';

const renderForm = () => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {},
    applyMiddleware(thunk)
  );

  return render(
    <Provider store={store}>
      <ProductForm />
    </Provider>
  );
};

describe('ProductForm', () => {
  it('submits a new product', () => {
    renderForm();

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Novo Produto' },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '49.90' },
    });
    fireEvent.change(screen.getByLabelText(/stock/i), {
      target: { value: '5' },
    });

    fireEvent.click(screen.getByText(/add product/i));

    expect(screen.getByLabelText(/description/i)).toHaveValue('');
  });
});
