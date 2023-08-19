import Nav from './Nav'
import Content from './Content'
import SearchBar from './SearchBar'
import contentData from "../data.json"
export default function Bookmark() {
  let moviePosition = "grid-row-2"; 
  let seriesPosition = "grid-row-3"
  return (
      <div className='showcase'>
        <Nav/>
        <SearchBar />
        <Content heading={"Bookmarked Movies"} row={moviePosition} dataObj={contentData.filter((data) => data.category === "Movie" && data.isBookmarked === true) } />
        <Content heading={"Bookmarked TV Series"} row={seriesPosition} dataObj={contentData.filter((data) => data.category === "TV Series" && data.isBookmarked === true) } />
    </div>
  )
}
