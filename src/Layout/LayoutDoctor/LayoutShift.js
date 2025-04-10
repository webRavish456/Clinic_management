import React from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";
import ShiftManagement from "../../Doctor/Shift-management/ShiftManagement";


const LayoutShift=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <ShiftManagement className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutShift;