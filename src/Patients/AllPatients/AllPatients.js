import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import CloseIcon from "@mui/icons-material/Close";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow ,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  useMediaQuery,
} from "@mui/material";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import ViewExpense from "./View/View";
import CreateExpense from "./Create/Create";
import EditExpense from "./Edit/Edit";
import DeleteExpense from "./Delete/Delete";
import Search from "../../Search/Search";


const PatientsRecords=()=>
{

  const [openData, setOpenData] = useState(false)

  const [viewData, setViewData] = useState(false)

  const [editData, setEditData] = useState(false)

  const [deleteData, setDeleteData] = useState(false)

 const handleView = () =>
  {
    setViewData(true)
  }

const handleEdit = () =>
{
   setEditData(true)
}

const handleDelete = () =>
  {
    setDeleteData(true)
  }

  const columns = [
    { id: 'sino', label: 'Si No', flex: 1, align:'center' },
    { id: 'patientName', label: 'Patients Name', flex: 1, align: 'center' },
    { id: 'treatment', label: 'Treatment', flex: 1, align: 'center' },
    { id: 'mobileno', label: 'Mobile No.', flex: 1, align: 'center' },
    {id: 'email', label: 'Email', flex: 1, align: 'center'},
    {id: 'gender', label: 'Gender', flex: 1, align: 'center'},
    {id: 'address', label: 'Address', flex: 1, align: 'center'},
    {id: 'admissionDate', label: 'Admission Date', flex: 1, align: 'center'},
    {id: 'doctorAss', label: 'Doctor Assigned', flex: 1, align: 'center'},
    {id: 'bloodGrp', label: 'Blood Group', flex: 1, align: 'center'},
    {id: 'status', label: 'Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  
      
      function createData(sino, patientName, treatment, mobileno , email, gender, address,admissionDate,doctorAss,bloodGrp, status, actions) {
        return { sino, patientName,treatment, mobileno , email, gender, address,admissionDate,doctorAss,bloodGrp, status,
          actions: (
            <>
              <IconButton style={{color:"rgb(13, 33, 121)", padding:"4px", transform:"scale(0.8)"}} onClick={handleView}>
                <VisibilityIcon  />
              </IconButton>
              <IconButton style={{color:"rgb(98, 99, 102)", padding:"4px",transform:"scale(0.8)"}} onClick={handleEdit} >
                <EditIcon />
              </IconButton>
              <IconButton style={{color:"rgb(224, 27, 20)", padding:"4px",transform:"scale(0.8)"}} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ),
        };
      }
      
      const rows = [
        createData('1', 'sneha Biswal', 'illness', '9573456798', 'sneha12@gmail.com', 'female','Credit Card','Pending','View/Edit/Delete'),
        createData('2', 'Subhashree sahoo', 'loosemotion ', '2898767890', 'subhu12@gmail.com', 'female','Cash','Cancelled','View/Edit/Delete'),
        createData('3','Sweta', 'heart attack','789887769','sweta12@gmail.com','female','Google Pay','Rescheduled','View/Edit/Delete'),
        createData('4','aastha', 'illness','1789876789','aastha12@gmail.com','female','Phone Pay','Confirmed','View/Edit/Delete'),
        createData('4','sonal','joint pain','9878987656','sonal23@gmail.com','female','UPI','Completed','View/Edit/Delete'),
        createData('6','tripti', 'fever','3987898765','tripti12@gmail.com','female','Bank Transfer','Pending','Completed','View/Edit/Delete'),
        createData('7','ayushi', 'illness','59878987765','ayushi34@gmail.com','female','Credit Card','Confirmed',''),
        createData('8','ritu', 'heart attack','3987898776','ritu23@gmail.com','female','Phone Pay','Completed','View/Edit/Delete' ),
        createData('9','prerna', 'jaundice','6787656787','prerna34@gmail.com','female','Cash','Confirmed','View/Edit/Delete' ),
        createData('10','anjali', 'illness','567876567','anjali89@gmail.com','female','Google Pay','Cancelled','View/Edit/Delete'),
        
      ];
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const onAddClick =()=>
        {
          setOpenData(true)
        }
   
        const handleClose = () => {
          setEditData(false)
          setViewData(false)
          setOpenData(false)
          setDeleteData(false)
       };
   
       const handleSubmit = (e) => {
         e.preventDefault();
         setOpenData(false)
        
       }

       const handleUpdate = (e) => {
          e.preventDefault();
          setEditData(false)
       }
  

    return (
      
      
      <Box className="container">
        <Search onAddClick={onAddClick} buttonText="+ Add Patient"/>
     <Paper sx={{ width: '100%', overflow:"hidden" }}>
      <TableContainer  >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:1000 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   
     <CommonDialog 
      open={openData || viewData || editData || deleteData} 
      onClose={handleClose}
      dialogTitle={ <>
         {openData? "Add New Patient" : viewData ? "View Patient Details": editData?"Edit Patient Details":deleteData?"Delete Patient":null}
      </>}
      
      dialogContent = {
         openData ? <CreateExpense handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewExpense /> : 
         editData ? <EditExpense handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteExpense handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    
    )
}

export default PatientsRecords;