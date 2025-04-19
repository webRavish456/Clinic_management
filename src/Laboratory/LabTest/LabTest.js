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

import ViewLabTest from "./View/View";

import EditLabTest from "./Edit/Edit";
import DeleteLabTest from "./Delete/Delete";
import Cookies from 'js-cookie';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import Search from "../../Search/Search";
import CreateLabTest from "./Create/Create";

const LabTest = () => {

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
    { id: 'patientId', label: 'Patient Id', flex: 1, align: 'center' },
    { id: 'patientName', label: 'Patient Name', flex: 1, align: 'center' },
    { id: 'mobileNo', label: 'Mobile No.', flex: 1, align: 'center' },
    { id: 'testName', label: 'Test Name', flex: 1, align: 'center' },
    {id: 'sampleCollectedOn', label: 'Sample Collected On', flex: 1, align: 'center'},
    {id: 'result', label: 'Result', flex: 1, align: 'center'},
    {id: 'doctorName', label: 'Doctor Name', flex: 1, align: 'center'},
    {id: 'assignedLabTechnician', label: 'Assigned Lab Technician', flex: 1, align: 'center'},
   { id: 'status', label: 'Status', flex: 1, align: 'center' },
   { id: 'actions', label: 'Actions', flex: 1, align: 'center' },
  ];

  useEffect(()=>
    {
  
       const fetchLabTestData = async () => {
  
        try {
      
          const response = await fetch(`${Base_url}/labtest`, {
           method: "GET",
           headers: {
              Authorization: `Bearer ${token}`, 
             },
        });
      
          const result = await response.text();
          const res = JSON.parse(result);
      
          if (res.status === "success") {
  
             setLoading(false);
  
             console.log(res)

             const formattedData = res.data.map((item, index) =>
              createData(index + 1, item, item.patientId, item.patientName, item.mobileNo, item.testName, item.sampleCollectedOn, item.result, item.doctorName, item.assignedLabTechnician, item.status,)
            );
         
            setRows(formattedData)
          } 
  
       } 
          catch (error) {
              console.error("Error fetching LabTest data:", error);
          }
      };

      if(loading)
        {
            fetchLabTestData();
        }
    
     },[loading])
    
  const  createData = (siNo,row, patientId, patientName, mobileNo, testName, sampleCollectedOn, result, doctorName, assignedLabTechnician,  status) => ({
  row,  siNo, patientId, patientName, mobileNo, testName, sampleCollectedOn, result, doctorName, assignedLabTechnician, status, actions: (
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
    fetch(`${Base_url}/labtest/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("LabTest deleted successfully!");
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
  const handleCreate = (refresh = true) => {
    if (refresh) setLoading(true);
    setOpenData(false);
  };

  const handleUpdate = (refresh = true) => {
    if (refresh) setLoading(true);
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

  return (
    <>
    <ToastContainer />

    <Box className="container">
      <Search onAddClick={onAddClick} buttonText="Add LabTest" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="labtest table">
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
        open={openData || viewData || editData || deleteShow}
        onClose={handleClose}
        dialogTitle={
          openData
          ? "Create New LabTest"
          : viewShow
          ? "View LabTest"
          : editShow
          ? "Edit LabTest"
          : deleteShow
          ? "Delete LabTest"
          : ""
        }

        dialogContent={
          openData ? (
            <CreateLabTest handleCreate={handleCreate} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewLabTest viewData={viewData} />
          ) : editShow ? (
            <EditLabTest
              editData={editData}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          ) : deleteShow ? (
            <DeleteLabTest
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

export default LabTest;