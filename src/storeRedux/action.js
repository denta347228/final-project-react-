export const FILM_FETCH = "FILM_FETCH";

const fetchfilm = (payload) => ({
  type: "FILM_FETCH",
  payload: payload,
});

export const fetchmovies = () => {
  return async (dispatch) => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const url_fetch =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      };
      const data = await fetch(url_fetch, options);
      const resultData = await data.json();
      dispatch(fetchfilm(resultData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchMovie = (search) => {
  return async (dispatch) => {
    try {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const url_fetch = `https://api.themoviedb.org/3/search/movie?&query=${search}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      };
      const data = await fetch(url_fetch, options);
      const resultData = await data.json();
      dispatch(fetchfilm(resultData));
    } catch (error) {
      console.error(error);
    }
  };
};
