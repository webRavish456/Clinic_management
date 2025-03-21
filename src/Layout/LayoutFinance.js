import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
<<<<<<< HEAD
import Finance from "../Finance/Finance";
=======
import  Finance from "../Finance/Finance";


>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0

const LayoutFinance=()=>
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
            <Finance className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutFinance;