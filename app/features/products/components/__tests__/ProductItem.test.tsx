import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { fireEvent, render, screen } from '@testing-library/react';

import { Product } from '../../types';
import ProductItem from '../ProductItem';
import { Provider } from 'react-redux';
import React from 'react';
import { productReducer } from '../../../../store/reducers/productReducer';
import {thunk} from 'redux-thunk';

const renderItem = (product: Product) => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {
      product: { items: [product] },
    } as {},
    applyMiddleware(thunk)
  );

  return render(
    <Provider store={store}>
      <ProductItem product={product} />
    </Provider>
  );
};

describe('ProductItem', () => {
  it('updates a product when edited and saved', () => {
    const product: Product = {
      id: '1',
      description: 'Old Name',
      price: 10,
      stock: 5,
      categories: [],
    };

    renderItem(product);

    fireEvent.change(screen.getByDisplayValue(/Old Name/i), {
      target: { value: 'Updated Name' },
    });

    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByDisplayValue(/Updated Name/i)).toBeInTheDocument();
  });
});
