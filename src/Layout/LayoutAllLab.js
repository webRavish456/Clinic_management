import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import AllLab from "../Laboratory/AllLab/AllLab";




const LayoutAllLab=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <AllLab className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutAllLab;