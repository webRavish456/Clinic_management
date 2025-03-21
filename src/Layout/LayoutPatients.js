import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
<<<<<<< HEAD
import Patients from "../Patients/Patients";
=======
import Patients from "../Patients/Patient";


>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0


const LayoutPatients=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
<<<<<<< HEAD
=======

>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
            <Patients className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutPatients;