import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function TrailerMovie() {
  const { id: movieId } = useParams();
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [cast, setCast] = useState([]); // State untuk menyimpan data cast
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        };

        // Fetch trailer data
        const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const trailerData = await fetch(trailerUrl, options);
        const trailerResults = await trailerData.json();
        const trailer = trailerResults.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setMovieTrailer(trailer);

        // Fetch playlist data
        const playlistUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const playlistData = await fetch(playlistUrl, options);
        const playlistResults = await playlistData.json();
        setPlaylists(playlistResults.results.slice(0, 7));

        // Fetch cast data
        const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
        const castData = await fetch(castUrl, options);
        const castResults = await castData.json();
        setCast(castResults.cast.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchMovieDetails(movieId);
  }, [movieId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-0">
              {movieTrailer ? (
                <iframe
                  className="rounded"
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1`}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <p className="text-center p-3">Trailer not available.</p>
              )}
            </Card.Body>
          </Card>

          {/* Top Cast Section */}
          <h4 className="mt-4">Top Cast</h4>
          <Row>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <Col
                  xs={6}
                  md={4}
                  lg={2}
                  key={actor.id}
                  className="text-center mb-4"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    roundedCircle
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <h6 className="mt-2">{actor.name}</h6>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    {actor.character}
                  </p>
                </Col>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </Row>
        </Col>

        <Col md={4}>
          <h4>Related Videos</h4>
          <ListGroup variant="flush">
            {playlists.length > 0 ? (
              playlists.map((video) => (
                <ListGroup.Item
                  key={video.id}
                  className="p-2 d-flex align-items-center"
                  style={{ fontSize: "16px" }}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    thumbnail
                    style={{
                      width: "100px",
                      height: "60px",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {video.name}
                    </a>
                    <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                      {video.published_at}
                    </p>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>No related videos found.</p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
