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

const CreateDepartment =({handleSubmit, handleClose})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const [formData, setFormData] = useState({
        departmentname: "",
        specialization: "",
        departmenthead: "",
        description:"",
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
                Department Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="departmentname"
            value={formData.departmentname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            /></Grid>
            
                        <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                        <FormControl fullWidth margin="normal">
                        <InputLabel>Specialization<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
                        <Select name="Specialization" value={formData.status} onChange={handleChange}>
                        <MenuItem value="Electrohysiology">Electrohysiology</MenuItem>
                        <MenuItem value="Interventional Cardiology">Interventional Cardiology</MenuItem>
                        <MenuItem value="Non-Invasive Cardiology">Non-Invasive Cardiology</MenuItem>
                        </Select>
                        </FormControl>
                        </Grid>
           

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Department Head <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="departmenthead"
            value={formData.departmenthead}
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
            name="description"
            value={formData.validFrom}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>


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

export default CreateDepartment