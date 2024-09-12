export const FILM_FETCH = "FILM_FETCH";

const fetchfilm = (payload) => ({
  type: "FILM_FETCH",
  payload: payload,
});

export const fetchmovies = () => {
  return async (dispatch) => {
    try {
      const API_KEY =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTNlNWM1ZDEwZTdiYTYxOTM1MzljMGRiNWRlMmMzNSIsIm5iZiI6MTcyNjA0NjU3OC4zNjExNDcsInN1YiI6IjY2ZTE2MDQ0Yzc5NjgzOTMzMzQwYTQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CwAqgmjyG2jDlOFjZD0Usj7tCQ__M6BKtu4LY1jXprI";
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
