import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchmovies } from "../storeRedux/action";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Informasi() {
  const dispatch = useDispatch();
  const Movies = useSelector((state) => state.movies.movie); // Ambil data movie dari Redux

  useEffect(() => {
    dispatch(fetchmovies()); // Panggil aksi untuk fetch data
  }, [dispatch]);

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
