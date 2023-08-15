import "./styles.css";
import Login from "./Login";
import Home from "./Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,

    },
    // {
    //     path: "/home",
    //     element: <Home />,
        
    // },
    
  ]);
  

function App() {
    return(
        <RouterProvider router={router} />
    )
}


export default App; 