import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
<<<<<<<< HEAD:src/Layout/LayoutAllDoctor.js
import  AllDoctor from "../Doctor/AllDoctor/AllDoctor";


const LayoutAllDoctor=()=>
========
import Income from "../Finance/Income/Income";



const LayoutIncome=()=>
>>>>>>>> 38d1c852eb3876a62cc3432a2d3a02350c95a166:src/Layout/LayoutIncome.js
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
<<<<<<<< HEAD:src/Layout/LayoutAllDoctor.js
            <AllDoctor className="dashboard" />
========
            <Income className="dashboard" />
>>>>>>>> 38d1c852eb3876a62cc3432a2d3a02350c95a166:src/Layout/LayoutIncome.js
            </div>
        </div>
        </div>


        </>
    )
}

<<<<<<<< HEAD:src/Layout/LayoutAllDoctor.js
export default LayoutAllDoctor;
========
export default LayoutIncome;
>>>>>>>> 38d1c852eb3876a62cc3432a2d3a02350c95a166:src/Layout/LayoutIncome.js
