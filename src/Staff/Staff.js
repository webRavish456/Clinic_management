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

const Staff=()=>
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
        { id: 'si', label: 'SI. No.', flex:1, align:'center' },
        { id: 'name', label: 'Name', flex:1,align:'center' },
        {
          id: 'email',
          label: 'Email',
          flex:1,
          align:'center'
        },
        {
          id: 'mobileno',
          label: 'Mobile No.',
          flex:1,
           align:'center'
        },
        {
          id: 'role',
          label: 'Role',
          flex:1,
          align:'center',
        },
        {
            id: 'salary',
            label: 'Salary',
            flex:1,
            align:'center',
          },
          {
            id: 'shift',
            label: 'Shift',
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
            id: 'joiningdate',
            label: 'Joining date',
            flex:1,
            align:'center',
          },
          {
            id: 'actions',
            label: 'Action',
            flex:1,
            align:'center',
          },
      ];
      
      function createData(si, name, email, mobileno, role, salary, shift, status, joiningdate, action) {
        return {
          si,
          name,
          email,
          mobileno,
          role,
          salary,
          shift,
          status,
          joiningdate,
          actions: (
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
        createData(1, "Manish", "manish.cao@gmail.com", "8126797783", "Nurse", "60000", "Morning", "Active", "04/01/2024"),
        createData(2, "Poonam", "poonam.jati@gmail.com", "9456862568", "Technician", "70000", "Evening", "Active", "15/06/2023"),
        createData(3, "Sunil", "sunil1970@gmail.com", "9808315747", "Admin", "100000", "Rotational", "On Leave", "12/05/2022"),
        createData(4, "Sandeep", "sandeep76@gmail.com", "9897741319", "Admin", "100000", "Evening", "Active", "10/11/2021"),
        createData(5, "Aman", "aman.dei@gmail.com", "9927313370", "Nurse", "70000", "Morning", "Inactive", "25/02/2020"),
        createData(6, "Radha", "radharani@gmail.com", "9410203288", "Receptionist", "80000", "Evening", "Active", "06/10/2022"),
        createData(7, "Reema", "reema.johri@gmail.com", "8923538354", "Technician", "75000", "Morning", "Inactive", "15/12/2024"),
        createData(8, "Ajay", "ajaysinha@gmail.com", "8445177997", "Admin", "150000", "Rotational", "Active", "27/07/2024"),
        createData(9, "Khushboo", "khushboo31@gmail.com", "9457871060", "Support", "45000", "Morning", "Active", "13/09/2023"),
        createData(10, "Kavita", "kavita5@gmail.com", "8439418577", "Nurse", "90000", "Evening", "On Leave", "22/05/2020"),
        createData(11, "Aditya", "aditya77@gmail.com", "9358231669", "Nurse", "100000", "Evening", "Active", "09/12/2021"),
        createData(12, "Sunil", "sunilk@gmail.com", "9456432260", "Receptionist", "75000", "Morning", "Active", "23/08/2024"),
        createData(13, "Rakesh", "rakesh34@gmail.com", "9897346746", "Support", "50000", "Rotational", "Active"),
        createData(14, "Jyoti", "jyotiverma@gmail.com", "7302386555", "Nurse", "100000", "Evening", "On Leave"),
        createData(15, "Santosh", "santosh.dei@gmail.com", "9027541271", "Admin", "95000", "Morning", "Active")
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

export default Staff;