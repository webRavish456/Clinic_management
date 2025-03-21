import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import{ Box } from '@mui/material';
import Search from "../Search/Search";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'labName', label: 'Lab Name', flex: 1, align: 'center' },
  { id: 'labtype', label: 'Lab Type', flex: 1, align: 'center' },
  { id: 'assigneestaff', label: 'Assignee Staff', flex: 1, align: 'center' },
  {id: 'status', label: 'Status', flex: 1, align: 'center'}, 
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, labName, labtype, assigneestaff , status) {
  return { SI_no, labName, labtype, assigneestaff , status};
}

const rows = [
  createData('1', '', 'Pathology', 'subhashree',"Active"),
  createData('2', 'Lab name', ' Radiology', 'sneha', "Inactive"),
  createData('3','Lab name', 'Microbiology','ritu',"Active"),
  createData('4','Lab name', 'Radiology','amrita',"Inactive"),
  createData('5','Lab name', 'Pathology','prerna',"Active"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [viewData, setViewData] =useState(false)
   const [editData, setEditData] =useState(false)
   const [deleteData, setDeleteData] =useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleDelete = () => {
    // console.log('Delete item with ID:', id);
    // You can perform your delete logic here
    setDeleteData(true)

  };

  
  

  const handleEdit = () => {
    
    setEditData(true)
  };

  const handleClose = () => {
    setViewData(false);
    setEditData(false); // Close both dialogs when handleClose is called
    setDeleteData(false);
  };
  

  const handleView = () => {

    setViewData(true)
  };

  return (
    <>
    <Box className="container">
    <Search/>
    <Paper sx={{ width: '100%',overflow: 'hidden' }}>
      <TableContainer className="table" sx={{ maxHeight: 440, fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bolder', fontSize: '14px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust row slice based on page and rowsPerPage
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <div>
                            <IconButton onClick={() => handleView(row.SI_no)} color="black">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row.SI_no)} color="black">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.SI_no)} color="black">
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]} // Added more options for rows per page
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <Dialog
  open={viewData}
  onClose={handleClose}  // Ensures closing from anywhere else outside the dialog
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title" className="title">
    View Patient's Details
    <IconButton onClick={handleClose} style={{ float: 'right' }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.
    </DialogContentText>
  </DialogContent>
</Dialog>
<Dialog
  open={editData}
  onClose={handleClose}  // Ensures closing from anywhere else outside the dialog
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title" className="title">
     Edit Patient's Details
    <IconButton onClick={handleClose} style={{ float: 'right' }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.
    </DialogContentText>
  </DialogContent>
</Dialog>
<Dialog
  open={deleteData}
  onClose={handleClose}  // Ensures closing from anywhere else outside the dialog
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title" className="title">
     Delete Patient's Details
    <IconButton onClick={handleClose} style={{ float: 'right' }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.
    </DialogContentText>
  </DialogContent>
</Dialog>
    </Box>
    </>
  );
}