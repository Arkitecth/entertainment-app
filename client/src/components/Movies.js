import Content from "./Content";
import Nav from "./Nav";
import Search from "./Search";
import contentData from "../data.json"
export default function Movies() {
  return(
    <div className='showcase'>
      <Nav/>
      <Search />
      <Content heading={"Movies"} row={"grid-row-2"} dataObj={contentData.filter((data) => data.category === "Movie") } />
  </div>
)
}
