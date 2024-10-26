import InfoSection from "../components/homeComponents/InfoSection";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <InfoSection />
      <footer className="footer_section">
        <div className="container">
          <p>
            &copy; <span>{currentYear}</span> All Rights Reserved By
            <a href="">Ideal graphics</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
