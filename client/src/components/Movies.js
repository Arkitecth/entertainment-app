import Content from "./Content";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import contentData from "../data.json"

export default function Movies() {
  
  return(
    <div className='showcase'>
      <Nav/>
      <SearchBar />
      <Content heading={"Movies"} dataObj={contentData.filter((data) => data.category === "Movie") } />
  </div>
)
}
