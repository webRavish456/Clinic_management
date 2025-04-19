import React, { useEffect, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CloseIcon from "@mui/icons-material/Close";
import Search from "../Search/Search";
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
import CommonDialog from "../Component/CommonDialog/CommonDialog";
import DeleteStaff from "./Delete/Delete";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Staff=()=>
  {
  
    const [openData, setOpenData] = useState(false)
  
    const [viewData, setViewData] = useState(false)
  
    const [editData, setEditData] = useState(false)
  
    const [deleteData, setDeleteData] = useState(false)

     const [rows, setRows] = useState([]);
      const [loading, setLoading] = useState(true);
    
      const token = Cookies.get("token");
      const Base_url = process.env.REACT_APP_BASE_URL;

      const navigate = useNavigate();
   
   
  
   const handleView = (id) =>
    {
      navigate(`/viewstaff/${id}`)
    }
  
  const handleEdit = (id) =>
  {
    navigate(`/editstaff/${id}`)
  }
  
  const handleDelete = () =>
    {
      setDeleteData(true)
    }
  

const columns = [
  { id: 'si', label: 'SI.No', flex:1, align:'center' },
  { id: 'staffName', label: 'Staff Name', flex:1, align:'center' },
  
  {id: 'designation',label: 'Designation',flex:1,align: 'center',},
  {id: 'mobileNumber',label: 'Mobile Number',flex:1,align: 'center',},
  
  {id: 'emailId',label: 'Email ID',flex:1, align: 'center',},
  { id: 'shift',label: 'Shift ', flex:1, align: 'center',},
 
  {id: 'address',label: 'Address ',flex:1,align: 'center',},
  {id: 'salary',label: 'Salary',flex:1,align: 'center', },

  {id: 'joiningDate',label: 'Joining Date ', flex:1, align: 'center',},
  {id: 'status',label: ' Availability Status',flex:1,align: 'center', },
  {id: 'action',label: 'Actions', flex:1,align: 'center', },
 
];

useEffect(() => {
  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${Base_url}/staff`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.text();
      const res = JSON.parse(result);


      if (res.status === "success") {
        setLoading(false);
        const formattedData = res.data.map((item, index) =>
          createData(
            index + 1,
            item._id,
            item.staffName,
            item.companyDetails.designation,
            item.mobileNumber,
            item.emailId,
            item.shift,
            item.address,
            item.companyDetails.salary,
            item.companyDetails.joiningDate,
            item.availabilityStatus
          )
        );
        setRows(formattedData);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  if (loading) {
    fetchStaffData();
  }
}, [loading]);

function createData(si, id, staffName, designation, mobileNumber, emailId,  shift, address, salary, joiningDate,status ) {
  return { si, id, staffName, designation, mobileNumber, emailId,  shift, address, salary, joiningDate , status, action: (
      <>
      <IconButton style={{color:"rgb(13, 33, 121)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleView(id)}>
        <VisibilityIcon />
      </IconButton>
      <IconButton style={{color:"rgb(98, 99, 102)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleEdit(id)}>
        <EditIcon />
      </IconButton>
      <IconButton style={{color:"rgb(224, 27, 20)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleDelete(id)}>
        <DeleteIcon />
      </IconButton>
      </>
    ),
   };
}


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
       navigate("/createstaff")
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
      <Search onAddClick={onAddClick} buttonText="+ Add Staff"/>
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
         {deleteData?"Delete Staff Details":null}
      </>}
      
      dialogContent = {
         deleteData? <DeleteStaff handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

   
    </Box>
  );
}

export default Staff;