import Nav from "./Nav";
import Trending from "./Trending";
import Content from "./Content";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export async function getData() {
  const response = await fetch("http://localhost:3001/auth/discover");
  const results = await response.json();
  return results;
}

export default function Home() {
  const [dataObj, setDataObj] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    getData().then((data) => {
      setDataObj(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="showcase">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav />
          <SearchBar />
          {/* Trending Page */}
          <Trending userData={state} />
          {/* Recommended Page */}
          <Content
            userData={state}
            dataObj={dataObj}
            heading={"Recommended For You"}
          />
        </>
      )}
    </div>
  );
}
