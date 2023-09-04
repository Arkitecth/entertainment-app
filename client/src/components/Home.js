import Nav from "./Nav";
import Trending from "./Trending";
import Content from "./Content";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";

export async function getData(url) {
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

export default function Home({ email }) {
  const [dataObj, setDataObj] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const discoverUrl = `http://localhost:3001/auth/discover/${email}`;
  const trendingUrl = `http://localhost:3001/auth/trending/${email}`;
  useEffect(() => {
    getData(discoverUrl).then((data) => {
      setDataObj(data);
      setLoading(false);
    });
    getData(trendingUrl).then((data) => {
      setTrendingData(data);
    });
  }, [discoverUrl, trendingUrl]);
  return (
    <div className="showcase">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav />
          <SearchBar />
          {/* Trending Page */}
          <Trending dataObj={trendingData} userData={email} />
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
