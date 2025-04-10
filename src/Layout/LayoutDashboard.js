import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";

const LayoutDashboard=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Dashboard className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutDashboard;