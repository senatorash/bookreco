import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../bookComponents/BookCard";

const BookList = ({ books, loadMoreBooks, hasMore }) => {
  return (
    <div className="container">
      <InfiniteScroll
        dataLength={books.length}
        next={loadMoreBooks}
        fetchMore={loadMoreBooks}
        hasMore={hasMore}
        style={{ overflow: "hidden" }}
      >
        <div className="row">
          {books.length > 0 &&
            books.map((book, index) => {
              return (
                <BookCard
                  key={book.id ? book.id : `${book.id}-${index}`}
                  book={book}
                />
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookList;
