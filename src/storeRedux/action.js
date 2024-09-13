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
      const API_KEY = "process.env.REACT_APP_API_KEY";
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

// export const TrailerMovie = (trailer) => {
//   return async (dispatch) => {
//     try {
//       const API_KEY =
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTNlNWM1ZDEwZTdiYTYxOTM1MzljMGRiNWRlMmMzNSIsIm5iZiI6MTcyNjA0NjU3OC4zNjExNDcsInN1YiI6IjY2ZTE2MDQ0Yzc5NjgzOTMzMzQwYTQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CwAqgmjyG2jDlOFjZD0Usj7tCQ__M6BKtu4LY1jXprI";

//       useEffect(() => {
//         const fetchMovieDetails = async (movieId) => {
//           try {
//             const options = {
//               method: "GET",
//               headers: {
//                 accept: "application/json",
//                 Authorization: API_KEY,
//               },
//             };

//             // Fetch trailer data
//             const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
//             const trailerData = await fetch(trailerUrl, options);
//             const trailerResults = await trailerData.json();
//             const trailer = trailerResults.results.find(
//               (video) => video.type === "Trailer" && video.site === "YouTube"
//             );
//             setMovieTrailer(trailer);

//             // Fetch playlist data
//             const playlistUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
//             const playlistData = await fetch(playlistUrl, options);
//             const playlistResults = await playlistData.json();
//             setPlaylists(playlistResults.results.slice(0, 7));

//             // Fetch cast data
//             const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
//             const castData = await fetch(castUrl, options);
//             const castResults = await castData.json();
//             setCast(castResults.cast.slice(0, 5));
//           } catch (error) {
//             console.error("Error fetching movie details: ", error);
//           }
//         };

//         fetchMovieDetails(movieId);
//       }, [movieId]);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
