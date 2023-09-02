import Content from "./Content";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import { getData } from "./Home";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export default function Movies({ email }) {
  const [dataObj, setDataObj] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData(email).then((data) => {
      setDataObj(data);
      setLoading(false);
    });
  }, [email]);
  return (
    <div className="showcase">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav />
          <SearchBar />
          <Content
            userData={email}
            heading={"Movies"}
            dataObj={dataObj.filter((data) => data.media_type === "movie")}
          />
        </>
      )}
    </div>
  );
}
