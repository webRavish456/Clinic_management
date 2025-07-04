import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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



import ViewAllPatients from "./View/View";
import CreateAllPatients from "./Create/Create";
import EditAllPatients from "./Edit/Edit";
import DeleteAllPatients from "./Delete/Delete";

import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import Search from "../../Search/Search";

const AllPatients = () => {
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

  const token= localStorage.getItem("token");
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [filteredRows, setFilteredRows]=useState([]);
  const [searchTerm, setSearchTerm]= useState("");

  const columns = [
    { id: "si", label: "SI.No", flex: 1, align: "center" },
    { id: "name", label: " Name", flex: 1, align: "center" },
    { id: "gender", label: "gender", flex: 1, align: "center" },
    { id: "mobileNo", label: "Mobile No", flex: 1, align: "center" },
    { id: "email", label: "Email", flex: 1, align: "center" },
    { id: "bloodGroup", label: "Blood Group", flex: 1, align: "center" },
    { id: "admissionDate", label: "Admit Date", flex: 1, align: "center" },
    { id: "address", label: "Address", flex: 1, align: "center" },
    { id: "status", label: "Status", flex: 1, align: "center" },
    { id: "action", label: "Action", flex: 1, align: "center" },
  ];

  useEffect(() => {
    const fetchAllPatientsData = async () => {
      try {
        const response = await fetch(`${Base_url}/allpatients`, {
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
              item.name,
              item.mobileNo,
              item.email,
              item.gender,
              item.bloodGroup,
              item.address,
              new Date(item.admissionDate).toLocaleDateString("en-IN"),       
              item.status
            )
          );
          setRows(formattedData);
          setFilteredRows(formattedData)
        }
      } catch (error) {
        console.error("Error fetching allpatients data:", error);
      }
    };

    if (loading) {
      fetchAllPatientsData();
    }
  }, [loading]);

  const createData = (si, row, name,mobileNo,email,gender,bloodGroup,address,admissionDate, status) => ({
    si,
    row,
    name,
    mobileNo,
    email,
    gender,
    bloodGroup,
    address,
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
    console.log("row",row)
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
    fetch(`${Base_url}/allpatients/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("allpatients deleted successfully!");
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
      setRowsPerPage(e.target.value);
      setPage(0);
    };

    useEffect(() => {

      const filtered = rows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(row.mobileNo).includes(searchTerm)  ||
          String(row.admissionDate).includes(searchTerm)  ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.status.toLowerCase().includes(searchTerm.toLowerCase())  
      );
      setFilteredRows(filtered);
    }, [searchTerm, rows]); 

  return (
    <>
      <ToastContainer />
      <Box className="container">
        <Search  searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Patient" />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="allpatients table">
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
              ? "Create New Patient"
              : viewShow
              ? "View Patient"
              : editShow
              ? "Edit Patient"
              : deleteShow
              ? "Delete Patient"
              : ""
          }
          dialogContent={
            openData ? (
              <CreateAllPatients handleCreate={handleCreate} handleClose={handleClose} />
            ) : viewShow ? (
              <ViewAllPatients viewData={viewData} />
            ) : editShow ? (
              <EditAllPatients
                editData={editData}
                handleUpdate={handleUpdate}
                handleClose={handleClose}
              />
            ) : deleteShow ? (
              <DeleteAllPatients
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

export default AllPatients;
