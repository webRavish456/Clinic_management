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
        departmentid: "",
        departmentname: "",
        specialization: "",
        departmenthead: "",  
        description: "",
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
                Department Head <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
                Description <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
                Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
            <FormControl fullWidth margin="normal">
            <InputLabel>Department ID<span style={{color:"rgba(240,68,56,1)"}}>*</span></InputLabel>
            <Select name="Department ID" value={formData.status} onChange={handleChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            </Select>
            </FormControl>
            <>
            </>
            </Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6}>
<FormControl fullWidth margin="normal">
<InputLabel>Department Name<span style={{color:"rgba(240,68,56,1)"}}>*</span></InputLabel>
<Select name="Department Name" value={formData.status} onChange={handleChange}>
<MenuItem value="Cardiology">Cardiology</MenuItem>
<MenuItem value="Dental Care">Dental Care</MenuItem>
<MenuItem value="Neurology">Neurology</MenuItem>
</Select>
</FormControl>
<>
</>
</Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6}>
<FormControl fullWidth margin="normal">
<InputLabel>Specialization<span style={{color:"rgba(240,68,56,1)"}}>*</span></InputLabel>
<Select name="Specialization" value={formData.status} onChange={handleChange}>
<MenuItem value="Cardiovascular Medicine">Cardiovascular Medicine</MenuItem>
<MenuItem value="Root canal treatments and therapy for dental pulp diseases">Root canal treatments and therapy for dental pulp diseases</MenuItem>
<MenuItem value="Skin care and treatment for infants and children">Skin care and treatment for infants and children</MenuItem>
</Select>
</FormControl>
<>
</>


            
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
            <Select name="Status" value={formData.status} onChange={handleChange}>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
            </FormControl>
            </Grid>
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