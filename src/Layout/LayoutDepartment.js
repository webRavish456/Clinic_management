import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Department from "../Department/Department";


const LayoutDepartment=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Department className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutDepartment;