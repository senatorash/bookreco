import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import sliderImg from "../../Assets/slider-img.png";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="slider_section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className={`detail-box ${classes.detail_box}`}>
                        <h5>BookReco</h5>

                        <h1>
                          Limitless <span>Literature</span>, Endless Discovery
                        </h1>
                        <Link className="mb-5" to="/dashboard">
                          Read More
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="img-box mt-3">
                        <img src={sliderImg} alt="slider" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add more carousel items here */}
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="detail-box">
                        <h5>BookReco</h5>
                        <h1>
                          For All Your <br />
                          <span>Reading</span> Needs
                        </h1>
                        <p>
                          It is very important for the customer to pay attention
                          to the adipiscing process. He who wants to often leave
                          the pain to the option.
                        </p>
                        <Link to="/dashboard">Read More</Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="img-box">
                        <img src={sliderImg} alt="slider" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add more carousel items here */}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
export default HeroSection;
