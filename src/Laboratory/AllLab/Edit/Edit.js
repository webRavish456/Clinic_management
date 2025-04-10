import React, {useState} from "react"
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    useMediaQuery,
    Box,
    Button,
  } from "@mui/material";

const EditLab =({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        labName: "",
        labType: "",
        assigneeStaff: "",
        shift: "",  
        validTo: "",
        status: "",
     });

     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

     return (
        <>
            <Grid container columnSpacing={2}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Lab Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="labName"
            value={formData.labName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Lab Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="labType"
            value={formData.labType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
            Assignee Staff <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="assigneeStaff"
            value={formData.assigneeStaff}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
           
            </Grid>
            </Grid>

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}}>
 
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleUpdate} className="primary_button">
             Update
            </Button>
            </Box>

        </>
     )
}

export default EditLab;