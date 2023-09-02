import "./styles.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Bookmark from "./components/Bookmark";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  function getEmail(element) {
    setEmail(element);
  }
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login getEmail={getEmail} />} />
          <Route exact path="/sign-up" Component={SignUp} />
          <Route exact path="/home" element={<Home email={email} />} />
          <Route exact path="/movies" element={<Movies email={email} />} />
          <Route exact path="/series" element={<Series email={email} />} />
          <Route
            exact
            path="/bookmarks"
            element={<Bookmark userData={email} />}
          />
          <Route exact path="/search" Component={Search} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
