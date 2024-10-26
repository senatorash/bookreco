import { useState, useEffect } from "react";
import { booksApi } from "../../lib/apis/booksApi";
import BookList from "../bookComponents/BookList";
import SearchBar from "./SearchBar";

const BookData = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const maxResults = 10;

  const onGetBooksData = async (query) => {
    const result = await booksApi(query, startIndex, maxResults);

    if (result.error) {
      return setErrorMessage(result.error);
    }
    if (result.length > 0) {
      setBooks((prevBooks) => [...prevBooks, ...result]);
      setHasMore(result.length === maxResults);
    } else {
      setHasMore(false);
    }
  };

  const handleSearch = (query) => {
    setQuery(query);
    setBooks([]);
    setStartIndex(0);
    onGetBooksData(query);
  };

  const loadMoreBooks = () => {
    setStartIndex((prevIndex) => prevIndex + maxResults);
  };
  useEffect(() => {
    if (query) {
      onGetBooksData(query, startIndex);
    }
  }, [query, startIndex]);
  return (
    <div style={{ marginTop: "30px" }}>
      <SearchBar fetchBooks={handleSearch} />
      <BookList books={books} hasMore={hasMore} loadMoreBooks={loadMoreBooks} />
    </div>
  );
};
export default BookData;
