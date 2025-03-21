import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutPatients from "./Layout/LayoutPatients";
import LayoutDoctor from "./Layout/LayoutDoctor";
import LayoutStaff from "./Layout/LayoutStaff";
import LayoutAppointment from "./Layout/LayoutAppointment";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutLaboratory from "./Layout/LayoutLaboratory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
        <Route path="/patients" element={<LayoutPatients/>}/>
        <Route path="/doctor" element={<LayoutDoctor/>}/>
        <Route path="/staff" element={<LayoutStaff/>}/>
        <Route path="/appointment" element={<LayoutAppointment/>}/>
        <Route path="/Finance" element={<LayoutFinance/>}/>
        <Route path="/Laboratory" element={<LayoutLaboratory/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;