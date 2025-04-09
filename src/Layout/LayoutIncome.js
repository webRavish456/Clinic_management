import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Income from "../Finance/Income/Income";



const LayoutIncome=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Income className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutIncome;