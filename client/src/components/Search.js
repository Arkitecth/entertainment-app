import SearchBar from "./SearchBar";
import Nav from "./Nav";
import Content from "./Content";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "./Home";
import Spinner from "./Spinner";

export default function Search() {
  const [dataObj, setDataObj] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  let moviePosition = "grid-row-2";
  const title = state.title;
  let email = localStorage.getItem("id");
  let searchUrl = `http://localhost:3001/auth/search/${email}/${title}`;
  useEffect(() => {
    getData(searchUrl).then((data) => {
      setDataObj(data);
      setLoading(false);
    });
  }, [searchUrl]);

  return (
    <div className="showcase">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Nav />
          <SearchBar loading={setLoading} />
          <Content
            row={moviePosition}
            heading={`Found ${dataObj.length} Results For ${title}`}
            dataObj={dataObj}
          />
        </>
      )}
    </div>
  );
}
