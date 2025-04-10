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

const Expense=()=>
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
    { id: 'expenseid', label: 'Transaction Id', flex: 1, align: 'center' },
    { id: 'expensecategory', label: 'Expense Category', flex: 1, align: 'center' },
    { id: 'payeename', label: 'Payee Name', flex: 1, align: 'center' },
    { id: 'date', label: 'Date', flex: 1, align: 'center' },
    {id: 'time', label: 'Time', flex: 1, align: 'center'},
    {id: 'amount', label: 'Amount', flex: 1, align: 'center'},
    {id: 'paymentmethod', label: 'Payment Method', flex: 1, align: 'center'},
    {id: 'status', label: 'Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  
      
      function createData(expenseid, expensecategory, payeename, date , time, amount, paymentmethod, status, actions) {
        return { expenseid, expensecategory,payeename, date , time, amount, paymentmethod, status,
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
        createData('EXP001', 'Medical Supplies', 'Med Euip Ltd', "2/9/2004", '9:00', '500','Credit Card','Pending','View/Edit/Delete'),
        createData('EXPOO2', 'Staff Salaries', 'Dr. John Doe ', "2/7/2022", '10:00', '900','Cash','Cancelled','View/Edit/Delete'),
        createData('EXP003','Utility Bills', 'Power Grid Co',"3/02/2023",'11:00','1000','Google Pay','Rescheduled','View/Edit/Delete'),
        createData('EXP004','Maintenance', 'ABC Services',"12/12/12",'12:00','1500','Phone Pay','Confirmed','View/Edit/Delete'),
        createData('EXP004','Office Services','Stationery Hub',"12/12/12",'12:00','2000','UPI','Completed','View/Edit/Delete'),
        createData('EXP006','Rent', 'XYX Properties',"3/5/2024",'8:00','2500','Bank Transfer','Pending','Completed','View/Edit/Delete'),
        createData('EXP007','Equipment Purchase', 'Medi Tech Inc',"5/8/2005",'7:00','3000','Credit Card','Confirmed',''),
        createData('EXP008','Cleaning Services', 'Clean & Co.',"3/2/24",'6:00','3500','Phone Pay','Completed','View/Edit/Delete' ),
        createData('EXP009','Internet & Phones', 'Telecom Ltd',"4/4/12",'7:00','4000','Cash','Confirmed','View/Edit/Delete' ),
        createData('EXP010','Advertising', 'Media Agency','8/9/12','6:00','5000','Google Pay','Cancelled','View/Edit/Delete'),
        
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
        <Search onAddClick={onAddClick}  buttonText="+ Add Expense"/>
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
         {openData? "Create New Expense" : viewData ? "View Expense Details": editData?"Edit Expense Details":deleteData?"Delete Expense":null}
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

export default Expense;