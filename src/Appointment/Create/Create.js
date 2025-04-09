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

const CreateAppointment =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        patientname: "",
        checkup: "",
        doctorassignee: "",
        appointmentdate:"",
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
                        <FormControl fullWidth margin="normal">
                        <InputLabel>Doctor Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
                        <Select name="Doctor Name" value={formData.status} onChange={handleChange}>
                        <MenuItem value="Shruti">Shruti</MenuItem>
                        <MenuItem value="Arohi">Arohi</MenuItem>
                        <MenuItem value="Sara">Sara</MenuItem>
                        </Select>
                        </FormControl>
                        </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Gender<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
                Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Time <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Mobile<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>



            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Email <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="email"
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
                Appointment Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="appointmentstatus"
            value={formData.appointmentsatus}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>


        
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Vist Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="vistType"
            value={formData.vistType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
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

export default CreateAppointment;