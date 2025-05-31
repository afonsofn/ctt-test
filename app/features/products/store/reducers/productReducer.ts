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
    case "SET_PRODUCTS":
      return { ...state, items: action.payload };
    case "ADD_PRODUCT":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        items: state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        items: state.items.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};
