import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
// const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9...";
// const url =
//   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

// const response = await fetch(url, {
//   headers: {
//     accept: "application/json",
//     Authorization: API_KEY,
//   },
// });

//   if (!response.ok) {
//     throw new Error("Failed to fetch movies");
//   }

//   const data = await response.json();
//   return data.results;
// });

const initialState = {
  movie: [],
  status: "idle",
  error: null,
};
// reducers: {},

// extraReducers: (builder) => {
//   builder
//     .addCase(fetchMovies.pending, (state) => {
//       state.status = "loading";
//     })
//     .addCase(fetchMovies.fulfilled, (state, action) => {
//       state.status = "succeeded";
//       state.list = action.payload;
//     })
//     .addCase(fetchMovies.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     });
// },

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILM_FETCH":
      return {
        ...state,
        movie: action.payload.results, // Pastikan menyimpan di property 'results'
      };

    default:
      return state;
  }
};

export default reducer;
