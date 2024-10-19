import cat1 from "../../Assets/cat1.png";
import cat2 from "../../Assets/cat2.png";
import cat3 from "../../Assets/cat3.png";
import cat4 from "../../Assets/cat4.png";
import cat5 from "../../Assets/cat5.png";
import cat6 from "../../Assets/cat6.png";

const CategorySection = () => {
  return (
    <section className="catagory_section layout_padding">
      <div className="catagory_container">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Books Categories</h2>
            <p></p>
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
                    Empower your learning journey with our comprehensive range
                    of textbooks. Whether for school, college, or self-study,
                    we’ve got the resources to help you excel.
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
                    Dive into the wonders of the universe and uncover the
                    mysteries of life with our science collection, where
                    discovery meets curiosity.
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
                    Travel through time with our history section, bringing the
                    past to life and revealing the stories that shaped the world
                    we live in today
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
                    Explore the lives of fascinating individuals, from world
                    leaders to innovators, and be inspired by their incredible
                    journeys and achievements.
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
                    Unleash your inner explorer with our adventure books, where
                    every page is packed with excitement, danger, and the thrill
                    of the unknown.
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
                    Step into magical realms and epic quests with our fantasy
                    collection, where imagination knows no bounds and heroes are
                    born
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
