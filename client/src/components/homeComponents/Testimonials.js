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
                  “A Book Lover’s Paradise!” <br />
                  “I absolutely love this online bookstore! The selection is
                  incredible, and I always find something new to add to my
                  reading list. The site is super easy to navigate, and I love
                  the personalized recommendations. It feels like having my own
                  personal librarian guiding me to the perfect read every time!”
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
                  “Convenience Meets Quality”
                  <br /> “As a busy professional, I don’t always have time to
                  visit a physical bookstore. [Your Bookstore Name] makes it so
                  easy to find and order the books I want. Their delivery is
                  fast, and the customer service is excellent. I also appreciate
                  the wide range of genres and niche titles they offer.”
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
                  “Best Online Bookstore Experience!”
                  <br /> “I’ve tried several online bookstores, but this one is
                  by far the best. The user experience is seamless, and the
                  variety of books is unbeatable. Plus, the prices are fair, and
                  the detailed book descriptions and reviews help me choose
                  exactly what I’m looking for. I’ve found so many hidden gems
                  here!”
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
