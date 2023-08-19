import React, { useState } from 'react'
import searchIcon from "../assets/icon-search.svg"
import {useNavigate } from "react-router-dom"
export default function SearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  function handleSearch(event) {
    event.preventDefault(); 
    navigate('/search',  { state: {title: searchText} })
  }

  function handleChange(event) {
    setSearchText(event.target.value);
  }
  return (
    <form onSubmit={e => handleSearch(e)} className="search-bar">
        <img className='search-icon' src={searchIcon} alt="searchIcon" />
        <input onChange={e => handleChange(e)} value={searchText} type="text" name="search" id="search" placeholder='Search for movies'/>
    </form>
  )
}
