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
import ViewLab from "./View/View";
import CreateLab from "./Create/Create";
import EditLab from "./Edit/Edit";
import DeleteLab from "./Delete/Delete";
import Search from "../../Search/Search";

const AllLab=()=>
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
    { id: 'siNo', label: 'SI.No', flex: 1,align: 'center'  },
    { id: 'labName', label: 'Lab Name', flex: 1, align: 'center' },
    { id: 'labType', label: 'Lab Type', flex: 1, align: 'center' },
    { id: 'assigneeStaff', label: 'Assignee Staff', flex: 1, align: 'center' },
    {id: 'shift', label: 'Shift', flex: 1, align: 'center'},
    {id: 'status', label: 'Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];
  function createData(siNo, labName, labType, assigneeStaff, shift, status, actions) {
    return {siNo, labName, labType, assigneeStaff, shift,  status, actions: (
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
        createData('1', 'Health Trust Lab ', 'Clinical Laboratory', 'Aashu Kumari', 'Morning', 'Active'),
        createData('2', 'QuickPath Diagnostics', 'Pathology Lab', 'Chandra Kaushal', 'Morning', 'Active'),
        createData('3','ScanWell Imaging', 'Diagnostic Lab','Rahul Singh','Evening','Inactive'),
        createData('4','GeneX Labs','Molecular Diagnostoics', 'Praveen Kumar','Morning','Active'),
        createData('5','Hematology Lab','Hematology','Jhuma Das','Evening','Active'),
        createData('6','Molecular Diagnostics Lab', 'Molecular Biology','Anil Kumar','Evening','Inactive'),
        createData('7','Blood Bank', 'Transfusion Medicine', 'Neha Sehar', 'Morning', 'Active'),
        createData('8','Toxicology Lab', 'Toxicology', 'Sandeep Mathur','Morning','Active'),
        createData('9','Immunology Lab', 'Immunology', 'Renu Bansal','Morning','Active'),
        createData('10','Parasitology Lab', 'Parasitology','Yogesh Kumar','Evening','Inactive'),
      
        
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
        <Search onAddClick={onAddClick} buttonText="+ Add Lab"/>
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
         {openData? "Create New All Lab" : viewData ? "View All Lab": editData?"Edit All Lab":deleteData?"Delete All Lab":null}
      </>}
      
      dialogContent = {
         openData ? <CreateLab handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewLab /> : 
         editData ? <EditLab handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteLab handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default AllLab;