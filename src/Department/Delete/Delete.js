import { Box, Button } from "@mui/material";
import React from "react"

const DeleteDepartment = ({handleClose, handleDelete}) =>
{
     return (
     <>
           <Box sx={{height:'40px' ,width:'500px'}}>
             Are you sure want to delete?
           </Box>
           <Box className="submit">
             <Box className="submit" sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', margin: '20px'}}></Box>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleDelete} className="delete_button">
              Delete
            </Button>
            </Box>
     </>
     )
}

export default DeleteDepartment;