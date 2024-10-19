import { useState, useEffect } from "react";
import classes from "../authComponents/Auth.module.css";
import styles from "../bookComponents/Book.module.css";

const SearchBar = ({ fetchBooks }) => {
  const [input, setInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Function to store search query in local storage
  const storeSearchHistory = (query) => {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.includes(query)) {
      history.unshift(query);
    }

    if (history.length > 5) {
      history.pop();
    }

    // Avoid duplicate entries
    if (!history.includes(query)) {
      history.push(query);
    }

    localStorage.setItem("searchHistory", JSON.stringify(history));
    setSearchHistory(history.slice(0, 5)); // Update the state to reflect changes
  };

  // Load search history when the component mounts
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      fetchBooks(input); // Trigger book search with the input
      storeSearchHistory(input); // Store the search in local storage
    }
    setInput(""); // Clear the input field
  };

  // Function to handle clicks on a search history item
  const handleHistoryClick = (query) => {
    fetchBooks(query);
    setInput(query);
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
              value={input} // Set the value of input to the state
              onChange={(event) => setInput(event.target.value)}
            />

            <input
              className={`form-control mb-5 ${classes.signup_btn}`}
              type="submit"
              value="Search"
            />

            {searchHistory.length > 0 && (
              <div className="search-history">
                <h4>
                  Your Previous Searches{" "}
                  <hr style={{ color: "black", fontWeight: "800" }} />
                </h4>
                <ul>
                  {searchHistory.map((query, index) => (
                    <li
                      className={styles.search_btn}
                      key={index}
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleHistoryClick(query)}
                    >
                      {query}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>

        {/* Display the Search History */}
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default SearchBar;
