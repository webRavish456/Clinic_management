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
import ViewDepartment from "./View/View";
import CreateDepartment from "./Create/Create";
import EditDepartment from "./Edit/Edit";
import DeleteDepartment from "./Delete/Delete";

const Department=()=>
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
        { id: 'si', label: 'SI.No', flex:1, align:'center' },
        { id: 'departmentname', label: 'Department Name', flex:1, align:'center' },
        { id: 'noofspecialization', label: 'No Of Specialization', flex:1, align:'center' },
        {
          id: 'description',
          label: 'Description',
          flex:1,
          align: 'center',
        },
        {
          id: 'departmenthead',
          label: 'Department Head',
          flex:1,
          align: 'center',
        },
        {
          id: 'date',
          label: 'Date',
          flex:1,
          align: 'center',
        },
        
        {
          id: 'status',
          label: 'Status',
          flex:1,
          align: 'center',
        },
        {
          id: 'actions',
          label: 'Actions',
          flex:1,
          align: 'center',
        },
      ];
      
        function createData(si, departmentname,noofspecialization, description, departmenthead, date, status, actions ) {
          return { si, departmentname,noofspecialization ,description, departmenthead, date, status, actions: (
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
          createData('1', 'Cardiology', 'Electophysiology','Deals with heart related diseases', 'Dr.A', '2025-03-29', 'Active', 'Edit/Delete/View'),
           createData('2', 'Neurology','Neurocritical Care' ,'Focuses on nervous system disorders', 'Dr.B', '2025-03-28', 'Active', 'Edit/Delete/View'),
         createData('3', 'Orthopedics','Spine Surgery' ,'Treats bone and muscle conditions', 'Dr.C', '2025-03-26', 'Active',  'Edit/Delete/View'),
          createData('4', 'Dermatology','Dermatopathalogy' ,'Skin related treatments and diseases', 'Dr. D', '2025-03-20', 'Active', 'Edit/Delete/View'),
          createData('5', 'Radiology','Chest Radiology' ,'Imaging and scaning department', 'Dr.E', '2025-03-12', 'Active', 'Edit/Delete/View'),
          createData('6', 'Pediatrics','Neonatology' ,'Focusing on common childhood illness treatment', 'Dr.F', '2025-03-10', 'Active', 'Edit/Delete/View'),
          createData('7', 'Pulmonology','Lung Cancer' ,'Repiratory & Lung Care,asthma & COPD Treatment', 'Dr.G', '2025-03-07', 'Active', 'Edit/Delete/View'),
          createData('8', 'Oncology', 'Gynecologic Oncology','Cancer treatment, chemotherapy', 'Dr.H', '2025-03-06', 'Active', 'Edit/Delete/View'),
          createData('9', 'Dental care', 'Oral Pathology','Oral Health & Surgery', 'Dr.I', '2025-03-03', 'Active', 'Edit/Delete/View'),
          createData('10', 'Nephrology', 'Dialysis Therapy','Kidney Diseases Treatment,Dialysis', 'Dr.J', '2025-03-01', 'Active', 'Edit/Delete/View'),










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
        <Search onAddClick={onAddClick} buttonText="+ Add Department"/>
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
         {openData? "Create New Department" : viewData ? "View Department Details": editData?"Edit Department Details":deleteData?"Delete Department Details":null}
      </>}
      
      dialogContent = {
         openData ? <CreateDepartment handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewDepartment /> : 
         editData ? <EditDepartment handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteDepartment handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default Department;