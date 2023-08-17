import Content from "./Content";
import Nav from "./Nav";
import Search from "./Search";
export default function Series() {
  return (
    <div className='showcase'>
      <Nav/>
      <Search />
      <Content heading={"Series"} row={"grid-row-2"}/>
  </div>
  )
}
