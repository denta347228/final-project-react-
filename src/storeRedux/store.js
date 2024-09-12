import { configureStore } from "@reduxjs/toolkit";
import reducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    movies: reducer,
  },
});
