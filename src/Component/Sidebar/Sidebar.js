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
            
            <LazyLoadImage 
              src={'/logoo.png'} 
              alt='logo'
              width={50} 
              height={50}
              className="logo"
            />

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