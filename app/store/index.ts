import { combineReducers, legacy_createStore as createStore } from "redux";

import { productReducer } from "./reducers/productReducer";

const rootReducer = combineReducers({
  product: productReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
