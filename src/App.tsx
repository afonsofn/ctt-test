import { Provider } from 'react-redux';
import { store } from '../app/store';

const App = () => {
  return (
    <Provider store={store}>
      <h1>App</h1>
    </Provider>
  );
};

export default App;
