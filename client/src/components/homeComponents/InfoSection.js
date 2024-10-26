import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const InfoSection = () => {
  return (
    <section className="info_section layout_padding2">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-6 col-lg-3 info-col">
            <div className="info_detail">
              <h4>About Us</h4>
              <p>
                We believe that the right book can change your life, and we are
                committed to helping you find it, no matter your taste or
                interest.
              </p>
              <div className="info_social">
                <Link to="https://facebook.com">
                  <i className="fab fa-facebook"></i> {/* Facebook Icon */}
                </Link>
                <Link to="#">
                  <i className="fab fa-twitter"></i> {/* Twitter Icon */}
                </Link>
                <Link href="#">
                  <i className="fab fa-linkedin"></i> {/* LinkedIn Icon */}
                </Link>
                <Link href="#">
                  <i className="fab fa-instagram"></i> {/* Instagram Icon */}
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-md-6 col-lg-3 info-col">
            <div className="info_contact">
              <h4>Address</h4>
              <div className="contact_link_box">
                <Link to="#">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {/* Map Marker Icon */}
                  <span>San Francisco</span>
                </Link>
                <Link to="#">
                  <i className="fas fa-phone"></i> {/* Phone Icon */}
                  <span>Call +01 1234567890</span>
                </Link>
                <Link to="#">
                  <i className="fas fa-envelope"></i>{" "}
                  {/* Envelope (Email) Icon */}
                  <span>bookreco@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-6 col-lg-3 info-col">
            <div className="info_contact">
              <h4>Newsletter</h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-md-6 col-lg-3 info-col">
            <MapComponent apiKey={apiKey} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
