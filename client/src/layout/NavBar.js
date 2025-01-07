import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../lib/apis/userApis";
import Collapse from "bootstrap/js/dist/collapse";
import BookReco from "../Assets/Book Reco.png";
import classes from "../components/homeComponents/Home.module.css";

const NavBar = () => {
  const [getCurrentUser] = useGetCurrentUserMutation();

  const { user } = useSelector((state) => state.userState);

  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const closeNavbar = () => {
    if (navbarCollapseRef.current) {
      const collapseInstance =
        Collapse.getInstance(navbarCollapseRef.current) ||
        new Collapse(navbarCollapseRef.current, {
          toggle: false,
        });
      collapseInstance.hide();
    }
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
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                aria-current="page"
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/about"
                onClick={closeNavbar}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/category"
                onClick={closeNavbar}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link active ${classes.nav_text}`}
                to="/contact-us"
                onClick={closeNavbar}
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
                  onClick={closeNavbar}
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
                  onClick={closeNavbar}
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
