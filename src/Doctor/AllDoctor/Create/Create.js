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
import AllDoctor from "../AllDoctor";

const CreateAllDoctor =({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        doctorName: "",
        email: "",
        mobileNo: "",
        address: "",  
        specialization: "",
        experience: "",
        qualification: "",
        hospitalName: "",
        availability: "",
        joinigDate: "",
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
                Doctor Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Email <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="emaii"
            value={formData.email}
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
            name="mobileNo"
            value={formData.mobileNo}
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
                Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Experience <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Qualification <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="qualifiction"
            value={formData.qualification}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Hospital Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="hospitalname"
            value={formData.hospitalName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Availability <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Joinig Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="joiningdate"
            value={formData.joiningDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
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

            <Box className="submit"sx={{display:'flex', justifyContent:'flex-end',gap:'10px',margin:'10px 0px 10px 10px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleUpdate} className="primary_button">
             Update
            </Button>
            </Box>

        </>
     )
}

export default CreateAllDoctor