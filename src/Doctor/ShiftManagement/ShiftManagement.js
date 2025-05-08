import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import CloseIcon from "@mui/icons-material/Close";

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

import ViewShiftManagement from "./View/View";

import EditShiftManagement from "./Edit/Edit";
import DeleteShiftManagement from "./Delete/Delete";
import Cookies from 'js-cookie';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import Search from "../../Search/Search";
import CreateShiftManagement from "./Create/Create";

const ShiftManagement = () => {

  const [openData, setOpenData] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  const Base_url = process.env.REACT_APP_BASE_URL;

  const columns = [
    { id: 'siNo', label: 'SI.No', flex: 1,align: 'center'  },
    { id: 'doctorName', label: 'Doctor Name', flex: 1, align: 'center' },
    { id: 'specialization', label: 'Specialization', flex: 1, align: 'center' },
    { id: 'department', label: 'Department', flex: 1, align: 'center' },
    {id: 'shiftStartDate', label: 'Shift Start Date', flex: 1, align: 'center'},
    {id: 'shiftEndDate', label: 'Shift End Date', flex: 1, align: 'center'},
    {id: 'workDays', label: 'Work Days', flex: 1, align: 'center'},
    {id: 'shiftHours', label: 'Shift Hours', flex: 1, align: 'center'},
    {id: 'shiftType', label: 'Shift Type', flex: 1, align: 'center'},
    {id: 'availabilityStatus', label: 'Availability Status', flex: 1, align: 'center'},
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];

  const [filteredRows, setFilteredRows]=useState([]);
  const [searchTerm, setSearchTerm]= useState("");

  useEffect(()=>
    {
  
       const fetchShiftManagementData = async () => {
  
        try {
      
          const response = await fetch(`${Base_url}/shiftmanagement`, {
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
              createData(index + 1, item, item.doctorName, item.specialization, item.department, new Date(item.shiftStartDate).toLocaleDateString("en-IN"), new Date(item.shiftEndDate).toLocaleDateString("en-IN"), item.workDays, item.shiftHours, item.shiftType, item.availabilityStatus)
            );
         
            setRows(formattedData)
            setFilteredRows(formattedData)
          } 
  
       } 
          catch (error) {
              console.error("Error fetching ShiftManagement data:", error);
          }
      };

      if(loading)
        {
            fetchShiftManagementData();
        }
    
     },[loading])
    
  const  createData = (siNo,row,  doctorName,  department,  specialization,  shiftStartDate,  shiftEndDate,  workDays,   shiftHours,  shiftType,   availabilityStatus ) => ({
    siNo,
    row,
    doctorName,  
    department,  
    specialization,  
    shiftStartDate,  
    shiftEndDate,  
    workDays,   
    shiftHours,  
    shiftType,   
    availabilityStatus,
    actions: (
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
    fetch(`${Base_url}/shiftmanagement/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Shift Management deleted successfully!");
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
  const handleCreate = () => {
   setLoading(true);
    setOpenData(false);
  };

  const handleUpdate = () => {
     setLoading(true);
    setEditShow(false);
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
        row.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(row.shiftStartDate).includes(searchTerm)  ||
        String(row.shiftEndDate).includes(searchTerm)  ||
        row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.specialization.toLowerCase().includes(searchTerm.toLowerCase())  ||
        row.shiftType.toLowerCase().includes(searchTerm.toLowerCase())||
        row.availabilityStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]); 

  return (
    <>
    <ToastContainer />

    <Box className="container">
      <Search searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add Shift Management" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="shiftmanagement table">
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
          ? "Create New Shift Management"
          : viewShow
          ? "View Shift Management"
          : editShow
          ? "Edit Shift Management"
          : deleteShow
          ? "Delete Shift Management"
          : ""
        }

        dialogContent={
          openData ? (
            <CreateShiftManagement handleCreate={handleCreate} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewShiftManagement viewData={viewData} />
          ) : editShow ? (
            <EditShiftManagement
              editData={editData}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          ) : deleteShow ? (
            <DeleteShiftManagement
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

export default ShiftManagement;