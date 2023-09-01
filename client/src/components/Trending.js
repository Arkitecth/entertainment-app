import React, { useEffect, useState } from "react";
import movieCategoryIcon from "../assets/icon-category-movie.svg";
import seriesCategoryIcon from "../assets/icon-category-tv.svg";
import BookmarkIcon from "./BookmarkIcon";
async function getTrending() {
  const response = await fetch("http://localhost:3001/auth/trending");
  const trending = await response.json();
  return trending;
}

export default function Trending({ userData }) {
  const [dataObj, setDataObj] = useState([]);
  useEffect(() => {
    getTrending().then((data) => {
      setDataObj(data);
    });
  }, []);

  return (
    <div className="trending-page">
      <h2>Trending</h2>
      <div className="carousel">
        {dataObj.map((data) => (
          <div
            key={data.id}
            className="trending card"
            style={{
              background: `url("https://image.tmdb.org/t/p/w500${data.cover}")`,
            }}
          >
            <BookmarkIcon userData={userData} data={data} />
            <div className="description">
              <div className="details">
                <ul>
                  <li className="remove-style"> {data.date}</li>
                  <li>
                    {data.media_type === "movie" ? (
                      <img
                        className="cat-icon"
                        src={movieCategoryIcon}
                        alt="categoryIcon"
                      />
                    ) : (
                      <img
                        className="cat-icon"
                        src={seriesCategoryIcon}
                        alt="categoryIcon"
                      />
                    )}
                    {data.media_type}
                  </li>
                  <li>{data.date}</li>
                </ul>
              </div>
              <h2>{data.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
