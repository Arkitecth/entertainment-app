import Content from "./Content";
import Nav from "./Nav";
import Search from "./Search";
export default function Movies() {
  return(
    <div className='showcase'>
      <Nav/>
      <Search />
      <Content heading={"Movies"} row={"grid-row-2"}/>
  </div>
)
}
