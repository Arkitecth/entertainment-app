import movieCategoryIcon from "../assets/icon-category-movie.svg";
import BookmarkIcon from "./BookmarkIcon";
import seriesCategoryIcon from "../assets/icon-category-tv.svg";
export default function Content({ heading, row, dataObj }) {
  let userData = localStorage.getItem("id");
  return (
    <div className={`main-page ${row}`}>
      <h2 className="heading">{heading}</h2>
      <div className="main-content">
        {/* https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg  */}
        {dataObj.map((data) => (
          <div
            key={data.id}
            className="card"
            style={{
              background: `url("https://image.tmdb.org/t/p/w400${data.cover}"`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BookmarkIcon userData={userData} data={data} />
            <div className="description content">
              <div className="details">
                <ul>
                  <li className="remove-style">2023</li>
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
                  <li>{data.genre}</li>
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
