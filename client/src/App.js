import "./styles.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Bookmark from "./components/Bookmark";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
    return(
        <>
          <Router>
            <Routes>
              <Route exact path="/" Component={SignUp}/>
              <Route exact path="/login" Component={Login}/>
              <Route exact path="/home" Component={Home}/>
              <Route exact path="/movies" Component={Movies}/>
              <Route exact path="/series" Component={Series}/>
              <Route exact path="/bookmarks" Component={Bookmark}/>
              <Route exact path="/search" Component={Search} />
            </Routes>
            
          </Router>
        
        </>
    )
}


export default App; 