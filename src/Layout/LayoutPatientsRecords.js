import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import PatientsRecords from "../Patients/PatientsRecords/PatientsRecords";



const LayoutPatientsRecords=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <PatientsRecords className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutPatientsRecords;