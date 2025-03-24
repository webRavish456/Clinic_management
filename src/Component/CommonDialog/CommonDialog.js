import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
   
  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommonDialog = ({open, onClose, dialogTitle, dialogContent}) =>
{
      

     return (
        <>
             <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{padding:"0px"}}
      >
          <DialogTitle id="alert-dialog-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {dialogTitle}
             {open &&<IconButton onClick={onClose} style={{ color: "inherit" }}>
             <CloseIcon />
             </IconButton>}
      </DialogTitle>

        <DialogContent >
          <DialogContentText id="alert-dialog-description">

          {dialogContent}
  
          </DialogContentText>
        </DialogContent>
     
      </Dialog>

        </>
     )
}

export default CommonDialog
