import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutPatients from "./Layout/LayoutPatients";
<<<<<<< HEAD
import LayoutDoctor from "./Layout/LayoutDoctor";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutLaboratory from "./Layout/LayoutLaboratory";
=======
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutDoctor from "./Layout/LayoutDoctor";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutLaboratory from "./Layout/LayoutLaboratory";
import LayoutFinance from "./Layout/LayoutFinance";





>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
<<<<<<< HEAD
        <Route path="/patients" element={<LayoutPatients/>}/>
        <Route path="/doctor" element={<LayoutDoctor/>}/>
        <Route path="/staff" element={<LayoutStaff/>}/>
        <Route path="/appointment" element={<LayoutAppointment/>}/>
        <Route path="/Finance" element={<LayoutFinance/>}/>
        <Route path="/Laboratory" element={<LayoutLaboratory/>}/>
=======
        <Route path= "/patients" element={<LayoutPatients/>}/>
        <Route path= "/appointment" element={<LayoutAppointment/>}/>
        <Route path= "/doctor" element={<LayoutDoctor/>}/>
        <Route path= "/staff" element={<LayoutStaff/>}/>
        <Route path= "/laboratory" element={<LayoutLaboratory/>}/>
        <Route path= "/finance" element={<LayoutFinance/>}/>
>>>>>>> e446a2201b220a1dd0f76db99fe4ab5700ee0fa0
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;