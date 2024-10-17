import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.5244, // Latitude of Lagos
  lng: 3.3792,
};

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
                Vitae aut explicabo fugit facere alias distinctio, exem commodi
                mollitia minusem dignissimos atque asperiores incidunt vel
                voluptate iste.
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
                  <span>Location</span>
                </Link>
                <Link to="#">
                  <i className="fas fa-phone"></i> {/* Phone Icon */}
                  <span>Call +01 1234567890</span>
                </Link>
                <Link to="#">
                  <i className="fas fa-envelope"></i>{" "}
                  {/* Envelope (Email) Icon */}
                  <span>demo@gmail.com</span>
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
            <div className="map_container">
              <div className="map">
                <div id="googleMap">
                  <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={10}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  </LoadScript>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
