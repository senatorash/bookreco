import aboutImg from "../Assets/about-img.png";
import InfoSection from "../components/homeComponents/InfoSection";

const AboutPage = () => {
  return (
    <>
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={aboutImg} alt="About Bookstore" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Our Bookstore</h2>
                </div>
                <p>
                  But no matter how much he is bound to trouble, or to assume by
                  rejecting him! Never to be rejected. Do they result in a
                  blinded refusal to accept his pains and sufferings? For some
                  of the present, a wise flexibility should be prepared, but
                  here it will be just a pleasure! Just because their lives are
                  to be accepted, they leave the guilt itself something to be
                  softened to assume.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InfoSection />
    </>
  );
};
export default AboutPage;
