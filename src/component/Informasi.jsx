import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Informasi() {
  const [Movies, setMovies] = useState([]);

  const fetchData = async () => {
    try {
      const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTNlNWM1ZDEwZTdiYTYxOTM1MzljMGRiNWRlMmMzNSIsIm5iZiI6MTcyNjA0NjU3OC4zNjExNDcsInN1YiI6IjY2ZTE2MDQ0Yzc5NjgzOTMzMzQwYTQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CwAqgmjyG2jDlOFjZD0Usj7tCQ__M6BKtu4LY1jXprI",
        },
      };

      const data = await fetch(url, options);

      const resultData = await data.json();
      console.log(resultData);
      setMovies(resultData.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Mengambil data saat komponen dimount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <br />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner container">
          {Movies.length > 0 &&
            Movies.map((movie, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={movie.id}
              >
                <img
                  className="d-block w-100"
                  style={{ maxHeight: "70vh", objectFit: "cover" }}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://via.placeholder.com/700x400"
                  }
                  alt={movie.title}
                />
              </div>
            ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
}
