import React from 'react'
import logo from "./assets/logo.svg"
import homeIcon from "./assets/icon-nav-home.svg"
import movieIcon from "./assets/icon-nav-movies.svg"
import tvIcon from "./assets/icon-nav-tv-series.svg"
import bookmarkNav from "./assets/icon-nav-bookmark.svg"
import imageAvatar from "./assets/image-avatar.png"
import searchIcon from "./assets/icon-search.svg"

export default function Home() {
  return (
    <div className='showcase'>
        <nav className='navbar'>
            <img className='logo' src={logo} alt="Logo" /> 
            <div className="nav-icons">
                <img src={homeIcon} alt="homeIcon" />
                <img src={movieIcon} alt="movieIcon" />
                <img src={tvIcon} alt="tvIcon" />
                <img src={bookmarkNav} alt="bookmarkNav" />
            </div>
            <img className='avatar' src={imageAvatar} alt="imageAvatar" />
        </nav>
        <div className="search-bar">
            <img className='search-icon' src={searchIcon} alt="searchIcon" />
            <input type="text" name="search" id="search" placeholder='Search for movies'/>
        </div>

        {/* Trending Page */}
        <div className="trending-page">
            <h2>Trending</h2>
            <div className="carousel">
                <div className="trending card"></div>
            </div>
           
        </div>
    </div>
  )
}
