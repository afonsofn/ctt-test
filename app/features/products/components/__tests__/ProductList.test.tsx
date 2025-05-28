import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { render, screen } from '@testing-library/react';

import { Product } from '../../types';
import ProductList from '../ProductList';
import { Provider } from 'react-redux';
import React from 'react';
import { productReducer } from '../../../../store/reducers/productReducer';
import { thunk } from 'redux-thunk';

export const renderWithStore = (products: Product[]) => {
  const store = createStore(
    combineReducers({
      product: productReducer,
    }),
    {
      product: { items: products },
    } as {},
    applyMiddleware(thunk)
  );

  return render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
};

describe('ProductList', () => {
  it('renders list of products when there are items', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        description: 'Camiseta',
        stock: 10,
        price: 29.9,
        categories: ['moda'],
      },
      {
        id: '2',
        description: 'Fone Bluetooth',
        stock: 5,
        price: 199.9,
        categories: ['áudio'],
      },
    ];

    renderWithStore(mockProducts);

    expect(screen.getByText('Product List')).toBeDefined();
    expect(screen.getByText('Camiseta')).toBeDefined();
    expect(screen.getByText('Fone Bluetooth')).toBeDefined();
  });

  it('shows fallback message when no products', () => {
    renderWithStore([]);

    expect(screen.getByText('No products found.')).toBeDefined();
  });
});
