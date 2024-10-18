import { useState } from "react";
import classes from "./Book.module.css";
import BookReco from "../../Assets/Book Reco.png";
import BookModal from "./BookModal";
const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const {
    title = "Unknown Title",
    imageLinks,
    authors = ["Unknown Author"],
    categories = ["Unknown Category"],
    publishedDate = "Unknown Date",
  } = book?.volumeInfo || {};

  const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;
  const truncatedAuthors =
    authors.join(", ").length > 1
      ? `${authors.slice(0, 1)}...`
      : authors.join(", ");

  return (
    <div className="col-lg-3 col-md-4">
      <div className={`card ${classes.book_card}`}>
        <img
          src={
            imageLinks?.large ||
            imageLinks?.smallThumbnail ||
            BookReco ||
            "default_image.jpg"
          }
          alt={title}
          className={`card-img-top ${classes.book_img}`}
          // style={{ height: "250px", objectFit: "cover" }}
        />
        <div className={`card-body ${classes.card_body}`}>
          <div style={{ alignItems: "center" }}>
            <h5 className={`card-title ${classes.book_title}`} title={title}>
              {truncatedTitle}
            </h5>
            <p
              className={`card-text ${classes.book_author}`}
              title={authors.join(", ")}
            >
              {truncatedAuthors}
            </p>
          </div>
          <button
            href="#"
            className={` ${classes.details_btn}`}
            onClick={handleShow}
          >
            Learn More
          </button>
        </div>
      </div>
      {/* Modal */}
      <BookModal book={book} handleClose={handleClose} showModal={showModal} />
    </div>
  );
};

export default BookCard;
