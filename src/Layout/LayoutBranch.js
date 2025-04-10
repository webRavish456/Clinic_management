import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";

import Branch from "../Branch/Branch";



const LayoutBranch=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Branch className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutBranch;