import Nav from './Nav'
import Content from './Content'
import Search from './Search'
export default function Bookmark() {
  return (
      <div className='showcase'>
        <Nav/>
        <Search />
        <Content heading={"Bookmarked Movies"} row={"grid-row-2"}/>
        <Content heading={"Bookmarked TV Series"}/>
    </div>
  )
}
