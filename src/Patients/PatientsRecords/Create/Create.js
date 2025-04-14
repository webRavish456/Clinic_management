import React, {useState} from "react"
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    useMediaQuery,
    Button,
    Box,
  } from "@mui/material";

const CreatePatientRecords =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
       patientName: "",
        labReports: "",
      doctorsNotes: "",
      nextFollowUp: "",  
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
                Patient Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            // label={
            // <>
            //    Lab Reports<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            // </>
            // }
            name="labReports"
            label="labReports"
            value={formData.labReports}
            type="file"
            InputLabelProps={{shrink:true}}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Doctor's Notes <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="doctorsNotes"
            value={formData.doctorsNotes}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Next Follow-Up <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="nextFollowUp"
            value={formData.nextFollowUp}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
            <TextField
            label={
            <>
              Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            </Grid>

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}} >
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleSubmit} className="primary_button">
             Submit
            </Button>
            </Box>

        </>
     )
}

export default CreatePatientRecords;