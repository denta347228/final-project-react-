import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchMovie } from "../storeRedux/action";
import "./view.css";

export default function NavbarComponent() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(searchMovie(query));
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" href="#">
            Bioskop Kuning
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                onChange={handleSearch}
                value={query}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={submitSearch}
                className="btn btn-outline-warning"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
