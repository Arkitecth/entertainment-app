import React from 'react'
import searchIcon from "../assets/icon-search.svg"
export default function Search() {
  return (
    <div className="search-bar">
        <img className='search-icon' src={searchIcon} alt="searchIcon" />
        <input type="text" name="search" id="search" placeholder='Search for movies'/>
    </div>
  )
}
