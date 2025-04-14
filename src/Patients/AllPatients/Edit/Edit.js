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

const EditPatients =({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
       patientname: "",
        bloodgroup: "",
        gender: "",
        age: "",  
        mobileno: "",
        emailId: "",
        address: "",
        treatment: "",
        doctorassigned: "",
        admissiondate: "",
        status: "",
        medicalhistory: "",
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
            name="patientname"
            value={formData.patientname}
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
            name="bloodgroup"
            value={formData.bloodgroup}
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
            name="gender"
            value={formData.gender}
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
                Email id <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
            name="doctorassigned"
            value={formData.doctorassigned}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Admission Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="admissiondate"
            value={formData.admissiondate}
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
            name="medicalhistory"
            value={formData.medicalhistory}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Status" value={formData.status} onChange={handleChange}>
            <MenuItem value="under observation">Under observation</MenuItem>
            <MenuItem value="under treatment">Under Treatment</MenuItem>
            <MenuItem value="recovered">Recovered</MenuItem>
            </Select>
            </FormControl>
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

export default EditPatients;