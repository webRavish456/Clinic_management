import React, { useEffect, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import CloseIcon from "@mui/icons-material/Close";
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box, IconButton} from "@mui/material";
import CommonDialog from "../Component/CommonDialog/CommonDialog";
import ViewBranch from "./View/View";
import CreateBranch from "./Create/Create";
import EditBranch from "./Edit/Edit";
import DeleteBranch from "./Delete/Delete";
import Search from "../Search/Search";
import Cookies from 'js-cookie';

const Branch = () => {

    const [openData, setOpenData] = useState(false)

    const [viewData, setViewData] = useState(false)

    const [editData, setEditData] = useState(false)

    const [deleteData, setDeleteData] = useState(false)

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;

    const [loading, setloading] =useState(true)
    
    const [rows, setRows] = useState([])

    const handleView = () => {
        setViewData(true)
    }

    const handleEdit = () => {
        setEditData(true)
    }

    const handleDelete = () => {
        setDeleteData(true)
    }

      const columns = [
        { id: 'si', label: 'SI.No', flex: 1, align: 'center' },
       
        { id: 'branchname',label: 'Branch Name',flex: 1,align: 'center',},
        { id: 'location', label: 'Location', flex: 1, align: 'center', },
        
        { id: 'status', label: 'Status', flex: 1, align: 'center',},
        { id: 'action',label: 'Action',flex: 1,align: 'center',
        },
    ];

    

 useEffect(()=>
  {

     const fetchBranchData = async () => {

      try {
    
        const response = await fetch(`${Base_url}/branch`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`, 
           },
      });
    
        const result = await response.text();
        const res = JSON.parse(result);
    
        if (res.status === "success") {

           setloading(false);

           const formattedData = res.data.map((item, index) =>
            createData(index+1, item, item.branchName, item.branchLocation, item.status)
          );
       
          setRows(formattedData)
        } 

     } 
        catch (error) {
            console.error("Error fetching branch data:", error);
        }
    };
         
    if(loading)
    {
        fetchBranchData()
    }

 },[loading])

    function createData(si, row, branchname, location,  status) {
        return {
            si, row, branchname, location,  status, action: (

                <>
                    <IconButton style={{ color: "#072eb0", padding: "4px", transform: "scale(0.8)" }} onClick={()=>handleView(row)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton style={{ color: "#6b6666", padding: "4px", transform: "scale(0.8)" }} onClick={()=>handleEdit(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton style={{ color: "#e6130b", padding: "4px", transform: "scale(0.8)" }} onClick={()=>handleDelete(row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        };
    }


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onAddClick = () => {
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
            <Search onAddClick={onAddClick} buttonText='Add Branchlist' />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>


                    <Table stickyHeader aria-label="sticky table">
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
                dialogTitle={<>
                    {openData ? "Create New Branch " : viewData ? "View Branch " : editData ? "Edit Branch " : deleteData ? "Delete Branch " : null}
                </>}

                dialogContent={
                    openData ? <CreateBranch handleSubmit={handleSubmit} handleClose={handleClose} /> :
                        viewData ? <ViewBranch /> :
                            editData ? <EditBranch handleUpdate={handleUpdate} handleClose={handleClose} /> :
                                deleteData ? <DeleteBranch handleDelete={handleDelete} handleClose={handleClose} /> : null

                }

            />

        </Box>
    );
}

export default Branch;