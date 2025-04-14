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

const CreatePatients =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        patientName: "",
           bloodGrp: "",
             gender: "",
                age: "",  
           mobileno: "",
            emailId: "",
             status: "",
            address: "",
          treatment: "",
          doctorAss: "",
         medicalHis: "",
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
                Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
            label={
            <>
                Blood Group <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="bloodGrp"
            value={formData.bloodGrp}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name=" gender"
            value={formData. gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Age <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Mobile No <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
           
            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Email ID <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Address <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Treatment <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Doctor Assigned <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="doctorAss"
            value={formData.doctorAss}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
               Medical History <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="medicalHis"
            value={formData.medicalHis}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            </Grid>

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleSubmit} className="primary_button">
             Submit
            </Button>
            </Box>

        </>
     )
}

export default CreatePatients;