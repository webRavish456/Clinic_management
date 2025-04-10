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
import ViewShiftManagement from "./View/View";
import CreateShiftManagement from "./Create/Create";
import EditShiftManagement from "./Edit/Edit";
import DeleteShiftManagement from "./Delete/Delete";
import Search from "../../Search/Search";



const ShiftManagement=()=>
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
        { id: 'si', label: 'SI. No', flex:1, align:'center' },
        { id: 'name', label: 'Name', flex:1,align:'center' },
        {
          id: 'department',
          label: 'Department',
          flex:1,
          align:'center'
        },
        {
          id: 'specialization',
          label: 'Specialization',
          flex:1,
           align:'center'
        },
        {
          id: 'shiftstartdate',
          label: 'Shift Start Date',
          flex:1,
          align:'center',
        },
        {
            id: 'shiftenddate',
            label: 'Shift End Date',
            flex:1,
            align:'center',
          },
          {
            id: 'workdays',
            label: 'Work Days',
            flex:1,
            align:'center',
          },
          {
            id: 'shifthours',
            label: 'ShiftHours',
            flex:1,
            align:'center',
          },
          {
            id: 'shifttype',
            label: 'ShiftType',
            flex:1,
            align:'center',
          },
          {
            id: 'availabilitystatus',
            label: ' AvailabilityStatus',
            flex:1,
            align:'center',
          },
          {
            id: 'actions',
            label: 'Actions',
            flex:1,
            align:'center',
          },
          
          
      ];
      
      function createData(si,name,department,specialization,shiftstartdate,shiftenddate,workdays,shifthours,shifttype,availabilitystatus) {
        return {
          si,
          name,
          department,
          specialization,
          shiftstartdate,
          shiftenddate,
          workdays,
          shifthours,
          shifttype,
          availabilitystatus,
          actions: (
            <>
              <IconButton style={{color:"rgb(13,33,121)", padding:"4px", transform:"scale(0.8)"}} onClick={handleView}>
                <VisibilityIcon  />
              </IconButton>
              <IconButton style={{color:"rgb(98,99,102)", padding:"4px",transform:"scale(0.8)"}} onClick={handleEdit} >
                <EditIcon />
              </IconButton>
              <IconButton style={{color:"rgb(224,27,20)", padding:"4px",transform:"scale(0.8)"}} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ),
        };
      }
      
      const rows = [
        createData(1, "AMRITA", "Cardiologist", "Heart", "1/1/20", "7/1/20", "Monday-Friday","12","A","Monday-Friday"),
        createData(2, "NITU", "Dermatologists", "Skin" ,"8/1/20", "16/1/20", "Monday-Friday","12","B","Monday-Tuesday"),
        createData(3, "RITU", "Gastroenterologists", "Stomach", "17/1/20", "24/1/20", "Monday-Friday","12","C","Monday-Wednesday"),
        createData(4, "RANI", "Hematologists", "Blood", "1/2/20", "7/2/20", "Monday-Friday","12","A","Monday-Saturday"),
        createData(5, "SUMAN", "Internists", "Cancer", "14/2/20", "21/2/20", "Monday-Friday","12","A","Monday-Thursday"),
        createData(6, "PRIYANKA", "Nephrologists", "Kidney disease", "22/2/20", "29/2/20", "Monday-Friday","12","B","Monday-Friday"),
        createData(7, "ANNU", "Neurologists", "Brain", "6/3/20", "13/3/20", "Monday-Friday","12","A","Wednesday-Saturday"),
        createData(8, "SNEHA", "Gynecologists", "Pregnancy", "20/3/20", "27/3/20", "Monday-Friday","12","C","Tuesday-Friday"),
        createData(9, "PUNAM", "Oncologists", "Cancer", "4/4/20", "11/4/20", "Monday-Friday","12","D","Monday-Saturday"),
        createData(10, "SONAL", "Ophthalmologists", "Eye", "18/4/20", "25/4/20", "Monday-Friday","12","A","Wednesday-Saturday"),
        createData(11, "MITU", "Osteopaths", "Whole Body", "2/5/20", "9/5/20", "Monday-Friday","12","B","Tuesday-Friday"),
        createData(12, "SUSMITA", "Otolaryngologists", "Ears", "16/5/20", "23/5/20", "Monday-Friday","12","C","Monday-Thursday"),
        createData(13, "ISHA", "Physiatrists", "Back Pain", "30/5/20", "7/6/20", "Monday-Friday","12","D","","1/2/14","Tuesday-Saturday"),
        createData(14, "PRIYA", "Podiatrists", "Feet", "14/6/20", "21/6/20", "Monday-Friday","12","A","Monday-Friday"),
        createData(15, "ISHU", "Pulmonologists", "Lung cancer", "28/6/20", "5/6/20", "Monday-Friday","12","B","Monday-Friday"),
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
         {openData? "Create ShiftManagement" : viewData ? "View ShiftManagement": editData?"Edit ShiftManagement":deleteData?"Delete ShiftManagement":null}
      </>}
      
      dialogContent = {
         openData ? <CreateShiftManagement handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewShiftManagement /> : 
         editData ? <EditShiftManagement handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteShiftManagement handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default ShiftManagement;