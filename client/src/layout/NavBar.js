import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../lib/apis/userApis";
import { useLogoutUserMutation } from "../lib/apis/authApis";
import BookReco from "../Assets/Book Reco.png";
import classes from "../components/homeComponents/Home.module.css";

const NavBar = () => {
  const [getCurrentUser] = useGetCurrentUserMutation();

  const [logoutUser] = useLogoutUserMutation();

  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onLogoutHandler = async (event) => {
    event.preventDefault();

    return logoutUser();
  };
  return (
    <nav className={`navbar navbar-expand-lg  fixed-top  ${classes.nav_bar}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img style={{ width: "100px" }} src={BookReco} alt="bookreco_logo" />
        </Link>
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
              <Link
                className={`nav-link active ${classes.nav_text}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/category"
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/books"
              >
                Books
              </Link>
            </li> */}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <form className="search_form">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
              />
              <button className="" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>

            {!user && (
              <li className="nav-item">
                <Link
                  className={`nav-link active ${classes.nav_text}`}
                  to="/auth/signin"
                >
                  Get Started
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link
                  className={`nav-link active ${classes.nav_text}`}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
