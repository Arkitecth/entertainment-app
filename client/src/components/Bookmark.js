import Nav from "./Nav";
import Content from "./Content";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
async function getBookmarked(userData) {
  try {
    const response = await fetch(
      `http://localhost:3001/auth/getBookmarks/${userData}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default function Bookmark({ userData }) {
  let moviePosition = "grid-row-2";
  let seriesPosition = "grid-row-3";
  const [dataObj, setDataObj] = useState([]);
  useEffect(() => {
    getBookmarked(userData).then((data) => {
      setDataObj(data);
    });
  }, [userData]);

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
