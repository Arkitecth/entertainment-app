import Nav from './Nav'
import Trending from './Trending'
import Content from './Content'
import SearchBar from './SearchBar'
import contentData from "../data.json"
export default function Home() {
    return (
      <div className='showcase'>
        <Nav/>
        <SearchBar />
          {/* Trending Page */}
          <Trending dataObj={ contentData.filter((data) => data.isTrending) }/>
          {/* Recommended Page */}
        <Content dataObj={  contentData.filter((data) => !data.isTrending) } heading={"Recommended For You"}/>
      </div>
    )
}
