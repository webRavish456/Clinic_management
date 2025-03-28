import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CloseIcon from "@mui/icons-material/Close";
import Search from "../Search/Search";

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
import CommonDialog from "../Component/CommonDialog/CommonDialog";
import ViewDiscount from "./View/View";
import CreateDiscount from "./Create/Create";
import EditDiscount from "./Edit/Edit";
import DeleteDiscount from "./Delete/Delete";

const Discount=()=>
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
        { id: 'doctor name', label: 'Doctor Name', flex:1,align:'center' },
        {
          id: 'email',
          label: 'Email',
          flex:1,
          align:'center'
        },
        {
          id: 'phone number ',
          label: 'Phone Number',
          flex:1,
           align:'center'
        },
        {
          id: 'address',
          label: 'Address',
          flex:1,
          align:'center',
        },
        {
            id: 'specialization',
            label: 'Specialization',
            flex:1,
            align:'center',
          },
          {
            id: 'experience years',
            label: 'Experience Years',
            flex:1,
            align:'center',
          },
          {
            id: 'qualification',
            label: 'Qualification',
            flex:1,
            align:'center',
          },
          {
            id: 'hospital name',
            label: 'Hospital Name',
            flex:1,
            align:'center',
          },
          {
            id: 'status',
            label: 'Status',
            flex:1,
            align:'center',
          },
          {
            id: 'joining date',
            label: 'Joining Date',
            flex:1,
            align:'center',
          },
          {
            id: 'action',
            label: 'Action',
            flex:1,
            align:'center',
          },
          
      ];
      
      function createData(si, doctorName,email , phoneNumber, address, specialization, experienceYears,qualification,hospitalName,status,joiningDate,action) {
        return {
          si,
          doctorName,
          email,
          phoneNumber,
          address,
          specialization,
          experienceYears,
          qualification,
          hospitalName,
          status,
          joiningDate,
          action: (
            <>
              <IconButton style={{color:"#000", padding:"4px", transform:"scale(0.8)"}} onClick={handleView}>
                <VisibilityIcon  />
              </IconButton>
              <IconButton style={{color:"#000", padding:"4px",transform:"scale(0.8)"}} onClick={handleEdit} >
                <EditIcon />
              </IconButton>
              <IconButton style={{color:"#000", padding:"4px",transform:"scale(0.8)"}} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          ),
        };
      }
      
      const rows = [
        createData(1, "AMRITA", "amrita@123", "6324789543", "Ranchi", "Cardiologist", "10","MBBS","ranchi main hospital","AvailableDays","3/6/12","view"),
        createData(2, "NITU", "nitu@123", "5478965123" ,"Ranchi", "Heart", "10","MBBS","aims","Timing","12/3/14","view"),
        createData(3, "RITU", "ritu@123", "2514639877", "Ranchi", "Eye", "9","MBBS","sadar hospital","Days","2/5/16","view"),
        createData(4, "RANI", "rani@123", "5478963321", "Ranchi", "Skin", "7","MBBS","aims","","","",),
        createData(5, "SUMAN", "suman@123", "5479632114", "Ranchi", "Brain", "8","MBBS","govermental hospital","Days","5/6/19","view"),
        createData(6, "PRIYANKA", "priyanka@123", "4566321887", "Ranchi", "Eye", "6","MBBS","aims","","",""),
        createData(7, "ANNU", "annu@123", "4452369987", "Delhi", "Eye", "5","MBBS","ranchi main hospital","Timing","6/2/19","view"),
        createData(8, "SNEHA", "sneha@123", "1265897412", "Delhi", "Brain", "9","MBBS","sadar hospital","Days","12/7/15","view"),
        createData(9, "PUNAM", "punam@123", "4563217896", "Bhubneswar", "Skin", "8","MBBS","appolo","Timing","14/8/13","view"),
        createData(10, "SONAL", "sonal@123", "5231478520", "Ranchi", "Eye", "9","MBBS","aims","Days","1/1/13","view"),
        createData(11, "MITU", "mitu@123", "587963145", "Ranchi", "Skin", "6","MBBS","sadar hospital","Days","14/2/5","view"),
        createData(12, "SUSMITA", "susmita@123", "5987463210", "Ranchi", "Brain", "8","MBBS","aims","Days","18/4/20","view"),
        createData(13, "ISHA", "isha@123", "6398547156", "Ranchi", "Skin", "7","MBBS","aims","Days","1/2/14","view"),
        createData(14, "PRIYA", "priya@123", "4562178931", "Ranchi", "Heart", "6","MBBS","appolo","Days","3/4/17","view"),
        createData(15, "ISHU", "ishu@123", "3216589741", "Delhi", "Skin", "7","MBBS","aims","Days","12/5/16","view")
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
         {openData? "Create New Discount" : viewData ? "View Discount Details": editData?"Edit Discount Details":deleteData?"Delete Discount":null}
      </>}
      
      dialogContent = {
         openData ? <CreateDiscount handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewDiscount /> : 
         editData ? <EditDiscount handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteDiscount handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default Discount;