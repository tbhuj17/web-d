const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

app.use(cors())

const dbpath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeServerAndDb = async (req, res) => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3007, () => {
      console.log("server started on 3007");
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
initializeServerAndDb();

app.get("/books", async (req, res) => {
  const getBookQuery = `
    SELECT * FROM book ORDER BY book_id;`;
  const booksArray = await db.all(getBookQuery);
  res.send(booksArray);
});
app.get("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const searchBookQuery = `
    SELECT * FROM book WHERE book_id = ${bookId};`;

  try {
    const book = await db.get(searchBookQuery);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/authors", async (req, res) => {
  const getAuthorQuery = `
    SELECT * FROM author ORDER BY author_id;`;
  const authorsArray = await db.all(getAuthorQuery);
  res.send(authorsArray);
});
app.get("/authors/:authorId", async (req, res) => {
  const { authorId } = req.params;
  const searchAuthorQuery = `
    SELECT * FROM author WHERE author_id = ${authorId};`;

  try {
    const author = await db.get(searchAuthorQuery);

    if (author) {
      res.send(author);
    } else {
      res.status(404).send("Author not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/books", async (req, res) => {
  const bookDetails = req.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

  const addBookQuery = `
    INSERT INTO
      book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    VALUES
      (
        '${title}',
         ${authorId},
         ${rating},
         ${ratingCount},
         ${reviewCount},
        '${description}',
         ${pages},
        '${dateOfPublication}',
        '${editionLanguage}',
         ${price},
        '${onlineStores}'
      );`;
  const dbQuery = await db.run(addBookQuery);
  res.send("Book Added Successfully!!");
});

app.put("/books/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const bookDetails = req.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

  const updateBookQuery = `
    UPDATE
      book
    SET
      title='${title}',
      author_id=${authorId},
      rating=${rating},
      rating_count=${ratingCount},
      review_count=${reviewCount},
      description='${description}',
      pages=${pages},
      date_of_publication='${dateOfPublication}',
      edition_language='${editionLanguage}',
      price= ${price},
      online_stores='${onlineStores}'
    WHERE
      book_id = ${bookId};`;

  await db.run(updateBookQuery);
  res.send("Book updated");
});

app.delete("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;

  const deleteBookQuery = `
DELETE FROM
    book
WHERE
    book_id = ${bookId};`;
  await db.run(deleteBookQuery);
  res.send("Book deleted");
});

// const myName = [
//     "Hello",
//     "hii"
// ]

// app.get("/route",(req,res) =>{
//     // res.send("Heelooo Anushkaa");
//     res.send(myName)
//     console.log("heyy")
// });

// app.listen(5000, () => {
//     console.log("Server started on port 5000");
//   });
