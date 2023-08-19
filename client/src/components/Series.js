import Content from "./Content";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import contentData from "../data.json"
export default function Series() {

  return (
    <div className='showcase'>
      <Nav/>
      <SearchBar />
      <Content  heading={"TV Series"} dataObj={contentData.filter((data) => data.category === "TV Series") } />
  </div>
  )
}
