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

import ViewExpense from "./View/View";
import CreateExpense from "./Create/Create";
import EditExpense from "./Edit/Edit";
import DeleteExpense from "./Delete/Delete";
import Cookies from 'js-cookie';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Expense= () => {

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
    { id: 'expenseCategory', label: 'Expense Category', flex: 1, align: 'center' },
  { id: 'expenseId', label: 'Expense Id', flex: 1,align: 'center'  },
      { id: 'payeeName', label: 'Payee Name', flex: 1, align: 'center' },
      { id: 'date', label: 'Date', flex: 1, align: 'center' },
      
      {id: 'amount', label: 'Amount', flex: 1, align: 'center'},
      {id: 'paymentMethod', label: 'Payment Method', flex: 1, align: 'center'},
      {id: 'status', label: 'Status', flex: 1, align: 'center'},
     { id: 'action', label: 'Actions', flex: 1, align: 'center' },
    ];
  

  useEffect(()=>
    {
  
       const fetchExpenseData = async () => {
  
        try {
      
          const response = await fetch(`${Base_url}/expense`, {
           method: "GET",
           headers: {
              Authorization: `Bearer ${token}`, 
             },
        });
      
          const result = await response.text();
          const res = JSON.parse(result);

          console.log(res)
      
          if (res.status === "success") {
  
             setLoading(false);
  
             const formattedData = res.data.map((item, index) =>
              createData(item, item.expenseCategory, item._id, item.payeeName, item.date, item.amount, item.paymentMethod, item.status)
            );
         
            setRows(formattedData)
          } 
  
       } 
          catch (error) {
              console.error("Error fetching income data:", error);
          }
      };

      if(loading)
        {
            fetchExpenseData();
        }
    
     },[loading])
    
  const  createData = (row,expenseCategory,expenseId,payeeName,date,amount,paymentMethod,status) => ({
   row,expenseCategory,expenseId,payeeName,date,amount,paymentMethod,status,action : (
      <>
                    <IconButton style={{ color: "#072eb0", padding: "4px", transform: "scale(0.8)" }}
                     onClick={()=>handleView(rows)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton style={{ color: "#6b6666", padding: "4px", transform: "scale(0.8)" }} 
                    onClick={()=>handleEdit(rows)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton style={{ color: "#e6130b", padding: "4px", transform: "scale(0.8)" }} 
                    onClick={()=>handleShowDelete(rows._id)}>
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
    fetch(`${Base_url}/expense/${deleteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status === "success") {
          toast.success("Expense deleted successfully!");
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
      <Search onAddClick={onAddClick} buttonText="+Add Expense" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="Expense table">
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
          ? "Create New Expense"
          : viewShow
          ? "View Expense"
          : editShow
          ? "Edit Expense"
          : deleteShow
          ? "Delete Expense"
          : ""
        }

        dialogContent={
          openData ? (
            <CreateExpense handleCreate={handleCreate} handleClose={handleClose} />
          ) : viewShow ? (
            <ViewExpense viewData={viewData} />
          ) : editShow ? (
            <EditExpense
              editData={editData}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
            />
          ) : deleteShow ? (
            <DeleteExpense
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

export default Expense;