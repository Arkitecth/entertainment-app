import Nav from './Nav'
import Trending from './Trending'
import Content from './Content'
import SearchBar from './SearchBar'
import contentData from "../data.json"
// import { useEffect, useState } from "react";
export default function Home() {
  // const [data, setData] = useState([]); 
  //   useEffect(() => {
  //     async function getData() {
  //         const res = await fetch("./data.json");
  //         const data = await res.json(); 
  //         setData(data);
  //     }
  //     getData()
  // }, [])
    return (
      <div className='showcase'>
        <Nav/>
        <SearchBar />
          {/* Trending Page */}
          <Trending dataObj={ contentData.filter((data) => data.isTrending) }/>
          {/* Recommended Page */}
        <Content dataObj={  contentData.filter((data) => !data.isTrending) } heading={"Recommended For You"} row={"grid-row-3"}/>
      </div>
    )
}
