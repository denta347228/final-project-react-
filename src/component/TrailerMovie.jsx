import { useLocation, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function TrailerMovie() {
  const location = useLocation();
  const param = useParams();
  const [movieTrailer, setMovieTrailer] = useState(null);
  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTNlNWM1ZDEwZTdiYTYxOTM1MzljMGRiNWRlMmMzNSIsIm5iZiI6MTcyNjA0NjU3OC4zNjExNDcsInN1YiI6IjY2ZTE2MDQ0Yzc5NjgzOTMzMzQwYTQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CwAqgmjyG2jDlOFjZD0Usj7tCQ__M6BKtu4LY1jXprI";

  const fetchMovieDetails = async (movieId) => {
    console.log(movieId);
    try {
      const reviewUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      };
      const reviewData = await fetch(reviewUrl, options);
      //   const reviewResults = await reviewData.json();
      const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      const trailerData = await fetch(trailerUrl, options);
      const trailerResults = await trailerData.json();
      const trailer = trailerResults.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setMovieTrailer(trailer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(param.id);
  }, []);

  return (
    <Container className="mt-5">
      <h2>Trailer</h2>
      {movieTrailer ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${movieTrailer.key}`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not available.</p>
      )}
    </Container>
  );
}
