import { useEffect, useState } from "react";
import { fetchmovies } from "../storeRedux/action";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function MovieCard() {
  //   const username = useSelector((state) => state.username);
  //   //   const Movies = useSelector((state) => state);
  //   const dispatch = useDispatch();
  //   const [Movies, setMovies] = useState([]);
  //   const [showModal, setShowModal] = useState(false);
  //   const [selectedMovie, setSelectedMovie] = useState(null);
  //   const [movieTrailer, setMovieTrailer] = useState(null);
  //   const [comments, setComments] = useState([]);
  //   const [newComment, setNewComment] = useState("");

  const API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTNlNWM1ZDEwZTdiYTYxOTM1MzljMGRiNWRlMmMzNSIsIm5iZiI6MTcyNjA0NjU3OC4zNjExNDcsInN1YiI6IjY2ZTE2MDQ0Yzc5NjgzOTMzMzQwYTQzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CwAqgmjyG2jDlOFjZD0Usj7tCQ__M6BKtu4LY1jXprI";

  //   const fetchData = async () => {
  //     try {
  //       const url =
  //         "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  //       const options = {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           Authorization: API_KEY,
  //         },
  //       };
  //       const data = await fetch(url, options);
  //       const resultData = await data.json();
  //       console.log(resultData, "Final");
  //       setMovies(resultData.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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

  //   useEffect(() => {
  //     fetchData();
  //     // fetchmovies();
  //   }, []);

  //   const handleClick = (movie) => {
  //     setSelectedMovie(movie);
  //     setShowModal(true);
  //     fetchMovieDetails(movie.id);
  //   };
  const dispatch = useDispatch();
  const Movies = useSelector((state) => state.movies.movie); // Ambil data movie dari Redux

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(fetchmovies()); // Panggil action fetchmovies
  }, [dispatch]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    fetchMovieDetails(movie.id);
  };

  // Rest of your component

  const handleClose = () => {
    setShowModal(false);
    setMovieTrailer(null);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]); // Add new comment to comments list
      setNewComment("");
    }
  };

  const renderStars = (rating) => {
    const stars = Math.floor(rating);
    return (
      <div>
        {Array(stars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={index} color="gold" />
          ))}
      </div>
    );
  };

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <Container>
        <h1 className="text-center mb-4">Choose Your Movie</h1>
        <Row>
          {Movies?.map((el) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={el.id}>
              <animated.div style={props}>
                <Card className="shadow p-3 mb-5">
                  <Card.Img
                    variant="top"
                    src={"https://image.tmdb.org/t/p/w500/" + el.poster_path}
                    style={{ height: "400px", width: "auto" }}
                  />
                  <Card.Body>
                    <Card.Title>{el.original_title}</Card.Title>
                    <p>Release Date: {el.release_date}</p>
                    <p>
                      Rating: {el.vote_average} {renderStars(el.vote_average)}
                    </p>
                    <Button
                      onClick={() => handleClick(el)}
                      type="button"
                      variant="primary"
                      className="mr-2"
                    >
                      Review
                    </Button>
                    <Link className="secondary" to={`/trailer/${el.id}`}>
                      Trailer
                    </Link>
                  </Card.Body>
                </Card>
              </animated.div>
            </Col>
          ))}
        </Row>

        {selectedMovie && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.original_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Release Date: {selectedMovie.release_date}</p>
              <p>Overview: {selectedMovie.overview}</p>
              <p>Rating: {selectedMovie.vote_average}</p>

              {movieTrailer && (
                <div>
                  <h5>Trailer:</h5>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Form komentar */}
            </Modal.Body>
            <Modal.Footer>
              <Button className="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {comments.length > 0 ? (
          <ul className="list-unstyled bg-light p-3 rounded shadow-sm">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="mb-2 p-2 border rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Belum ada komentar.</p>
        )}

        {/* Form Komentar */}
        <Form onSubmit={handleCommentSubmit} className="mt-3">
          <Form.Group controlId="formComment">
            <Form.Label className="font-weight-bold">
              Tambahkan Komentar
            </Form.Label>
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar Anda"
              className="mb-2"
            />
          </Form.Group>
          <Button className="primary" type="submit w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
