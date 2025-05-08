import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import CloseIcon from "@mui/icons-material/Close";
import Search from "../Search/Search";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  IconButton,
} from "@mui/material";
import CommonDialog from "../Component/CommonDialog/CommonDialog";

import ViewAppointment from "./View/View";
import CreateAppointment from "./Create/Create";
import EditAppointment from "./Edit/Edit";
import DeleteAppointment from "./Delete/Delete";
import Cookies from 'js-cookie';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment= () => {

  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows]=useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm]= useState("");

  const token = Cookies.get("token");

  const Base_url = process.env.REACT_APP_BASE_URL;

  const columns = [
    { id: 'patientName', label: 'Patient Name', flex: 1, align: 'center' },
    { id: 'treatment', label: 'Treatment', flex: 1, align: 'center' },
      { id: 'doctorAssigned', label: 'Assigned Doctor', flex: 1,align: 'center'  },
      { id: 'gender', label: 'Gender', flex: 1, align: 'center' },
      {id: 'mobileNo', label: 'Mobile No', flex: 1, align: 'center'},
      {id: 'emailId', label: 'Email Id', flex: 1, align: 'center'},
      { id: 'appointmentDate', label: 'Appointment Date', flex: 1, align: 'center' },
      {id: 'appointmentStatus', label: 'Appointment Status', flex: 1, align: 'center'},
      { id: 'visitType', label: 'Visit Type', flex: 1, align: 'center' },
      { id: 'action', label: 'Actions', flex: 1, align: 'center' },
    ];
  

  useEffect(()=>
    {
  
       const fetchAppointmentData = async () => {
  
        try {
      
          const response = await fetch(`${Base_url}/appointment`, {
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
              createData( item, item.patientName, item.doctorAssigned, item.treatment, item.gender, new Date(item.appointmentDate).toLocaleDateString("en-IN"), item.mobileNo, item.emailId, item.appointmentStatus, item.visitType, item.status)
            );
         
            setRows(formattedData)
            setFilteredRows(formattedData)
          } 
      
  
       } 
          catch (error) {
              console.error("Error fetching appointment data:", error);
          }
      };

      if(loading)
        {
            fetchAppointmentData();
        }
    
     },[loading])
    
  const  createData = (row, patientName, doctorAssigned, treatment, gender, appointmentDate, mobileNo, emailId, appointmentStatus, visitType) => ({
      row,patientName, doctorAssigned, gender, treatment, appointmentDate, mobileNo, emailId, appointmentStatus, visitType, action : (
      <>
                    <IconButton style={{ color: "#072eb0", padding: "4px", transform: "scale(0.8)" }}
                     onClick={()=>handleView(row)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton style={{ color: "#6b6666", padding: "4px", transform: "scale(0.8)" }} 
                    onClick={()=>handleEdit(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton style={{ color: "#e6130b", padding: "4px", transform: "scale(0.8)" }} 
                    onClick={()=>handleShowDelete(row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
    ),
  });

  const handleView = (row) => {
    setViewData(row);
    setViewShow(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setEditShow(true);
  };

  const handleShowDelete = (id) => {
    setDeleteId(id);
    setDeleteShow(true);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`${Base_url}/appointment/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Appointment deleted successfully!");
          setLoading(true);
        } else {
          toast.error(res.message);
        }
        setIsDeleting(false);
        handleClose();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        setIsDeleting(false);
      });
  };

  const handleClose = () => {
    setOpenData(false);
    setViewShow(false);
    setEditShow(false);
    setDeleteShow(false);
  };
  const handleCreate = (data) => {
     setLoading(data);
  };

  const handleUpdate = (data) => {
    setLoading(data);
  };

  const onAddClick = () => setOpenData(true);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  useEffect(() => {

    const filtered = rows.filter(
      (row) =>
        row.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(row.mobileNo).includes(searchTerm)  ||
        row.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.doctorAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.appointmentStatus.toLowerCase().includes(searchTerm.toLowerCase())  ||
        String(row.appointmentDate).includes(searchTerm) ||
        row.visitType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]); 

  return (
    <>
    <ToastContainer />

    <Box className="container">
      <Search searchTerm={searchTerm}
      setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Appointment" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="Appointment table">
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (

                    <TableRow hover role="checkbox"  key={idx}>
                      {columns.map((column) => (
                        
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id]}
                          </TableCell>
                            ))}
                            </TableRow>
                          ))}     
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
        open={openData || viewShow || editShow || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData
          ? "Create New Appointment"
          : viewShow
          ? "View Appointment"
          : editShow
          ? "Edit Appointment"
          : deleteShow
          ? "Delete Appointment"
          : ""
        }

        dialogContent={
          openData ? (
            <CreateAppointment handleCreate={handleCreate} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewAppointment viewData={viewData} />
          ) : editShow ? (
            <EditAppointment
              editData={editData}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          ) : deleteShow ? (
            <DeleteAppointment
              handleDelete={handleDelete}
              isDeleting={isDeleting}
              handleClose={handleClose}
            />
          ) : null
        }

      />

    </Box>
    </>
    
  );
};

export default Appointment;