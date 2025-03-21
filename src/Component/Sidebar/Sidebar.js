import React from "react"
import Menuitems from "../Menuitems/Menuitems";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mui/material";

const Sidebar=()=>
{
   
  const isSmScreen = useMediaQuery("(max-width:768px)");
    

    return (
        <>
            
           <div className="sidebar">
<<<<<<< HEAD

           <LazyLoadImage 
              src={"/logo.png"} 
              alt="logo"
              width={150} 
              height={70} 
            />

=======
            
            <LazyLoadImage 
              src={'/logoo.png'} 
              alt='logo'
              width={50} 
              height={50}
              className="logo"
            />
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0

      {Menuitems.map((item, index) => (
        <div className="menu-item" key={index}>
          <NavLink to={item.href} className="menu-link">
            <LazyLoadImage 
              src={item.icon} 
              alt={item.label} 
              width={20} 
              height={20} 
              style={{ filter: "brightness(0) invert(1)" }}
            />
          {isSmScreen?null:  <span className="menu-label">{item.label}</span>}
          </NavLink>
        </div>
      ))}
    </div>
        </>
    )
}

export default Sidebar;