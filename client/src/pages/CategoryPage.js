import cat1 from "../Assets/cat1.png";
import cat2 from "../Assets/cat2.png";
import cat3 from "../Assets/cat3.png";
import cat4 from "../Assets/cat4.png";
import cat5 from "../Assets/cat5.png";
import cat6 from "../Assets/cat6.png";
import InfoSection from "../components/homeComponents/InfoSection";

const CategoryPage = () => {
  return (
    <>
      <section className="catagory_section layout_padding">
        <div className="catagory_container">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>Books Categories</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration
              </p>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat1} alt="Textbooks" />
                  </div>
                  <div className="detail-box">
                    <h5>Textbooks</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat2} alt="Science" />
                  </div>
                  <div className="detail-box">
                    <h5>Science</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat3} alt="History" />
                  </div>
                  <div className="detail-box">
                    <h5>History</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat4} alt="Biography" />
                  </div>
                  <div className="detail-box">
                    <h5>Biography</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat5} alt="Adventure" />
                  </div>
                  <div className="detail-box">
                    <h5>Adventure</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src={cat6} alt="Fantasy" />
                  </div>
                  <div className="detail-box">
                    <h5>Fantasy</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CategoryPage;
