import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Card() {
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();
  console.log(username);
  const [Movies, setMovies] = useState([]);
  const fetcData = async () => {
    try {
      //   const data = await fetch(
      //     "https://www.omdbapi.com/?s=india&apikey=a8da1a71"

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
      console.log(resultData, "Final");
      setMovies(resultData.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcData();
  }, []);

  const handleClick = () => {
    // console.log(plot, "huauauauauauuauau");
    dispatch({
      type: "CHANGE_USERNAME",
      payload: "febrian",
    });
  };

  return (
    <>
      <div className="container 3">
        <button onClick={() => handleClick()} type="button">
          ini pencet
        </button>
        <br></br>
        <h1 className="text-center">Chose Your Movie</h1>
        <div className="row ">
          {Movies?.map((el) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow p-3 mb-5 ">
                <img
                  style={{ height: "400px", width: "auto" }}
                  className="card-img-top"
                  src={"https://image.tmdb.org/t/p/w500/" + el.poster_path}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">{el.original_title}</p>
                  <p className="card-text">{el.username}</p>
                  <button
                    onClick={() => handleClick(el)}
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Deskripsi
                  </button>

                  <Link to={`${el.imdbID}`}>cek</Link>
                  <Link to={`/show/${el.imdbID}`}>cek</Link>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body"></div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
