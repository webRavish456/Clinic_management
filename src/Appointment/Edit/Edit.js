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

const EditAppointment=({handleUpdate, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        discountCode: "",
        discountDescription: "",
        discountValue: "",
        validFrom: "",  
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
                Phone Number <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="Patient Name"
            value={formData.discountCode}
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
            name="discountDescription"
            value={formData.discountDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />

</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6}>
<TextField
label={
<>
Appointment Status<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
</>
}
name="discountValue"
value={formData.discountValue}
onChange={handleChange}
fullWidth
margin="normal"
/>

</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6}>
<TextField
label={
<>
Visit Type<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
</>
}
name="discountValue"
value={formData.discountValue}
onChange={handleChange}
fullWidth
margin="normal"
/>






            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Time<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="discountValue"
            value={formData.discountValue}
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
            name="validFrom"
            value={formData.validFrom}
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
            name="validTo"
            value={formData.validTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Patient Name" value={formData.status} onChange={handleChange}>
            <MenuItem value="Saniya Singha">Saniya Singha</MenuItem>
            <MenuItem value="Anaya Das">Anaya Das</MenuItem>
            <MenuItem value="Sarita kumari">Sarita Kumari</MenuItem>
            </Select>
            </FormControl>
            </Grid>
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

            <Box className="submit" sx={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', margin: '20px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button onClick={handleUpdate} className="primary_button">
             Update
            </Button>
            </Box>

        </>
     )
}

export default EditAppointment