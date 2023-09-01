import React, { useEffect, useState } from "react";
import movieCategoryIcon from "../assets/icon-category-movie.svg";
import BookmarkIcon from "./BookmarkIcon";
async function getTrending() {
  const response = await fetch("http://localhost:3001/auth/trending");
  const trending = await response.json();
  const data = await trending["trending"]["results"];
  const dataDetail = await trending["detailResults"];
  return [data, dataDetail];
}

export default function Trending({ userData }) {
  const [dataObj, setDataObj] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  useEffect(() => {
    getTrending().then((data) => {
      setDataObj(data[0]);
      setDataDetail(data[1]);
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
              background: `url("https://image.tmdb.org/t/p/w500${data.backdrop_path}")`,
            }}
          >
            <BookmarkIcon userData={userData["email"]} data={data} />
            <div className="description">
              <div className="details">
                <ul>
                  <li className="remove-style">
                    {" "}
                    {data.release_date === undefined
                      ? data.first_air_date.split("-")[0]
                      : data.release_date.split("-")[0]}
                  </li>
                  <li>
                    {" "}
                    <img
                      className="cat-icon"
                      src={movieCategoryIcon}
                      alt="categoryIcon"
                    />
                    {data.media_type}
                  </li>
                  <li>
                    {data.media_type === "tv"
                      ? dataDetail[data.id].content_ratings["results"].filter(
                          (element) => element["iso_3166_1"] === "US"
                        )[0] !== undefined
                        ? dataDetail[data.id].content_ratings["results"].filter(
                            (element) => element["iso_3166_1"] === "US"
                          )[0].rating
                        : dataDetail[data.id].genres[0].name
                      : dataDetail[data.id].release_dates["results"].filter(
                          (element) => element["iso_3166_1"] === "US"
                        )[0].release_dates[0].certification ||
                        dataDetail[data.id].genres[0].name}
                  </li>
                </ul>
              </div>
              <h2>{data.title || data.original_name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
