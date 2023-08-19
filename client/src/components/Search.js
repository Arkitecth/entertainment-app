import SearchBar from "./SearchBar"
import Nav from "./Nav"
import Content from "./Content"
import contentData from "../data.json"
import { useLocation } from "react-router-dom"
export default function Search() {
    const {state} = useLocation(); 
    const title  = state.title;
    const filteredData = contentData.filter((data) => data.title.includes(title))
  return (
    <div className='showcase'>
        <Nav />
        <SearchBar /> 
        <Content heading={`Found ${filteredData.length} Results For ${title}`} dataObj={filteredData} />
    </div>
   
  )
}

