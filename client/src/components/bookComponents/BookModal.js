import classes from "../bookComponents/Book.module.css";
import styles from "../authComponents/Auth.module.css";
const BookModal = ({ book, handleClose, showModal }) => {
  const {
    title = "Unknown Title",
    imageLinks,
    authors = ["Unknown Author"],
    categories = ["Unknown Category"],
    publishedDate = "Unknown Date",
  } = book?.volumeInfo || {};
  return (
    <>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className={`modal-dialog ${styles.wrapper}`} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{book?.volumeInfo?.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p className={`card-text ${classes.book_category}`}>
                  <strong>Category:</strong> {categories.join(", ")}
                </p>
                <p>
                  <strong>Author:</strong>{" "}
                  {book?.volumeInfo?.authors?.join(", ") || "Unknown"}
                </p>
                <p className={`card-text ${classes.book_date}`}>
                  <strong>Published Date:</strong> {publishedDate}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {book?.volumeInfo?.description || "No Description Available"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookModal;
