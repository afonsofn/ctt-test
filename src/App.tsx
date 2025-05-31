import '@/style/app.css';

import AddNewProduct from '@/features/products/components/AddNewProduct/AddNewProduct';
import ProductList from '@/features/products/components/ProductList/ProductList';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from '@/components/Toast/ToastProvider';
import { store } from '@/features/products/store';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <main className="app-main">
          <h1 className="app-title">Product SPA</h1>
          <section className="app-content">
            <AddNewProduct />
            <ProductList />
          </section>
        </main>
      </ToastProvider>
    </Provider>
  );
};

export default App;
