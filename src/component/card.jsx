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

export default function Playlist() {
  const dispatch = useDispatch();
  const Movies = useSelector((state) => state.movies.movie);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
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
      <Container className="my-5">
        <h1 className="text-center mb-4">Movie Library</h1>
        <Row className="gy-4">
          {Movies.map((el) => (
            <Col xs={12} sm={6} md={4} lg={3} key={el.id}>
              <animated.div style={props}>
                <Card className="shadow border-0 rounded">
                  <Card.Img
                    variant="top"
                    src={"https://image.tmdb.org/t/p/w500/" + el.poster_path}
                    className="card-img-top rounded-top"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{el.original_title}</Card.Title>
                    <Card.Text>Release Date: {el.release_date}</Card.Text>
                    <Card.Text>
                      Rating: {el.vote_average} {renderStars(el.vote_average)}
                    </Card.Text>
                    <Button
                      onClick={() => handleClick(el)}
                      type="button"
                      variant="primary"
                      className="w-100 mb-4"
                    >
                      Details
                    </Button>
                    <Link
                      className="btn btn-secondary w-100"
                      to={`/trailer/${el.id}`}
                    >
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
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
          <p className="text-muted">No comments yet.</p>
        )}

        {/* Comment Form */}
        <Form onSubmit={handleCommentSubmit} className="mt-3">
          <Form.Group controlId="formComment">
            <Form.Label className="font-weight-bold">Add a Comment</Form.Label>
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
              className="mb-2"
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
