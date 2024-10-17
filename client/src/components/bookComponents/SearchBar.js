import { useState } from "react";
import classes from "../authComponents/Auth.module.css";

const SearchBar = ({ fetchBooks }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      fetchBooks(input);
    }
    setInput("");
  };

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
          <div
            className={`form-group ${classes.wrapper}`}
            style={{ marginBottom: "100px" }}
          >
            <h3 className="mb-5">Search For Books</h3>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Search for books..."
              // value={input}
              onChange={(event) => setInput(event.target.value)}
            />

            <input
              className={`form-control ${classes.signup_btn}`}
              type="Submit"
            />
          </div>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default SearchBar;
