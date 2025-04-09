import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Expense from "../Finance/Expense/Expense";



const LayoutExpense=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Expense className="dashboard" />
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutExpense;