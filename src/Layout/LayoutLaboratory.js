import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import  Laboratory from "../Laboratory/Laboratory";



const LayoutLaboratory=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Laboratory className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutLaboratory;