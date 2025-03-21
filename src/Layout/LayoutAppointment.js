import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Appointment from "../Appointment/Appointment";



const LayoutAppointment=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Appointment className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutAppointment;