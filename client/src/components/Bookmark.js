import Nav from './Nav'
import Content from './Content'
import Search from './Search'
import contentData from "../data.json"
export default function Bookmark() {
  return (
      <div className='showcase'>
        <Nav/>
        <Search />
        <Content heading={"Bookmarked Movies"} row={"grid-row-2"} dataObj={contentData.filter((data) => data.category === "Movie" && data.isBookmarked === true) } />
        <Content heading={"Bookmarked TV Series"} row={"grid-row-3"} dataObj={contentData.filter((data) => data.category === "TV Series" && data.isBookmarked === true) } />
    </div>
  )
}
