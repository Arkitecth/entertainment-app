import homeIcon from "../assets/icon-nav-home.svg"
import logo from "../assets/logo.svg"
import movieIcon from "../assets/icon-nav-movies.svg"
import tvIcon from "../assets/icon-nav-tv-series.svg"
import bookmarkNav from "../assets/icon-nav-bookmark.svg"
import imageAvatar from "../assets/image-avatar.png"
import { NavLink } from "react-router-dom"
export default function Nav() {

 
  return (
    <>
     <nav className='navbar'>
            <img className='logo' src={logo} alt="Logo" /> 
            <div className="nav-icons">
            <NavLink activeclassname={'active'} to="/"> <img src={homeIcon} alt="homeIcon" /> </NavLink>
            <NavLink to="/movies"> <img src={movieIcon} alt="movieIcon" /></NavLink>
            <NavLink to="/series"> <img src={tvIcon} alt="tvIcon" /> </NavLink>
            <NavLink to="/bookmarks"> <img src={bookmarkNav} alt="bookmarkNav" />  </NavLink>
            </div>
            <img className='avatar' src={imageAvatar} alt="imageAvatar" />
        </nav>
    </>
   
  )
}
