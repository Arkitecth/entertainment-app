import Nav from "./Nav";
import Content from "./Content";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { getData } from "./Home";

export default function Bookmark({ userData }) {
  let moviePosition = "grid-row-2";
  let seriesPosition = "grid-row-3";
  const [dataObj, setDataObj] = useState([]);
  const url = `http://localhost:3001/auth/getBookmarks/${userData}`;
  useEffect(() => {
    getData(url).then((data) => {
      setDataObj(data);
    });
  }, [url]);

  return (
    <div className="showcase">
      <Nav />
      <SearchBar />
      <Content
        heading={"Bookmarked Movies"}
        row={moviePosition}
        userData={userData}
        dataObj={dataObj.filter((element) => element.media_type === "movie")}
      />
      <Content
        heading={"Bookmarked TV Series"}
        row={seriesPosition}
        dataObj={dataObj.filter((element) => element.media_type === "tv")}
        userData={userData}
      />
    </div>
  );
}
