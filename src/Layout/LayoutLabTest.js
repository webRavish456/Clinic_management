import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import LabTest from "../Laboratory/LabTest/LabTest";




const LayoutLabTest=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <LabTest className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutLabTest;