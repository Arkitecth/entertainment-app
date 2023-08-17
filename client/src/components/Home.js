import Nav from './Nav'
import Trending from './Trending'
import Content from './Content'
import Search from './Search'
export default function Home() {
  return (
    <div className='showcase'>
       <Nav/>
       <Search />
        {/* Trending Page */}
        <Trending />
        {/* Recommended Page */}
       <Content heading={"Recommended For You"} row={"grid-row-3"}/>
    </div>
  )
}
