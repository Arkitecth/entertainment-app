import Nav from "./Nav";
import Trending from "./Trending";
import Content from "./Content";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

async function getData() {
  const response = await fetch("http://localhost:3001/auth/discover");
  const results = await response.json();
  return results;
}

export default function Home() {
  const [dataObj, setDataObj] = useState([]);
  useEffect(() => {
    getData().then((data) => {
      setDataObj(data);
    });
  }, []);

  return (
    <div className="showcase">
      <Nav />
      <SearchBar />
      {/* Trending Page */}
      <Trending />
      {/* Recommended Page */}
      <Content dataObj={dataObj} heading={"Recommended For You"} />
    </div>
  );
}
