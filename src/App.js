import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutPatients from "./Layout/LayoutPatients";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutLaboratory from "./Layout/LayoutLaboratory";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutAllDoctor from "./Layout/LayoutAllDoctor";
import LayoutShiftManagement from "./Layout/LayoutShiftManagement";





function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
        <Route path= "/patients" element={<LayoutPatients/>}/>
        <Route path= "/appointment" element={<LayoutAppointment/>}/>
        <Route path= "/staff" element={<LayoutStaff/>}/>
        <Route path= "/laboratory" element={<LayoutLaboratory/>}/>
        <Route path= "/finance" element={<LayoutFinance/>}/>
        <Route path= "/doctor/alldoctor" element={<LayoutAllDoctor/>}/>
        <Route path= "/doctor/shiftmanagement" element={<LayoutShiftManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;