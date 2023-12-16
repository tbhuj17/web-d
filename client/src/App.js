import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Author from "./components/Author/Author";
import Books from "./components/Books/Books";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Books />} />
        <Route path="/author" element={<Author />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
