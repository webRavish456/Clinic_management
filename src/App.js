import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Branch from "./Branch/Branch";
import Department from "./Department/Department";
import LabTest from "./Laboratory/LabTest/LabTest";
import Income from "./Finance/Income/Income";
import Expense from "./Finance/Expense/Expense";
import CreateStaff from "./Staff/Create/Create";
import CreateAllDoctor from "./Doctor/AllDoctor/Create/Create";
import ViewAllDoctor from "./Doctor/AllDoctor/View/View";
import EditAllDoctor from "./Doctor/AllDoctor/Edit/Edit";
import CreateShiftManagement from "./Doctor/ShiftManagement/Create/Create";
import ViewShiftManagement from "./Doctor/ShiftManagement/View/View";
import EditShiftManagement from "./Doctor/ShiftManagement/Edit/Edit";


function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/login" element={<SignIn/>} />
        <Route path="/forgot-password" element={<Forgot />} />

        <Route path="/" element={<LayoutMain />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="doctor/all-doctor" element={<AllDoctor/>} />
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
          <Route path="staffcreate" element={<CreateStaff />} />
          <Route path="alldoctor" element={<CreateAllDoctor/>} /> 
          <Route path="alldoctor" element={<ViewAllDoctor />} />
          <Route path="alldoctor" element={<EditAllDoctor />} />
          <Route path="shiftmanagement" element={<CreateShiftManagement />} />      
          <Route path="shiftmanagement" element={<ViewShiftManagement />} />      
          <Route path="shiftmanagement" element={<EditShiftManagement />} />           
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
