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
import ViewAppointment from "./View/View";
import CreateAppointment from "./Create/Create";
import EditAppointment from "./Edit/Edit";
import DeleteAppointment from "./Delete/Delete";

const Appointment=()=>
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
        { id: 'patientname', label: 'Patient Name', flex:1,align:'center' },
        {
          id: 'doctor',
          label: 'Doctor',
          flex:1,
          align:'center'
        },
        {
          id: 'gender',
          label: 'Gender',
          flex:1,
           align:'center'
        },
      
        {
            id: 'date',
            label: 'Date',
            flex:1,
            align:'center',
          },
          {
            id: 'time',
            label: 'Time',
            flex:1,
            align:'center',
          },
          {
            id: 'mobile',
            label: 'Mobile',
            flex:1,
            align:'center',
          },
    
{
          id: 'email',
          label: 'Email',
          flex:1,
          align:'center',
        },

       { id: 'appointmentstatus',
        label: 'Appointmentstatus',
        flex:1,
        align:'center',
       },
       {
        id: 'visittype',
        label: 'Visit Type',
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
      
      function createData(patientname,doctor,gender,date,time, mobile,email,appointmentstatus,visittype,actions) {
        return {
          patientname, 
          doctor,
          gender,date,time, mobile,email,appointmentstatus,visittype,actions: (
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
        createData( "Saniya Singha", "Shruti", "Female", "24-03-2025","10:00AM","6200000789","saniya0987@gmail.com","Pending","In-person Visit","Edit"),
        createData( "Anaya Das", "Arohi", "Female", "24-03-2025","12:00PM","6200000789","anaya345@gmail.com","Completed","Online Consulation","Edit"),
        createData( "Sarita kumari", "Shruti", "Female", "24-03-2025","9:00AM","6200000789","sarita456@gmail.com" ,"Rescheduled","In-person Visit","Edit"),
        createData( "Adil Khan", "Sara", "Male", "24-03-2025","9:00AM","9234567895","adil23@gmail.com","Cancelled","Online Consulation","Edit"),
        createData( "Amar Harsh", "Moumita", "Male", "24-03-2025","1:00PM","7654893423", "amar7543@gmail.com" ,"Completed","In-person Visit","Edit"),
        createData( "Asutosh", "Madhabi", "Male", "24-03-2025","10:00PM","7545893452",    "asutosh@gmail.com","Confirmed","Online Consulation","Edit"),
        createData( "Mukul Yadav", "Nil", "Male", "24-03-2025","9:00PM","3457892345",   "muk6767@gmail.com"   ,"Confirmed","In-person Visit","Edit"),
        createData( "Dayal Patra", "Naresh", "Male", "24-03-2025","8:00PM","9876543289", "dayal98@gmail.com"    ,"Completed","Online Consulation","Edit"),
        createData( "Sahanara Begum", "Mohua", "Female", "24-03-2025","10:00PM","7676895467",  "saha3434@gmail.com"    ,"Completed","In-person Visit","Edit"),
        createData( "Riya Singh", "Ayushi", "Female", "24-03-2025","11:00AM","6289896754",   "riya2323@gmail.com"     ,"Pending","In-person Visit","Edit"),
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
        <Search onAddClick={onAddClick} buttonText="+ Add Appointment"/>
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
         {openData? "Create New Appointment" : viewData ? "View Appointment Details": editData?"Edit Appointment Details":deleteData?"Delete Appointment":null}
      </>}
      
      dialogContent = {
         openData ? <CreateAppointment handleSubmit={handleSubmit} handleClose={handleClose} /> :
          viewData ? <ViewAppointment /> : 
         editData ? <EditAppointment handleUpdate={handleUpdate} handleClose={handleClose} /> : 
         deleteData? <DeleteAppointment handleDelete={handleDelete} handleClose={handleClose} />:null
        
      }

      />

      
    </Box>
    )
}

export default Appointment;