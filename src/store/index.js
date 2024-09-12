import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

const initialState = {
  movies: {},
  username: "denta",
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
};

// Create logger middleware
const logger = createLogger();

// Create store with reducer and middleware
const store = createStore(reducer, applyMiddleware(logger));

export default store;
