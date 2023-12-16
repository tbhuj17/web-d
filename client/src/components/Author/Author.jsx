import React, { useState, useEffect } from "react";
import axios from "axios";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3007/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:3007/authors/${searchTerm}`)
      .then((response) => {
        setSearchResult(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching author search result:", error);
        setSearchResult(null);
        setError(error.response?.status === 404 ? "Author not found" : "Internal Server Error");
      });
  };

  return (
    <div>
      <h1>Authors</h1>
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
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Birth Place</th>
                <th>Birth Date</th>
                <th>Genre</th>
                <th>Followers</th>
                <th>About Author</th>
              </tr>
            </thead>
            <tbody>
              <tr key={searchResult.author_id}>
                <td>{searchResult.author_id}</td>
                <td>{searchResult.name}</td>
                <td>{searchResult.birth_place}</td>
                <td>{searchResult.birth_date}</td>
                <td>{searchResult.genre}</td>
                <td>{searchResult.followers_count}</td>
                <td>{searchResult.about_author}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Birth Place</th>
              <th>Birth Date</th>
              <th>Genre</th>
              <th>Followers</th>
              <th>About Author</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.author_id}>
                <td>{author.author_id}</td>
                <td>{author.name}</td>
                <td>{author.birth_place}</td>
                <td>{author.birth_date}</td>
                <td>{author.genre}</td>
                <td>{author.followers_count}</td>
                <td>{author.about_author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Author;
