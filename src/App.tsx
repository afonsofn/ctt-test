import ProductForm from '../app/features/products/components/ProductForm';
import ProductList from '../app/features/products/components/ProductList';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../app/store';

const App = () => {
  return (
    <Provider store={store}>
      <main style={{ padding: 20 }}>
        <h1>Product SPA</h1>
        <ProductForm />
        <ProductList />
      </main>
    </Provider>
  );
};

export default App;
