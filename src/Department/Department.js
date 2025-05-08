import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import ViewDepartment from "./View/View";
import CreateDepartment from "./Create/Create";
import EditDepartment from "./Edit/Edit";
import DeleteDepartment from "./Delete/Delete";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Department = () => {
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
    { id: "si", label: "SI.No", align: "center" },
    { id: "departmentName", label: "Department Name", align: "center" },
    { id: "specialization", label: "N.o of Specialization ", align: "center" },
    { id: "description", label: "Description", align: "center" },
    { id: "departmentHead", label: "Department Head", align: "center" },
    { id: "status", label: "Status", align: "center" },
    { id: "action", label: "Actions", align: "center" },
  ];



  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`${Base_url}/department`, {
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
              item.departmentName,
              Array.isArray(item.specialization)
                ? item.specialization.length
                : item.specialization?.split(",").length || 0,
              item.description,
              item.departmentHead,
              item.status
            )
          );
          setRows(formattedData);
          setFilteredRows(formattedData)
        }
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    if (loading) {
      fetchDepartmentData();
    }
  }, [loading]);

  const createData = (
    si,
    row,
    departmentName,
    specialization,
    description,
    departmentHead,
    status
  ) => ({
    si,
    row,
    departmentName,
    specialization,
    description:
      description && description.length > 60
        ? `${description.slice(0, 60)}...`
        : description,
    departmentHead,
    status,
    action: (
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <IconButton
          sx={{ color: "#072eb0", padding: "4px", transform: "scale(0.9)" }}
          onClick={() => handleView(row)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#6b6666", padding: "4px", transform: "scale(0.9)" }}
          onClick={() => handleEdit(row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#e6130b", padding: "4px", transform: "scale(0.9)" }}
          onClick={() => handleShowDelete(row._id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
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
    fetch(`${Base_url}/department/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Department deleted successfully!");
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

  useEffect(() => {

    const filtered = rows.filter(
      (row) =>
        row.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]); 

  return (
    <>
      <ToastContainer />
      <Box className="container">
        <Search searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Department" />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="Department table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        fontWeight: 700,
                        padding: column.id === "action" ? "8px" : "12px 24px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" key={row.row._id || row.si}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            padding:
                              column.id === "action" ? "8px" : "12px 24px",
                          }}
                        >
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
              ? "Create New Department"
              : viewShow
              ? "View Department"
              : editShow
              ? "Edit Department"
              : deleteShow
              ? "Delete Department"
              : ""
          }
          dialogContent={
            openData ? (
              <CreateDepartment
                handleCreate={handleCreate}
                handleClose={handleClose}
              />
            ) : viewShow ? (
              <ViewDepartment viewData={viewData} />
            ) : editShow ? (
              <EditDepartment
                editData={editData}
                handleUpdate={handleUpdate}
                handleClose={handleClose}
              />
            ) : deleteShow ? (
              <DeleteDepartment
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

export default Department;