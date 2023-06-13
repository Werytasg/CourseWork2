import './home.css'
import { NavLink } from "react-router-dom";

function Home(){
   return(
      <div className="Home">
         <div className="color"></div>
         <button className="B" ><NavLink  to="/minHeap">Min Heap </NavLink></button>
      </div>
   )
}

export default Home