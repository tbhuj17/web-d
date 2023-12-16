import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3007/books")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3007/books/${searchTerm}`)
      .then((response) => {
        setSearchResult(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching search result:", error);
        setSearchResult(null);
        setError(
          error.response?.status === 404
            ? "Book not found"
            : "Internal Server Error"
        );
      });
  };

  const renderBooks = (books) => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author ID</th>
          <th>Rating</th>
          <th>Rating Count</th>
          <th>Review Count</th>
          <th>Description</th>
          <th>Pages</th>
          <th>Date of Publication</th>
          <th>Edition Language</th>
          <th>Price</th>
          <th>Online Stores</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.book_id}>
            <td>{book.book_id}</td>
            <td>{book.title}</td>
            <td>{book.author_id}</td>
            <td>{book.rating}</td>
            <td>{book.rating_count}</td>
            <td>{book.review_count}</td>
            <td>{book.description}</td>
            <td>{book.pages}</td>
            <td>{book.date_of_publication}</td>
            <td>{book.edition_language}</td>
            <td>{book.price}</td>
            <td>{book.online_stores}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <label htmlFor="searchInput">Search by ID: </label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error ? (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      ) : searchResult ? (
        <div>
          <h3>Search Result</h3>
          {renderBooks([searchResult])}
        </div>
      ) : (
        <div>
          <h3>All Books</h3>
          {renderBooks(data)}
        </div>
      )}
    </div>
  );
};

export default Home;
