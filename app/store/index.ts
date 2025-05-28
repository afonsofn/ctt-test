import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";

import { productReducer } from "./reducers/productReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);
