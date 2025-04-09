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
import ViewLaboratory from "./View/View";
import CreateLaboratory from "./Create/Create";
import EditLaboratory from "./Edit/Edit";
import DeleteLaboratory from "./Delete/Delete";
import Search from "../../Search/Search";

const Laboratory=()=>
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
    { id: 'incomeid', label: 'Income Id', flex: 1,align: 'center'  },
    { id: 'source', label: 'Source Name', flex: 1, align: 'center' },
    { id: 'description', label: 'Description', flex: 1, align: 'center' },
    { id: 'date', label: 'Date', flex: 1, align: 'center' },
    {id: 'time', label: 'Time', flex: 1, align: 'center'},
    {id: 'amount', label: 'Amount', flex: 1, align: 'center'},
    {id: 'paymentmethod', label: 'Payment Method', flex: 1, align: 'center'},
    {id: 'status', label: 'Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  function createData(incomeid,source ,description, date , time, amount, paymentmethod, status, actions) {
    return {incomeid,source,description, date , time, amount, paymentmethod, status, actions: (
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
        createData('INC001', 'Patient Payment', 'Consulation Fees', "2/9/2004", '9:00', '500','Credit Card','Pending','view/Edit/Delete'),
        createData('INCOO2', 'Insurance Claim', ' Reimbursement', "2/7/2022", '10:00', '800','Bank Transfer','Completed','View/Edit/Delete'),
        createData('INC003','Lab Test Payment', 'Blood Test Fees',"3/02/2023",'11:00','700','Cash','Rescheduled','View/Edit/Delete'),
        createData('INC004','Pharmacy Sale', 'Medicine Purchase',"12/12/12",'12:00','900','Cash','Cancelled','View/Edit/Delete'),
        createData('INC005','OPD Consulation','Doctor Consulation',"12/3/2023",'9:00','1000','Credit Card','Completed','View/Edit/Delete'),
        createData('INC006','Surgery Payment', 'Surgery Fees',"3/5/2024",'8:00','1200','Phone Pay','Confirmed','View/Edit/Delete'),
        createData('INC007','Insurance Claim', ' MRI Scan Fees', "2/7/2022", '10:00', '800','Bank Transfer','Completed','View/Edit/Delete'),
        createData('INC003','Lab Test Payment', 'Blood Test Fees',"5/8/2005",'7:00','1500','UPI','Completed','View/Edit/Delete'),
        createData('INC008','Health Package', 'Annual Health Check',"3/2/24",'6:00','1800','Google Pay','Pending','View/Edit/Delete' ),
        createData('INC009','Ambulance Service', 'Emergency Transport',"4/4/12",'7:00','2000','Credit Card','Rescheduled' ,'View/Edit/Delete'),
        createData('INC010','Donation', 'Charity Fund','8/9/12','6:00','5000','Cash','Completed','View/Edit/Delete'),
        
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
         {openData? "Create New Lab Test" : viewData ? "View Lab Test": editData?"Edit Lab Test":deleteData?"Delete Lab Test":null}
      </>}
      
      dialogContent = {
         openData ? <CreateLaboratory handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewLaboratory /> : 
         editData ? <EditLaboratory handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteLaboratory handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default Laboratory;