import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  movie: [],
  status: "idle",
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILM_FETCH":
      return {
        ...state,
        movie: action.payload.results,
      };

    default:
      return state;
  }
};

export default reducer;
