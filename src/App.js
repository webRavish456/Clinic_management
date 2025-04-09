import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutAllPatients from "./Layout/LayoutAllPatients";
import LayoutPatientsRecords from "./Layout/LayoutPatientsRecords";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutDoctor from "./Layout/LayoutDoctor/LayoutDoctor";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutLaboratory from "./Layout/LayoutLaboratory";
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
        
        <Route path= "/patients/allpatients" element={<LayoutAllPatients/>}/>
        <Route path= "/patients/patientsrecords" element={<LayoutPatientsRecords/>}/>
        <Route path= "/doctor/all-doctor" element={<LayoutDoctor/>}/>

        <Route path= "/staff" element={<LayoutStaff/>}/>
        <Route path= "/laboratory" element={<LayoutLaboratory/>}/>
        <Route path= "/department" element={<LayoutDepartment/>}/>
  
        <Route path= "/finance/income" element={<LayoutIncome/>}/>
        <Route path= "/finance/expense" element={<LayoutExpense/>}/>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;