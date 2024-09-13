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
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./view.css";

export default function Playlist() {
  const dispatch = useDispatch();
  const Movies = useSelector((state) => state.movies.movie);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

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

  // Add to favorite handler
  const handleAddFavorite = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      } else {
        return prevFavorites;
      }
    });
  };

  // Remove favorite handler
  const handleRemoveFavorite = (movieId) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <Container className="my-5">
        <Row>
          {/* Main Movie Library */}
          <Col lg={8}>
            <h1 className="heading-wrapper">
              <span className="heading-line">Library Movies</span>
            </h1>
            <Row className="gy-4">
              {Movies.map((el) => (
                <Col xs={12} sm={6} md={4} key={el.id}>
                  <animated.div style={props}>
                    <Card className="shadow border-0 rounded">
                      <Card.Img
                        variant="top"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + el.poster_path
                        }
                        className="card-img-top rounded-top"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{el.original_title}</Card.Title>
                        <Card.Text>Release Date: {el.release_date}</Card.Text>
                        <Card.Text>
                          Rating: {el.vote_average}{" "}
                          {renderStars(el.vote_average)}
                        </Card.Text>

                        {/* Button Group for Details, Trailer, Add to Favorites */}
                        <ButtonGroup className="w-100">
                          <Button
                            onClick={() => handleClick(el)}
                            type="button"
                            variant="primary"
                          >
                            Details
                          </Button>
                          <Link
                            className="btn btn-success"
                            to={`/trailer/${el.id}`}
                          >
                            Trailer
                          </Link>
                          <Button
                            variant="warning"
                            onClick={() => handleAddFavorite(el)}
                          >
                            Favorites
                          </Button>
                        </ButtonGroup>
                      </Card.Body>
                    </Card>
                  </animated.div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={4}>
            <h2 className="heading-wrapper">
              <span className="heading-line">Favorite Movies</span>
            </h2>
            {favoriteMovies.length > 0 ? (
              <>
                {favoriteMovies.map((favMovie) => (
                  <ButtonGroup
                    lg={4}
                    key={favMovie.id}
                    className="mb-3 d-flex align-items-center"
                  >
                    {/* Display small poster */}
                    <Image
                      src={
                        "https://image.tmdb.org/t/p/w92/" + favMovie.poster_path
                      }
                      rounded
                      className="me-3"
                      style={{
                        width: "50px",
                        height: "75px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column flex-grow-1">
                      <strong>{favMovie.original_title}</strong>
                      <p className="mb-1">
                        Rating: {favMovie.vote_average}{" "}
                        {renderStars(favMovie.vote_average)}
                      </p>
                    </div>

                    <Button
                      variant="info"
                      onClick={() => handleClick(favMovie)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFavorite(favMovie.id)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                ))}
              </>
            ) : (
              <p className="text-muted">No favorite movies yet.</p>
            )}
          </Col>
        </Row>

        {/* Modal for Movie Details */}
        {selectedMovie && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.original_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Release Date: {selectedMovie.release_date}</p>
              <p>Overview: {selectedMovie.overview}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}
