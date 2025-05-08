import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import CloseIcon from "@mui/icons-material/Close";
import Search from "../../Search/Search";

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
import CommonDialog from "../../Component/CommonDialog/CommonDialog";

import ViewIncome from "./View/View";
import CreateIncome from "./Create/Create";
import EditIncome from "./Edit/Edit";
import DeleteIncome from "./Delete/Delete";
import Cookies from 'js-cookie';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Income = () => {

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

    { id: 'sourceName', label: 'Source Name', flex: 1, align: 'center' },
      { id: 'description', label: 'Description', flex: 1, align: 'center' },
      {id: 'amount', label: 'Amount', flex: 1, align: 'center'},
      { id: 'transactionId', label: 'Transaction Id', flex: 1,align: 'center'  },
      {id: 'paymentMethod', label: 'Payment Method', flex: 1, align: 'center'},
      { id: 'dateReceived', label: 'Date Received', flex: 1, align: 'center' },
      {id: 'status', label: 'Status', flex: 1, align: 'center'},
     { id: 'action', label: 'Actions', flex: 1, align: 'center' },
    ];

    const [filteredRows, setFilteredRows]=useState([]);
    const [searchTerm, setSearchTerm]= useState("");
  
    useEffect(() => {

      const filtered = rows.filter(
        (row) =>
          row.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(row.dateReceived).includes(searchTerm)  ||
          String(row.amount).includes(searchTerm)  ||
          row.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.status.toLowerCase().includes(searchTerm.toLowerCase())  
      );
      setFilteredRows(filtered);
    }, [searchTerm, rows]); 

  useEffect(()=>
    {
  
       const fetchIncomeData = async () => {
  
        try {
      
          const response = await fetch(`${Base_url}/income`, {
           method: "GET",
           headers: {
              Authorization:` Bearer ${token}`, 
             },
        });
      
          const result = await response.text();
          const res = JSON.parse(result);
      
          if (res.status === "success") {
  
             setLoading(false);
  
             const formattedData = res.data.map((item, index) =>
              createData( item, item.sourceName,   item.transactionId ? item.transactionId : "------", item.description, new Date(item.dateReceived).toLocaleDateString("en-IN"),  `₹${item.amount}`, item.paymentMethod, item.status)
            );
         
            setRows(formattedData)
            setFilteredRows(formattedData)
          } 
  
       } 
          catch (error) {
              console.error("Error fetching income data:", error);
          }
      };

      if(loading)
        {
            fetchIncomeData();
        }
    
     },[loading])
    
  const  createData = (row,sourceName,transactionId,description,dateReceived,amount,paymentMethod,status) => ({
   row, sourceName,transactionId,description,dateReceived,amount,paymentMethod,status,action : (
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
    fetch(`${Base_url}/income/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Income deleted successfully!");
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

  return (
    <>
    <ToastContainer />

    <Box className="container">
      <Search searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Income" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="income table">
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
          ? "Create New Income"
          : viewShow
          ? "View Income"
          : editShow
          ? "Edit Income"
          : deleteShow
          ? "Delete Income"
          : ""
        }

        dialogContent={
          openData ? (
            <CreateIncome handleCreate={handleCreate} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewIncome viewData={viewData} />
          ) : editShow ? (
            <EditIncome
              editData={editData}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          ) : deleteShow ? (
            <DeleteIncome
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

export default Income;