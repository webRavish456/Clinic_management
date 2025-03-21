import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Staff from "../Staff/Staff";

const LayoutStaff=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Staff className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutStaff;