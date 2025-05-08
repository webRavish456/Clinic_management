import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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



import ViewPatientsRecords from "./View/View";
import CreatePatientsRecords from "./Create/Create";
import EditPatientsRecords from "./Edit/Edit";
import DeletePatientsRecords from "./Delete/Delete";

import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import Search from "../../Search/Search";

const PatientsRecords = () => {

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

  const [filteredRows, setFilteredRows]=useState([]);
  const [searchTerm, setSearchTerm]= useState("");

  const columns = [
    { id: "si", label: "SI.No", flex: 1, align: "center" },
    { id: "patientID", label: " Patient ID", flex: 1, align: "center" },
    { id: "patientname", label: "Patient Name", flex: 1, align: "center" },
    { id: "doctorAssigned", label: "Assigned Doctor", flex: 1, align: "center" },
    { id: "treatment", label: "Treatment", flex: 1, align: "center" },
    { id: "labReport", label: "Lab Report", flex: 1, align: "center" },
    { id: "admissionDate", label: "Admit Date", flex: 1, align: "center" },
    { id: "nextFollowUp", label: "Next FollowUp", flex: 1, align: "center" },
    { id: "status", label: "Status", flex: 1, align: "center" },
    { id: "action", label: "Action", flex: 1, align: "center" },
  ];


  useEffect(() => {

    const filtered = rows.filter(
      (row) =>
        row.patientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(row.nextFollowUp).includes(searchTerm)  ||
        String(row.admissionDate).includes(searchTerm)  ||
        row.doctorAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase())  
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]); 

  useEffect(() => {
    const fetchPatientsRecordsData = async () => {
      try {
        const response = await fetch(`${Base_url}/patientsrecords`, {
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
              item,
              item.patient._id,
              item.treatment,
              item.patientName,
              item.doctorAssigned,
              item.labReport,
              new Date(item.nextFollowUp).toLocaleDateString("en-IN"), 
              new Date(item.patient.admissionDate).toLocaleDateString("en-IN"),   
              item.patient.status
            )
          );
          setRows(formattedData);
          setFilteredRows(formattedData)
        }
      } catch (error) {
        console.error("Error fetching patientsrecords data:", error);
      }
    };

    if (loading) {
      fetchPatientsRecordsData();
    }
  }, [loading]);

  const createData = (si, row, patientID, treatment,patientname,doctorAssigned,labReport,nextFollowUp,admissionDate, status) => ({
    si,
    row,
    patientID,
    treatment,
    patientname,
    doctorAssigned,
     labReport,  
    nextFollowUp,
    admissionDate,
    status,
    action: (
      <>
        <IconButton
          style={{ color: "#072eb0", padding: "4px", transform: "scale(0.8)" }}
          onClick={() => handleView(row)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          style={{ color: "#6b6666", padding: "4px", transform: "scale(0.8)" }}
          onClick={() => handleEdit(row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          style={{ color: "#e6130b", padding: "4px", transform: "scale(0.8)" }}
          onClick={() => handleShowDelete(row._id)}
        >
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
    fetch(`${Base_url}/patientsrecords/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Patient Record deleted successfully!");
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
    setOpenData(false);
  };

  const handleUpdate = (data) => {
     setLoading(data);
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

  const handleClick = async (pdfUrl) => {
 
    try {
  
      const response = await fetch(pdfUrl.labReport);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${pdfUrl.courseName}-syllabus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
  
    }
     catch (error) {
      console.error("Failed to download PDF", error);
    }
  
  };

  return (
    <>
      <ToastContainer />
      <Box className="container">
        <Search searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Patient Record" />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="patientsrecords table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ fontWeight: 700 }}
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
                    <TableRow hover role="checkbox" key={idx}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{cursor:"pointer"}}>
                             {column.id === "labReport" ? (
                          <img
                            onClick={()=>handleClick(row.row)}
                            src="/pdf.png"
                            alt="item"
                            style={{ width: "30px", height: "30px", objectFit: "contain", cursor:"pointer" }}
                          />
                        ) : (
                          row[column.id]
                        )}
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
              ? "Create New Patient Record"
              : viewShow
              ? "View Patient Record"
              : editShow
              ? "Edit Patient Record"
              : deleteShow
              ? "Delete Patient Record"
              : ""
          }
          dialogContent={
            openData ? (
              <CreatePatientsRecords handleCreate={handleCreate} handleClose={handleClose} />
            ) : viewShow ? (
              <ViewPatientsRecords viewData={viewData} />
            ) : editShow ? (
              <EditPatientsRecords
                editData={editData}
                handleUpdate={handleUpdate}
                handleClose={handleClose}
              />
            ) : deleteShow ? (
              <DeletePatientsRecords
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

export default PatientsRecords;
