import { Box, Button } from "@mui/material";
import React from "react"

const DeleteBranch= ({handleClose, handleDelete}) =>
{
     return (
     <>
    
           <Box sx={{ width: '400px', padding: '20px', bgcolor: 'background.paper',textAlign:'flex-end' }}>
             Are you sure want to delete?
           </Box>
           <Box className="submit" sx={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', margin: '20px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button  onClick={handleDelete} className="delete_button">
            Delete
            </Button>

            </Box>
     </>
     )
}

export default DeleteBranch;