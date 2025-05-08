import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "../../Search/Search";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow ,
  Box,
 
  IconButton,
  
} from "@mui/material";
import CommonDialog from "../../Component/CommonDialog/CommonDialog";
import DeleteDoctor from "./Delete/Delete";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllDoctor=()=>
  {
  
  
    const [deleteData, setDeleteData] = useState(false)
   
    const [loading, setLoading] = useState(true)

    const [rows, setRows] = useState([]);

    const [deleteId, setDeleteId] =useState()

    const [isDeleting, setIsDeleting] = useState(false);
   
    const token = Cookies.get("token");

    const Base_url = process.env.REACT_APP_BASE_URL;

    const [filteredRows, setFilteredRows]=useState([]);
    const [searchTerm, setSearchTerm]= useState("");

    const navigate = useNavigate();
   
    const handleView = (id) =>
    {
      navigate(`/viewDoctor/${id}`)
    }
  
  const handleEdit = (id) =>
  {
    navigate(`/editDoctor/${id}`)
  }
  
  const handleDelete = () =>
    {
      
      setIsDeleting(true);
      fetch(`${Base_url}/alldoctor/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result);
          if (res.status === "success") {
            setLoading(true);
            toast.success("Doctor deleted successfully!");
         
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
    }
  

const columns = [

  { id: 'si', label: 'SI.No', flex:1, align:'center' },
  { id: 'doctorName', label: 'Doctor Name', flex:1, align:'center' },
  
  {id: 'emailId',label: 'Email Id',flex:1,align: 'center',},
  {id: 'mobileNumber',label: 'Mobile Number',flex:1,align: 'center',},
  
  {id: 'address',label: 'Address',flex:1, align: 'center',},
  { id: 'department',label: 'Department', flex:1, align: 'center',},
  { id: 'specialization',label: 'Specialization ', flex:1, align: 'center',},

  {id: 'qualification',label: 'Qualification ',flex:1,align: 'center',},
  {id: 'experience',label: 'Experience',flex:1,align: 'center', },

  {id: 'joiningDate',label: 'Joining Date', flex:1, align: 'center',},
  {id: 'status',label: ' Availability Status',flex:1,align: 'center', },
  {id: 'action',label: 'Actions', flex:1,align: 'center', },
 
];

const handleShowDelete = (Id) => {

    setDeleteData(true)
    setDeleteId(Id)
}


useEffect(() => {

  const fetchDoctorData = async () => {
    try {
      const response = await fetch(`${Base_url}/alldoctor`, {
        method: "GET",
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });

      const result = await response.text();
      const res = JSON.parse(result);

      if (res.status === "success") {
        setLoading(false);
        const formattedData = res.data.map((item, index) => {
          const formattedJoiningDate = new Date(item.companyDetails.joiningDate).toLocaleDateString("en-GB");
        
          return createData(
            index + 1,
            item._id,
            item.doctorName,
            item.mobileNumber,
            item.emailId,
            item.address,
            item.companyDetails.specialization,
            item.companyDetails.department,
            item.qualification,
            item.experience,
            formattedJoiningDate,  
            item.availabilityStatus
          );
        });
        
        setRows(formattedData);
        setFilteredRows(formattedData)
        
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  if (loading) {
    fetchDoctorData();
  }
}, [loading]);


function createData(si,id, doctorName, mobileNumber, emailId, address, specialization, department, qualification, experience, joiningDate,status ) {
  return { si, id ,doctorName, mobileNumber, emailId, address, specialization, department, qualification, experience,joiningDate , status, action: (
      <>
      <IconButton style={{color:"rgb(13, 33, 121)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleView(id)}>
        <VisibilityIcon />
      </IconButton>
      <IconButton style={{color:"rgb(98, 99, 102)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleEdit(id)}>
        <EditIcon />
      </IconButton>
      <IconButton style={{color:"rgb(224, 27, 20)", padding:"4px", transform:"scale(0.8)"}} onClick={()=>handleShowDelete(id)}>
        <DeleteIcon />
      </IconButton>
      </>
    ),
   };
}

const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onAddClick =()=>
    {
       navigate("/createDoctor")
    }

    const handleClose = () => {
      setDeleteData(false)
   };

   useEffect(() => {

    const filtered = rows.filter(
      (row) =>
        row.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(row.mobileNumber).includes(searchTerm)  ||
        row.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.specialization.toLowerCase().includes(searchTerm.toLowerCase())  ||
        String(row.joiningDate).includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTerm, rows]); 


  return (
    <>
       <ToastContainer/>
    <Box className="container" sx={{flexGrow:1,overflowY: "auto" , height:"100vh",}}>
      <Search searchTerm={searchTerm}
         setSearchTerm={setSearchTerm} onAddClick={onAddClick} buttonText="Add New Doctor"/>
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
            {filteredRows
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
      open={deleteData} 
      onClose={handleClose}
      dialogTitle={ <>
         {deleteData?"Delete Doctor Details":null}
      </>}
      
      dialogContent = {
         deleteData? <DeleteDoctor handleDelete={handleDelete} isDeleting={isDeleting} handleClose={handleClose} />:null
        
      }

      />

    </Box>
    </>
  );
}

export default AllDoctor;