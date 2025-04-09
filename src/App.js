import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutAllPatients from "./Layout/LayoutAllPatients";
import LayoutPatientsRecords from "./Layout/LayoutPatientsRecords";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutAllDoctor from "./Layout/LayoutAllDoctor";
import LayoutShiftManagement from "./Layout/LayoutShiftManagement";
import LayoutStaff from "./Layout/LayoutStaff";


import LayoutAllLab from "./Layout/LayoutAllLab";
import LayoutLabTest from "./Layout/LayoutLabTest";
import LayoutDepartment from "./Layout/LayoutDepartment";
import LayoutIncome from "./Layout/LayoutIncome";
import LayoutExpense from "./Layout/LayoutExpense";









function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
        <Route path= "/appointment" element={<LayoutAppointment/>}/>
 
        <Route path= "/doctor/all-doctor" element={<LayoutAllDoctor/>}/>
        <Route path= "/doctor/shift-management" element={<LayoutShiftManagement/>}/>
        
        <Route path= "/patients/allpatients" element={<LayoutAllPatients/>}/>
        <Route path= "/patients/patientsrecords" element={<LayoutPatientsRecords/>}/>
   

        <Route path= "/staff" element={<LayoutStaff/>}/>
        

        <Route path = "/laboratory/alllab" element= {< LayoutAllLab/>}/>
        <Route path = "/laboratory/labtest" element= {<LayoutLabTest/>}/>

        <Route path= "/department" element={<LayoutDepartment/>}/>
  
        <Route path= "/finance/income" element={<LayoutIncome/>}/>
        <Route path= "/finance/expense" element={<LayoutExpense/>}/>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;