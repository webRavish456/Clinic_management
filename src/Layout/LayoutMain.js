import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar/Sidebar";
import Header from "../Component/Header/Header";


const LayoutMain = () => {
  return (
    <div className="layout">
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Header />
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default LayoutMain;
