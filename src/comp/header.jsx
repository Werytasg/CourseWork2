import './header.css'
import { NavLink } from "react-router-dom";

function Header(){
   return(
      <div className="Header">
         <button className="glow-on-hover">
         <NavLink  to="/"> Home </NavLink>
         </button>
      </div>
   );
}

export default Header