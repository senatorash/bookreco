import InfoSection from "../components/homeComponents/InfoSection";
import ContactImg from "../Assets/contact-img.png";

const ContactPage = () => {
  return (
    <>
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="heading_container">
                <h2>Contact Us</h2>
              </div>
              <form action="#">
                <div>
                  <input type="text" placeholder="Name" />
                </div>
                <div>
                  <input type="email" placeholder="Email" />
                </div>
                <div>
                  <input type="text" placeholder="Phone Number" />
                </div>
                <div>
                  <input
                    type="text"
                    className="message-box"
                    placeholder="Message"
                  />
                </div>
                <div className="btn-box">
                  <button type="submit">SEND</button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={ContactImg} alt="Contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContactPage;
