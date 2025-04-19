import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CloseIcon from "@mui/icons-material/Close";
import Search from "../../Search/Search";
import { useNavigate } from "react-router-dom";

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
 
  IconButton,
  
} from "@mui/material";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import DeleteDoctor from "./Delete/Delete";

const AllDoctor=()=>
  {
  
    const [openData, setOpenData] = useState(false)
  
    const [viewData, setViewData] = useState(false)
  
    const [editData, setEditData] = useState(false)
  
    const [deleteData, setDeleteData] = useState(false)
   const navigate = useNavigate();
   
   
  
   const handleView = () =>
    {
      navigate("/viewDoctor")
    }
  
  const handleEdit = () =>
  {
    navigate("/editDoctor")
  }
  
  const handleDelete = () =>
    {
      setDeleteData(true)
    }
  

const columns = [
  { id: 'si', label: 'SI.No', flex:1, align:'center' },
  { id: 'doctorName', label: 'Doctor Name', flex:1, align:'center' },
  
  {id: 'emailId',label: 'Email Id',flex:1,align: 'center',},
  {id: 'mobileNumber',label: 'Mobile Number',flex:1,align: 'center',},
  
  {id: 'address',label: 'Address',flex:1, align: 'center',},
  { id: 'specialization',label: 'Specialization ', flex:1, align: 'center',},
 
  {id: 'qualification',label: 'Qualification ',flex:1,align: 'center',},
  {id: 'experience',label: 'Experience',flex:1,align: 'center', },

  {id: 'hospitalName',label: 'Hospital Name ', flex:1, align: 'center',},
  {id: 'joiningDate',label: 'Joining Date', flex:1, align: 'center',},
  {id: 'status',label: ' Availability Status',flex:1,align: 'center', },
  {id: 'action',label: 'Actions', flex:1,align: 'center', },
 
];

function createData(si, doctorName, mobileNumber, emailId, address, specialization, qualification, experience, hospitalName,  joiningDate,status ) {
  return { si, doctorName, mobileNumber, emailId, address, specialization, qualification, experience, hospitalName,joiningDate , status, action: (
      <>
      <IconButton style={{color:"rgb(13, 33, 121)", padding:"4px", transform:"scale(0.8)"}} onClick={handleView}>
        <VisibilityIcon />
      </IconButton>
      <IconButton style={{color:"rgb(98, 99, 102)", padding:"4px", transform:"scale(0.8)"}} onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton style={{color:"rgb(224, 27, 20)", padding:"4px", transform:"scale(0.8)"}} onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      </>
    ),
   };
}


const rows = [
  createData('1', 'Ritu', 'ritu@gmail.com' ,'1223448975', 'Sakchi', 'eye','MBBS','Two years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
  createData('2', 'Rita', 'rita@gmail.com' ,'9988776655', 'Bistupur', 'eye','MBBS','one years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
  createData('3', 'Rinki', 'rinki@gmail.com' ,'1223448975', 'Kadma', 'eye','MBBS','Three years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
  createData('4', 'Rashi', 'rashi@gmail.com' ,'1223448975', 'Ranchi', 'eye','MBBS',' Four years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
  createData('5', 'Rashmi', 'rashmi@gmail.com' ,'1223448975', 'Sonari', 'eye','MBBS','One years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
  createData('6', 'Ritika', 'ritika@gmail.com' ,'1223448975', 'Mango', 'eye','MBBS','Three years', 'Sita Raman Hospital' ,'12/10/2023','Availabel'),
];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onAddClick =()=>
    {
       navigate("/createDoctor")
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
      <Search onAddClick={onAddClick} buttonText="+Add Doctor"/>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 700 }}
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
      open={deleteData} 
      onClose={handleClose}
      dialogTitle={ <>
         {deleteData?"Delete Doctor Details":null}
      </>}
      
      dialogContent = {
         deleteData? <DeleteDoctor handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

   
    </Box>
  );
}

export default AllDoctor;