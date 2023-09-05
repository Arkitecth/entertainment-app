import Content from "./Content";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import { getData } from "./Home";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export default function Movies() {
  const [dataObj, setDataObj] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("id");
  const url = `http://localhost:3001/auth/discover/${email}`;
  useEffect(() => {
    getData(url).then((data) => {
      setDataObj(data);
      setLoading(false);
    });
  }, [url]);
  return (
    <div className="showcase">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav />
          <SearchBar />
          <Content
            heading={"Movies"}
            dataObj={dataObj.filter((data) => data.media_type === "movie")}
          />
        </>
      )}
    </div>
  );
}
