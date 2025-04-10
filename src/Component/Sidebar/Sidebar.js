import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menuitems from "../Menuitems/Menuitems";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Sidebar = () => {

  const isSmScreen = useMediaQuery("(max-width:768px)");
  const location = useLocation();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);

  useEffect(() => {

    const firstPath = "/" + location.pathname.split("/")[1]; 

    let activeModuleIndex = null;
    let activeSubModule = null;

    Menuitems.forEach((item, index) => {
      if (item.href.startsWith(firstPath)) {
        activeModuleIndex = index;
        if (item.item) {
          const matchedSub = item.item.find(sub => sub.href === location.pathname);
          if (matchedSub) {
            activeSubModule = matchedSub.href;
          }
        }
      }
    });

    setActiveIndex(activeModuleIndex);
    setActiveSubItem(activeSubModule);
  }, [location.pathname]);

  const toggleMenu = (index, item) => {
    if (item.item) {
      setActiveIndex(index);
      const firstSub = item.item[0].href;
      setActiveSubItem(firstSub);
      navigate(firstSub);
    } else {
      setActiveIndex(index);
      setActiveSubItem(null);
      navigate(item.href);
    }
  };

  return (
    <div className="sidebar">
      <LazyLoadImage src={'/logo.png'} alt="logo" width={100}  height={40} className="logo" />

      {Menuitems.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div key={index} className="menu-item">
            <div 
              className={`menu-link ${isActive ? "active" : ""}`}
              onClick={() => toggleMenu(index, item)}
            >
              <LazyLoadImage
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="menu-labeldata">
                {!isSmScreen && <div className="menu-label">{item.label}</div>}
                {item.item && (isActive ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </div>
            </div>

            {item.item && isActive && (
              <div className="submenu">
                {item.item.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.href}
                    className={`submenu-link ${activeSubItem === subItem.href ? "active" : ""}`}
                    onClick={() => setActiveSubItem(subItem.href)}
                  >
                <KeyboardArrowRightIcon className={`${activeSubItem===subItem.href? "rightIcon active":"rightIcon inactive"}`}/>
                    {subItem.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
