import React from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";
import AllDoctor from "../../Doctor/All-doctor/Alldoctor";


const LayoutDoctor=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <AllDoctor className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutDoctor;