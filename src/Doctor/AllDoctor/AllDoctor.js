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
import ViewDiscount from "./View/View";
import CreateDiscount from "./Create/Create";
import EditDiscount from "./Edit/Edit";
import DeleteDiscount from "./Delete/Delete";
import Search from "../../Search/Search";


const AllDoctor=()=>
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
        { id: 'doctorname', label:  'Doctor Name', flex:1,align:'center' },
        {
          id: 'email',
          label: 'Email',
          flex:1,
          align:'center'
        },
        {
          id: 'mobileno',
          label: 'Mobile No',
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
            id: 'experience',
            label: 'Experience',
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
            id: 'hospitalname',
            label: 'Hospital Name',
            flex:1,
            align:'center',
          },
          {
            id: 'availability',
            label: 'Availability',
            flex:1,
            align:'center',
          },
          {
            id: 'joiningdate',
            label: 'Joining Date',
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
            id: 'actions',
            label: 'Actions',
            flex:1,
            align:'center',
          },
          
      ];
      
      function createData(si,doctorname,email,mobileno,address,specialization,experience,qualification,hospitalname,availability,joiningdate,status) {
        return {
          si,
          doctorname,
          email,
          mobileno,
          address,
          specialization,
          experience,
          qualification,
          hospitalname,
          availability,
          joiningdate,
          status,
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
        createData("1","AMRITA", "amrita@gmai","9876543212","Ranchi", "Heart", "10", "MBBS", "Aims","yes","12-6-2005","active"),
        createData(2, "NITU", "nitu@123","4896325489","Ranchi", "Skin" ,"8", "MBBS", "Aims","yes","4/9/15","view"),
        createData(3, "RITU", "ritu@123","2589631478","Bhubneswar", "Stomach", "7", "MBBS", "Ranchi main hospital","yes","5/6/16","active"),
        createData(4, "RANI", "rani@123","1236958745","Delhi", "Blood", "9", "MBBS", "Government hospital","yes","9/5/18","active",),
        createData(5, "SUMAN", "suman@123","4563217896","Ranchi", "Cancer", "14", "MBBS", "Aims","yes","5/8/20","view"),
        createData(6, "PRIYANKA", "priyanka@123","2598745632","Delhi", "Kidney disease", "9", "MBBS", "Government hospital","yes","3/8/17","active"),
        createData(7, "ANNU", "annu@123","3625265987","Parsudih", "Brain", "6", "MBBS", "Sadar hospital","yes","2/4/14","active"),
        createData(8, "SNEHA", "sneha@123","2564563256","Delhi", "Pregnancy", "9", "MBBS", "Government hospital","yes","4/7/18","active"),
        createData(9, "PUNAM", "punam@123","2365987456","Ranchi", "Cancer", "8", "MBBS", "Aims","yes","12/4/17","active"),
        createData(10, "SONAL", "sonal@123","9874563212","Ranchi", "Eye", "9", "MBBS", "Aims","yes","6/9/19","active"),
        createData(11, "MITU", "mitu@123","2596314587","Ranchi", "Whole Body", "9", "MBBS", "Aims","yes","1/7/14","active"),
        createData(12, "SUSMITA", "susmita@123","2126541233","Ranchi", "Ears", "9", "MBBS", "Aims","yes","5/7/18","active"),
        createData(13, "ISHA", "isha@123","9635248741","Delhi", "Back Pain", "7", "MBBS", "Government hospital","yes","4/7/12","active"),
        createData(14, "PRIYA", "priya@123","9548712365","Ranchi", "Feet", "7", "MBBS", "Aims","yes","5/6/19","active"),
      createData(15, "ISHU", "isha@123","9687456321","Ranchi","Lung cancer", "8", "MBBS", "Aims","yes","5/5/13","active"),
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

export default AllDoctor;