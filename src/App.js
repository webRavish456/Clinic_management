import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutPatients from "./Layout/LayoutPatients";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutDoctor from "./Layout/LayoutDoctor/LayoutDoctor";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutLaboratory from "./Layout/LayoutLaboratory";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutDepartment from "./Layout/LayoutDepartment";








function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
        <Route path= "/patients/all-patients" element={<LayoutPatients/>}/>
        <Route path= "/appointment" element={<LayoutAppointment/>}/>
        <Route path= "/doctor/all-doctor" element={<LayoutDoctor/>}/>

        <Route path= "/staff" element={<LayoutStaff/>}/>
        <Route path= "/laboratory" element={<LayoutLaboratory/>}/>
        <Route path= "/finance" element={<LayoutFinance/>}/>
        <Route path= "/department" element={<LayoutDepartment/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;