import Nav from "./Nav";
import Trending from "./Trending";
import Content from "./Content";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";

export async function getData(userData) {
  const response = await fetch(
    `http://localhost:3001/auth/discover/${userData}`
  );
  const results = await response.json();
  return results;
}

export default function Home({ email }) {
  const [dataObj, setDataObj] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(email);
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
          {/* Trending Page */}
          <Trending userData={email} />
          {/* Recommended Page */}
          <Content
            userData={email}
            dataObj={dataObj}
            heading={"Recommended For You"}
          />
        </>
      )}
    </div>
  );
}
