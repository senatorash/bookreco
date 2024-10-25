import aboutImg from "../../Assets/about-img.png";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
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
                <h2>About BookReco</h2>
              </div>
              <p>
                Welcome to Bookreco, your one-stop destination for discovering a
                world of literature at your fingertips. We are an online
                bookstore dedicated to making reading more accessible,
                convenient, and enjoyable. Whether you’re a casual reader, a
                student, or a literary enthusiast, we bring a diverse selection
                of books across all genres straight to your screen.
                <br />
                <br />
                Our carefully curated collection spans everything from
                bestsellers and classics to indie gems and new releases. We
                believe that the right book can change your life, and we are
                committed to helping you find it, no matter your taste or
                interest.
                <br />
                <br />
                At Bookreco, we combine the charm of a traditional bookstore
                with the convenience of modern technology. Our web application
                offers an intuitive and user-friendly experience, allowing you
                to browse, search, and shop with ease. Plus, our recommendation
                system helps you discover books tailored to your preferences,
                ensuring every read is a good one. Join us on this literary
                journey and explore a universe of stories, knowledge, and
                imagination. Happy reading! Feel free to modify the name or tone
                to match your brand’s personality!
              </p>
              <Link href="/dashboard">Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
