import classes from "../bookComponents/Book.module.css";
import styles from "../authComponents/Auth.module.css";
const BookModal = ({ book, handleClose, showModal }) => {
  const {
    title = "Unknown Title",
    previewLink,
    imageLinks,
    authors = ["Unknown Author"],
    categories = ["Unknown Category"],
    publishedDate = "Unknown Date",
  } = book?.volumeInfo || {};

  const viewability = book?.accessInfo?.viewability;

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
              <div className={`modal-body ${classes.modal_body}`}>
                <p className={`card-text ${classes.book_category}`}>
                  <strong>Category</strong>
                  <br /> {categories.join(", ")}
                </p>
                <p>
                  <strong>Author</strong>
                  <br />
                  {book?.volumeInfo?.authors?.join(", ") || "Unknown"}
                </p>
                <p className={`card-text ${classes.book_date}`}>
                  <strong>Published Date</strong>
                  <br /> {publishedDate}
                </p>
                <p>
                  <strong>Description</strong>
                  <br />
                  {book?.volumeInfo?.description || "No Description Available"}
                </p>

                {viewability === "PARTIAL" ||
                viewability === "ALL_PAGES" ||
                viewability === "FULL_PUBLIC_DOMAIN" ? (
                  <a
                    href={previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={classes.modal_btn}>Read/Preview</button>
                  </a>
                ) : (
                  <p style={{ color: "#ff0000", padding: "10px" }}>
                    Preview not available
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className={`btn btn-secondary ${classes.modal_btn}`}
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
