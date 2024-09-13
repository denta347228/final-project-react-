import React, { useEffect, useState } from "react";
import { fetchmovies } from "../storeRedux/action";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import "bootstrap/dist/css/bootstrap.min.css";
import "./view.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Pagination,
  ButtonGroup,
  ListGroup,
  Image,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function Rekomendasi() {
  const dispatch = useDispatch();
  const Movies = useSelector((state) => state.movies.movie);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);

  useEffect(() => {
    dispatch(fetchmovies());
  }, [dispatch]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
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

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 100,
  });

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = Movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(Movies.length / moviesPerPage);

  // Get top-rated movies for the right-hand list
  const topRatedMovies = [...Movies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 5);

  return (
    <>
      <Container>
        <Row>
          {/* Main Movie List */}
          <Col lg={9}>
            <h1 className="heading-wrapper">
              <span className="heading-line"> Instant Choice Movies</span>
            </h1>
            <Row>
              {currentMovies.map((el) => (
                <Col xs={12} sm={2} md={3} lg={3} key={el.id}>
                  <animated.div style={fadeInProps}>
                    <Card
                      className="shadow p-2 mb-4 card-hover"
                      style={{
                        backgroundColor: "#1c1c1c",
                        color: "#FFD700",
                        border: "none",
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + el.poster_path
                        }
                        style={{
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        className="img-hover"
                      />
                      <Card.Body style={{ padding: "0.5rem" }}>
                        <Card.Title
                          style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                        >
                          {el.original_title}
                        </Card.Title>
                        <p style={{ fontSize: "0.875rem" }}>
                          Release Date: {el.release_date}
                        </p>
                        <p style={{ fontSize: "0.875rem" }}>
                          Rating: {el.vote_average}{" "}
                          {renderStars(el.vote_average)}
                        </p>

                        {/* Button Group for Overview and Trailer */}
                        <ButtonGroup className="w-100">
                          <Button
                            onClick={() => handleClick(el)}
                            type="button"
                            variant="primary"
                          >
                            Overview
                          </Button>
                          <Link
                            className="btn btn-warning"
                            to={`/trailer/${el.id}`}
                          >
                            Trailer
                          </Link>
                        </ButtonGroup>
                      </Card.Body>
                    </Card>
                  </animated.div>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber + 1}
                    active={pageNumber + 1 === currentPage}
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Pagination>
            </div>
          </Col>

          {/* Top-Rated Movies List */}
          <Col lg={3}>
            <h1 className="heading-wrapper">
              <span className="heading-line"> TOP Movies</span>
            </h1>
            <ListGroup variant="flush">
              {topRatedMovies.map((movie) => (
                <ListGroup.Item
                  key={movie.id}
                  className="d-flex align-items-center"
                  style={{
                    backgroundColor: "",
                    color: "black",
                    border: "none",
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                    rounded
                    style={{ height: "60px", marginRight: "10px" }}
                  />
                  <div>
                    <h6>{movie.original_title}</h6>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>
                      Rating: {movie.vote_average}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        {/* Movie Modal */}
        {selectedMovie && (
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.original_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Release Date:</strong> {selectedMovie.release_date}
              </p>
              <p>
                <strong>Overview:</strong> {selectedMovie.overview}
              </p>
              <p>
                <strong>Popularity:</strong> {selectedMovie.popularity}
              </p>
              <p>
                <strong>Vote Count:</strong> {selectedMovie.vote_count}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="custom-btn" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}
