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
    { id: 'sino', label: 'SI. No', flex: 1, align:'center' },
    { id: 'patientName', label: 'Patient Name', flex: 1, align: 'center' },
    { id: 'patientId', label: 'Patient ID', flex: 1, align: 'center' },
    { id: 'doa', label: 'Date of Admission', flex: 1, align: 'center' },
    {id: 'treatment', label: 'Treatment', flex: 1, align: 'center'},
    {id: 'labReports', label: 'Lab Reports', flex: 1, align: 'center'},
    {id: 'nextfollowup', label: 'Next FollowUp', flex: 1, align: 'center'},
    {id: 'status', label: 'Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  
      
      function createData(sino, patientName,  patientId, doa , treatment, labReports, nextfollowup, status, actions) {
        return { sino, patientName, patientId, doa , treatment, labReports, nextfollowup, status,
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
        createData('1', 'sneha Biswal', 'P001', "2/9/2004", 'Fever', '500','Credit Card','under observation','View/Edit/Delete'),
        createData('2', 'Subhashree sahoo', 'P002 ', "2/7/2022", 'Fever', '900','Cash','under observation','View/Edit/Delete'),
        createData('3','ritu', 'P003 ',"3/02/2023",'11:00','Fever','Google Pay','under observation','View/Edit/Delete'),
        createData('4','aastha', 'P004 ',"12/12/12",'Fever','1500','Phone Pay','under observation','View/Edit/Delete'),
        createData('4','amrita','P005 ',"12/12/12",'Fever','2000','UPI','under observation','View/Edit/Delete'),
        createData('6','pari', 'P006 ',"3/5/2024",'Fever','2500','Bank Transfer','under treatment','Completed','View/Edit/Delete'),
        createData('7','poonam', 'P007 ',"5/8/2005",'Fever','3000','Credit Card','recovered',''),
        createData('8','ayushi', 'P008 ',"3/2/24",'Fever','3500','Phone Pay','under observation','View/Edit/Delete' ),
        createData('9','bhumika', 'P009 ',"4/4/12",'Fever','4000','Cash','recovered','View/Edit/Delete' ),
        createData('10','anushka', 'P010 ','8/9/12','Fever','5000','Google Pay','recovered','View/Edit/Delete'),
        
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
      
      <Box className="container" >
        <Search onAddClick={onAddClick} buttonText="+ Add PatientRecords"/>
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
         {openData? "Create New Patient Records" : viewData ? "View Patient Records": editData?"Edit Patient Records":deleteData?"Delete Record":null}
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