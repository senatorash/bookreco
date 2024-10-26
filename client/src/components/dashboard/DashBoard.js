import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../../lib/apis/userApis";
import { useLogoutUserMutation } from "../../lib/apis/authApis";
import { Link } from "react-router-dom";
import "./Dash.module.css"; // Custom CSS file for additional styles
import BookReco from "../../Assets/Book Reco.png";
import classes from "./Dash.module.css";
import styles from "../bookComponents/Book.module.css";

const Dashboard = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [getCurrentUser] = useGetCurrentUserMutation();

  const [logoutUser] = useLogoutUserMutation();

  const { user } = useSelector((state) => state.userState);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const onLogoutHandler = async (event) => {
    event.preventDefault();

    return logoutUser();
  };

  return (
    <div className={`container-fluid dashboard-container ${classes.dashboard}`}>
      {/* Offcanvas Trigger Button */}
      <button
        className={`btn btn-danger my-4 ${classes.open_text}`}
        onClick={toggleOffcanvas}
      >
        Open Menu
      </button>

      {/* Offcanvas Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? "show" : ""}`}
        tabIndex="-1"
        style={{ visibility: showOffcanvas ? "visible" : "hidden" }}
        data-bs-theme="dark"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={toggleOffcanvas}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className={`nav-item ${styles.search_btn}`}>
              <a className="nav-link text-white" href="#">
                Dashboard
              </a>
            </li>
            <li className={`nav-item ${styles.search_btn}`}>
              <Link className="nav-link text-white" to="/books">
                Recommendations
              </Link>
            </li>
            <li className={`nav-item ${styles.search_btn}`}>
              <a className="nav-link text-white" href="#">
                Profile
              </a>
            </li>
            {user && (
              <li className={`nav-item ${styles.search_btn}`}>
                <Link
                  className="nav-link text-white"
                  to="/"
                  onClick={onLogoutHandler}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content container">
        <h2 className={`mb-4 ${classes.welcome_text}`}>
          Welcome back, {user.firstName}
        </h2>

        {/* Book Recommendations Section */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src={BookReco} className="card-img-top" alt="Book Cover" />
              <div className="card-body">
                <h5 className="card-title">Book RECO</h5>
                <p className="card-text">For All Your Reading Needs</p>
                <Link
                  to="/books"
                  className={`btn btn-primary ${classes.open_text}`}
                >
                  Click Here
                </Link>
              </div>
            </div>
          </div>

          {/* More book cards go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
