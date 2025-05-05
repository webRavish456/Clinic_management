import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutMain from "./Layout/LayoutMain";
import AllDoctor from "./Doctor/AllDoctor/AllDoctor";
import ShiftManagement from "./Doctor/ShiftManagement/ShiftManagement";
import AllPatients from "./Patients/AllPatients/AllPatients";
import PatientsRecords from "./Patients/PatientsRecords/PatientsRecords";
import Dashboard from "./Dashboard/Dashboard";
import Appointment from "./Appointment/Appointment";
import AllLab from "./Laboratory/AllLab/AllLab";
import Staff from "./Staff/Staff";
import CreateStaff from "./Staff/Create/Create";
import ViewStaff from "./Staff/View/View";
import EditStaff from "./Staff/Edit/Edit";

import Branch from "./Branch/Branch";
import Department from "./Department/Department";
import LabTest from "./Laboratory/LabTest/LabTest";
import Income from "./Finance/Income/Income";
import Expense from "./Finance/Expense/Expense";
import CreateDoctor from "./Doctor/AllDoctor/Create/Create";
import ViewDoctor from "./Doctor/AllDoctor/View/View";
import EditDoctor from "./Doctor/AllDoctor/Edit/Edit";


import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Profile from "./Profile/Profile";




function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/login" element={<SignIn/>} />
        <Route path="/forgot-password" element={<Forgot />} />
  
        <Route path="/" element={ <ProtectedRoute>
              <LayoutMain />
         </ProtectedRoute>}>

         <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="doctor/all-doctor" element={<AllDoctor/>} />
          <Route path="createDoctor" element={<CreateDoctor/>}/>
          <Route path="viewDoctor/:Id"   element={<ViewDoctor/>}/>
          <Route path="editDoctor/:Id"   element={<EditDoctor/>}/>
          <Route path="doctor/shift-management" element={<ShiftManagement />} />
          <Route path="patients/allpatients" element={<AllPatients />} />
          <Route path="patients/patientsrecords" element={<PatientsRecords />} />
          <Route path="staff" element={<Staff />} />
          <Route path="branch" element={<Branch />} />
          <Route path="laboratory/alllab" element={<AllLab />} />
          <Route path="laboratory/labtest" element={<LabTest />} />
          <Route path="department" element={<Department />} />
          <Route path="finance/income" element={<Income />} />
          <Route path="finance/expense" element={<Expense />} />
          <Route path="createstaff" element={<CreateStaff />} />

        <Route path="/profile" element={<Profile/>}/>

          <Route path="viewstaff/:Id" element={<ViewStaff/>}/>
        <Route path="editstaff/:Id" element={<EditStaff/>}/>
    

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
