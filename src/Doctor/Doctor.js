import * as React from 'react';
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
import Search from "../Search/Search";

const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'patientName', label: 'Patient Name', flex: 1, align: 'center' },
  { id: 'email', label: 'Email', flex: 1, align: 'center' },
  { id: 'phoneNo', label: 'Phone Number', flex: 1, align: 'center' },
  {id: 'address', label: 'Address', flex: 1, align: 'center'},
  {id: 'dob', label: 'Date of Birth', flex: 1, align: 'center'},
  {id: 'gender', label: 'Gender', flex: 1, align: 'center'},
  {id: 'bloodGroup', label: 'Blood Group', flex: 1, align: 'center'},
  {id: 'medicalHistory', label: 'Medical History', flex: 1, align: 'center'}, 
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, patientName, email, phoneNo , address, dob, gender, bloodGroup, medicalHistory) {
  return { SI_no, patientName, email, phoneNo , address, dob, gender, bloodGroup, medicalHistory};
}

const rows = [
  createData('1', 'subhashree', 'sh12@gmail.com', '1234565432', "Ranchi", "2/9/2004", 'Female', 'O+','illness'),
  createData('2', 'snehanjali', ' meg@gmail.com', '12354321', "Jsr", "2/7/2022", 'Female', 'O+','Surgery'),
  createData('3','ritu', 'rit@gmail.com','987654567',"bbsr","3/02/2023",'Female','A+','Allergy'),
  createData('4','prerna', 'pr@gmail.com','987567894',"Patna","12/12/12",'Female','B+','Immunization'),
  createData('5','amrita', 'am@gmail.com','876567894',"BBSR","12/3/2023",'Female','AB+','Joint pain'),
  createData('6','sakshi', 'sa@gmail.com','12377895',"Bihar","3/5/2024",'Female','O+','Neuropathies'),
  createData('7','tripti', 'tr@gmail.com','98567894',"Ranchi","5/8/2005",'Female','B+','Polyuria'),
  createData('8','anushu', 'anu@gmail.com','876954678',"JSR","3/2/24",'Female','AB+','Illness' ),
  createData('9','sumona', 'sum@gmail.com','7678934567',"BBSR","4/4/12",'Female','A+','Surgery' ),
  createData('10','Esneha', 'esh@gmail.com','234567898',"Ranchi","12/2/23",'Female','B+','Joint pain'),
  createData('11','srawani', 'sra@gmail.com','678964536',"JSR","4/5/22",'Female','AB+','Allergy' ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleDelete = (id) => {
    console.log('Delete item with ID:', id);
    // You can perform your delete logic here
  };

  const handleEdit = (id) => {
    console.log('Edit item with ID:', id);
    // You can open a modal or perform your edit logic here
  };

  const handleView = (id) => {
    console.log('View item with ID:', id);
    // You can show more details of the item here
  };

  return (
    <>
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
    </>
  );
}