import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Patients from "../Patients/Patient";




const LayoutPatients=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />

            <Patients className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutPatients;