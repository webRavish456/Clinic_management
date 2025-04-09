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
import ViewAllPatients from "./View/View";
import CreateAllPatients from "./Create/Create";
import EditAllPatients from "./Edit/Edit";
import DeleteAllPatients from "./Delete/Delete";
import Search from "../../Search/Search";

const AllPatients=()=>
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
    { id: 'patientsid', label: 'Patients Id', flex: 1 ,align:'center'},
    { id: 'firstname', label: 'First Name', flex: 1, align: 'center' },
    { id: 'lastname', label: 'Last Name', flex: 1, align: 'center' },
    { id: 'dob', label: 'DOB', flex: 1, align: 'center' },
    {id: 'gender', label: 'Gender', flex: 1, align: 'center'},
    {id: 'phonenumber', label: 'Phone Number', flex: 1, align: 'center'},
    {id: 'email', label: 'Email', flex: 1, align: 'center'},
    {id: 'address', label: 'Address', flex: 1, align: 'center'},
    {id: 'bloodgroup', label: 'Blood Group', flex: 1, align: 'center'},
    {id: 'medicakhistoryattachment', label: 'Medical History Attachment', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  
      
      function createData(patientsid, firstname, lastname, date , time, amount, paymentmethod, status, actions) {
        return { patientsid, firstname,lastname, date , time, amount, paymentmethod, status,
          actions: (
            <>
              <IconButton style={{color:"rgb(13, 33, 121)", padding:"4px", transform:"scale(0.8)"}} onClick={handleView}>
                <VisibilityIcon  />
              </IconButton>
              <IconButton style={{color:"rgb(98, 99, 102)", padding:"4px",transform:"scale(0.8)"}} onClick={handleEdit} >
                <EditIcon />
              </IconButton>
              <IconButton style={{color:"rgb(237, 20, 13)", padding:"4px",transform:"scale(0.8)"}} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ),
        };
      }
      
      const rows = [
        createData('001', 'sneha', 'biswal', "2/9/2004", '9:00', '500','Credit Card','Pending','View/Edit/Delete'),
        createData('OO2', 'Subho', 'gupta ', "2/7/2022", '10:00', '900','Cash','Cancelled','View/Edit/Delete'),
        createData('003','ayushi', 'biswal',"3/02/2023",'11:00','1000','Google Pay','Rescheduled','View/Edit/Delete'),
        createData('004','aastha', 'kumari',"12/12/12",'12:00','1500','Phone Pay','Confirmed','View/Edit/Delete'),
        createData('004','sumona','raut',"12/12/12",'12:00','2000','UPI','Completed','View/Edit/Delete'),
        createData('006','ritu', 'sahoo',"3/5/2024",'8:00','2500','Bank Transfer','Pending','Completed','View/Edit/Delete'),
        createData('007','prerna', 'sahoo',"5/8/2005",'7:00','3000','Credit Card','Confirmed',''),
        createData('008','amrita', 'Clean & Co.',"3/2/24",'6:00','3500','Phone Pay','Completed','View/Edit/Delete' ),
        createData('009','tripti', 'Telecom Ltd',"4/4/12",'7:00','4000','Cash','Confirmed','View/Edit/Delete' ),
        createData('010','megha', 'Media Agency','8/9/12','6:00','5000','Google Pay','Cancelled','View/Edit/Delete'),
        
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
         // console.log("Form Data Submitted:", formData);
       }

       const handleUpdate = (e) => {
          e.preventDefault();
          setEditData(false)
       }
  

    return (
      
      <Box className="container">
        <Search onAddClick={onAddClick}/>
     <Paper sx={{ width: '100%', overflow:"hidden" }}>
      <TableContainer  >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:900 }}
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
         {openData? "Create New Patients" : viewData ? "View Patients Details": editData?"Edit Patients Details":deleteData?"Delete Patients":null}
      </>}
      
      dialogContent = {
         openData ? <CreateAllPatients handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewAllPatients /> : 
         editData ? <EditAllPatients handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteAllPatients handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default AllPatients;