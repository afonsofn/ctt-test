import { ProductAction } from "../actions/types";
import { ProductState } from "./types";

const initialState: ProductState = {
  items: [],
};

export const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    default:
      return state;
  }
};
