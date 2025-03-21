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
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'patientName', label: 'Patient Name', flex: 1, align: 'center' },
  { id: 'checkup', label: 'Checkup',flex: 1, align: 'center' },
  { id: 'doctorassignee', label: 'Doctorassignee', flex: 1, align: 'center' },
  {id: 'appointmentdate', label: 'Address', flex: 1, align: 'center'},
  {id: 'status', label: 'Date of Birth', flex: 1, align: 'center'},
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, patientName,checkup, doctorassignee , appointmentdate, status) {
  return { SI_no, patientName, checkup, doctorassignee, appointmentdate, status};
}

const rows = [
  createData('1', 'subhashree', 'fever', 'ravish', 'Ranchi', '12/2/23'),
  createData('2', 'snehanjali', 'cold', 'prabhat','Ranchi', '12/12/12'),
  createData('3','ritu', 'allergy','sneha','Bbsr','12/2/23'),
  createData('4','prerna', 'fever','anish','Ranchi','23/3/23'),
  createData('5','amrita', 'food poisning','tejash','Bbsr','4/5/24'),
  createData('6','sakshi', 'fever','anushka','Ranchi','9/2/2004' ),
  createData('7','tripti', 'allergy','sumona','JSR','2/2/23' ),
  createData('8','megha', 'allergy','sushant','Ranchi','12/2/23' ),
  createData('9','sumona', 'allergy','ravi','BBSR','3/3/23' ),
  createData('10','Esneha', 'fever','sangeeta','Ranchi','12/2/25'),
  createData('11','srawani', 'fever','sweta','BBSR','12/2/23' ),
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
    <Box className="cointainer">
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