import { Box, Button, CircularProgress } from "@mui/material";
import React from "react"

const DeleteBranch= ({handleClose, isDeleting, handleDelete }) =>
{
     
    

     return (
     <>
    
           <Box sx={{ width: '400px', padding: '20px', bgcolor: 'background.paper',textAlign:'flex-end' }}>
             Are you sure want to delete?
           </Box>
           <Box className="submit" sx={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', margin: '20px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button  onClick={handleDelete} className="delete_button">
           
            {isDeleting ? ( <>
            <CircularProgress
            size={18}
            style={{ marginRight: 8, color: "#fff" }}
             /> 
              Deleting
             </> 
            )   : 
               "Delete"
           }

            </Button>

            </Box>
     </>
     )
}

export default DeleteBranch;