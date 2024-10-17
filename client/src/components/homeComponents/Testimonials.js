import { Link } from "react-router-dom";
import c1 from "../../Assets/c1.jpg";
import c2 from "../../Assets/c2.jpg";
import c3 from "../../Assets/c3.jpg";

const Testimonials = () => {
  return (
    <section className="client_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>What Says Customers</h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="client_container">
              <div className="detail-box">
                <p>
                  Editors now use Lorem Ipsum as their default model text, and a
                  search for 'lorem ipsum' will uncover many web sites still in
                  their infancy. Various versions have evolved over the years,
                  sometimes by
                </p>
                <span>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </span>
              </div>
              <div className="client_id">
                <div className="img-box">
                  <img src={c1} alt="Customer 1" />
                </div>
                <div className="client_name">
                  <h5>Jone Mark</h5>
                  <h6>Student</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mx-auto">
            <div className="client_container">
              <div className="detail-box">
                <p>
                  Editors now use Lorem Ipsum as their default model text, and a
                  search for 'lorem ipsum' will uncover many web sites still in
                  their infancy. Various versions have evolved over the years,
                  sometimes by
                </p>
                <span>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </span>
              </div>
              <div className="client_id">
                <div className="img-box">
                  <img src={c2} alt="Customer 2" />
                </div>
                <div className="client_name">
                  <h5>Anna Crowe</h5>
                  <h6>Student</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mx-auto">
            <div className="client_container">
              <div className="detail-box">
                <p>
                  Editors now use Lorem Ipsum as their default model text, and a
                  search for 'lorem ipsum' will uncover many web sites still in
                  their infancy. Various versions have evolved over the years,
                  sometimes by
                </p>
                <span>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </span>
              </div>
              <div className="client_id">
                <div className="img-box">
                  <img src={c3} alt="Customer 3" />
                </div>
                <div className="client_name">
                  <h5>Hilley James</h5>
                  <h6>Student</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
