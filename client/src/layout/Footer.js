const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer_section">
      <div className="container">
        <p>
          &copy; <span>{currentYear}</span> All Rights Reserved By
          <a
            href="https://html.design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Senator Ash
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
