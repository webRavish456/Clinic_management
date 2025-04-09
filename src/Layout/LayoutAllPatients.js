import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import AllPatients from "../Patients/AllPatients/AllPatients";



const LayoutAllPatients=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <AllPatients className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutAllPatients;